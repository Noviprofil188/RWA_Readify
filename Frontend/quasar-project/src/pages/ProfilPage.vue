<template>
    <q-page class="q-pa-md profil-page">
        <h1 class="text-h4 q-mb-md">Dobrodošli, {{ user.username }}!</h1>

        <!-- Kartice za brzi pregled -->
        <div class="row q-gutter-md q-mb-md">
            <!-- Kartica za broj knjiga -->
            <q-card class="col-12 col-md-3 card" clickable @click="goToPopisKnjiga">
                <q-card-section>
                    <div class="text-h6">Ukupan broj knjiga</div>
                    <div class="text-h3">{{ bookCount }}</div>
                </q-card-section>
            </q-card>

            <!-- Kartica za broj rezervacija -->
            <q-card class="col-12 col-md-3 card" clickable @click="goToRezervacije">
                <q-card-section>
                    <div class="text-h6">Broj rezervacija</div>
                    <div class="text-h3">{{ reservationCount }}</div>
                </q-card-section>
            </q-card>
        </div>
    </q-page>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            bookCount: 0, // Ukupan broj knjiga
            reservationCount: 0, // Broj rezervacija
            books: [], // Popis svih knjiga
            loading: false, // Učitavanje podataka
            columns: [
                { name: "id", label: "ID", field: "id", align: "left" },
                { name: "naslov", label: "Naslov", field: "naslov", align: "left" },
                { name: "autor", label: "Autor", field: "autor", align: "left" },
                { name: "godina", label: "Godina", field: "godina", align: "left" },
                { name: "rezervirana", label: "Status", field: "rezervirana", align: "left", format: (val) => val ? "Rezervirana" : "Dostupna" },
                { name: "actions", label: "Akcije", field: "actions", align: "center" },
            ],
            user: {}, // Podaci o prijavljenom korisniku
        };
    },
    methods: {
        // Dohvati broj knjiga i mojih rezervacija
        async fetchCounts() {
            try {
                const bookCountResponse = await axios.get("http://localhost:3000/api/knjige/count");
                this.bookCount = bookCountResponse.data.count;

                const ReservationsResponse = await axios.get("http://localhost:3000/api/rezervacija/count");
                this.reservationCount = ReservationsResponse.data.count;
            } catch (error) {
                console.error("Greška pri dohvaćanju podataka:", error);
            }
        },

        // Dohvati sve knjige
        async fetchBooks() {
            this.loading = true;
            try {
                const response = await axios.get("http://localhost:3000/api/knjige");
                this.books = response.data;
            } catch (error) {
                console.error("Greška pri dohvaćanju knjiga:", error);
            } finally {
                this.loading = false;
            }
        },

        // Rezerviraj knjigu
        async rezervirajKnjigu(knjigaId) {
            try {
                await axios.post("http://localhost:3000/api/rezervacija", {
                    korisnikId: this.user.id,
                    knjigaId: knjigaId,
                });
                this.$q.notify({
                    type: "positive",
                    message: "Knjiga je uspješno rezervirana!",
                });
                this.fetchBooks(); // Osvježi popis knjiga
                this.fetchCounts(); // Osvježi broj rezervacija
            } catch (error) {
                console.error("Greška pri rezervaciji knjige:", error);
                this.$q.notify({
                    type: "negative",
                    message: "Greška pri rezervaciji knjige!",
                });
            }
        },

        // Navigacija na popis knjiga
        goToPopisKnjiga() {
            this.$router.push("/popis_knjiga");
        },

        // Navigacija na moje rezervacije
        goToRezervacije() {
            this.$router.push("/rezervacija");
        },
    },
    mounted() {
        // Dohvati podatke o prijavljenom korisniku
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            this.user = JSON.parse(storedUser);
        } else {
            this.$router.push("/login"); // Ako korisnik nije prijavljen, preusmjeri na login
        }

        this.fetchCounts(); // Dohvati broj knjiga i rezervacija
        this.fetchBooks(); // Dohvati sve knjige
    },
};
</script>

<style scoped>
.profil-page {
    background-color: #fff5eb;
    min-height: 100vh;
}

.card {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    cursor: pointer;
}

.card:hover {
    transform: translateY(-5px);
}

.text-h3 {
    color: #000000;
}
</style>