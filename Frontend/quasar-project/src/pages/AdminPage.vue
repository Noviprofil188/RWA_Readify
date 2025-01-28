<template>
  <q-page class="q-pa-md admin-page">
    <h1 class="text-h4 q-mb-md">Dobrodošli, Admin!</h1>

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

    <!-- Dodatne informacije -->
    <div class="row q-gutter-md q-mb-md">
      <!-- Kartica za broj korisnika -->
      <q-card class="col-12 col-md-3 card" clickable @click="goToPopisKorisnika">
        <q-card-section>
          <div class="text-h6">Ukupan broj korisnika</div>
          <div class="text-h3">{{ userCount }}</div>
        </q-card-section>
      </q-card>

      <!-- Kartica za aktivne rezervacije -->
      <q-card class="col-12 col-md-3 card" clickable @click="goToAktivneRezervacije">
        <q-card-section>
          <div class="text-h6">Aktivne rezervacije</div>
          <div class="text-h3">{{ activeReservations }}</div>
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
      bookCount: 0, // Broj knjiga
      reservationCount: 0, // Broj rezervacija
      userCount: 0, // Broj korisnika
      activeReservations: 0, // Broj aktivnih rezervacija
    };
  },
  methods: {

    // Dohvati broj knjiga, rezervacija, korisnika i aktivnih rezervacija
    async fetchCounts() {
      try {
        const bookCountResponse = await axios.get("http://localhost:3000/api/knjige/count");
        this.bookCount = bookCountResponse.data.count;

        const reservationCountResponse = await axios.get("http://localhost:3000/api/rezervacija/count");
        this.reservationCount = reservationCountResponse.data.count;

        const userCountResponse = await axios.get("http://localhost:3000/api/korisnici/count");
        this.userCount = userCountResponse.data.count;

        const activeReservationsResponse = await axios.get("http://localhost:3000/api/rezervacija/aktivne");
        this.activeReservations = activeReservationsResponse.data.count;
      } catch (error) {
        console.error("Greška pri dohvaćanju podataka:", error);
      }
    },

    // Navigacija na popis knjiga
    goToPopisKnjiga() {
      this.$router.push("/admin/popis_knjiga");
    },

    // Navigacija na rezervacije
    goToRezervacije() {
      this.$router.push("/admin/rezervacija");
    },

    // Navigacija na popis korisnika
    goToPopisKorisnika() {
      this.$router.push("/admin/popis_korisnika");
    },

    // Navigacija na aktivne rezervacije
    goToAktivneRezervacije() {
      this.$router.push("/admin/rezervacija");
    },
  },

  mounted() {
    this.fetchCounts(); // Dohvati podatke prilikom učitavanja stranice
  },
};
</script>

<style scoped>
.admin-page {
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