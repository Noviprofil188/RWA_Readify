<template>
  <q-page class="q-pa-md rezervacije-page">
    <h1 class="text-h4 q-mb-md">Rezervacije</h1>

    <q-form @submit.prevent="dodajRezervaciju" class="q-mb-md">
      <div class="row q-gutter-md">
        <q-select v-model="novaRezervacija.korisnik" :options="korisnici.map(k => ({ label: k.username, value: k.id }))"
          label="Odaberite korisnika" emit-value map-options required class="col-12 col-md-3" />

        <q-select v-model="novaRezervacija.knjiga" :options="knjige.map(k => ({ label: k.naslov, value: k.id }))"
          label="Odaberite knjigu" emit-value map-options required class="col-12 col-md-3" />

        <q-input v-model="novaRezervacija.datum_rezervacije" label="Datum rezervacije" type="date" required
          class="col-12 col-md-3" />

        <q-btn type="submit" color="primary" label="Dodaj rezervaciju" class="col-12 col-md-2" />
      </div>
    </q-form>

    <q-table :rows="rezervacije" :columns="columns" row-key="id" :loading="loading" class="custom-table">
      <template v-slot:body-cell-korisnik="props">
        <q-td :props="props">
          {{ getKorisnikUsername(props.row.korisnik) }}
        </q-td>
      </template>

      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge :color="props.row.status === 'aktivna' ? 'green' : 'red'">
            {{ props.row.status }}
          </q-badge>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn color="negative" label="Obriši" @click="obrisiRezervaciju(props.row.id)" class="q-ml-sm" />
        </q-td>
      </template>

    </q-table>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      rezervacije: [],
      loading: false,
      korisnici: [],
      knjige: [],
      novaRezervacija: {
        korisnik: null,
        knjiga: null,
        datum_rezervacije: "",
      },
      columns: [
        { name: "id", label: "ID", field: "id", align: "left", sortable: true },
        { name: "korisnik", label: "Korisnik (Username)", align: "left", field: "username", sortable: true },
        { name: "naslov", label: "Knjiga", align: "left", field: "knjiga", sortable: true },
        { name: "datum_rez", label: "Datum rezervacije", field: "datum_rez", align: "left", sortable: true },
        { name: "status", label: "Status", field: "status", align: "left", sortable: true },
        { name: "actions", label: "Akcije", field: "actions", align: "left" },
      ],
    };
  },
  mounted() {
    this.fetchRezervacije();
    this.fetchKorisnici();
    this.fetchKnjige();
  },

  methods: {
    async fetchRezervacije() {
      this.loading = true;
      try {
        const response = await axios.get("http://localhost:3000/api/rezervacija");
        this.rezervacije = response.data;
        console.log("Dohvaćene rezervacije:", this.rezervacije);
      } catch (error) {
        console.error("Greška pri dohvaćanju rezervacija:", error);
        this.$q.notify({ type: "negative", message: "Greška pri dohvaćanju rezervacija." });
      } finally {
        this.loading = false;
      }
    },

    async fetchKorisnici() {
      try {
        const response = await axios.get("http://localhost:3000/api/korisnici");
        console.log("Dohvaćeni korisnici:", response.data);
        this.korisnici = response.data;
      } catch (error) {
        console.error("Greška pri dohvaćanju korisnika:", error);
        this.$q.notify({ type: "negative", message: "Greška pri dohvaćanju korisnika." });
      }
    },

    async fetchKnjige() {
      try {
        const response = await axios.get("http://localhost:3000/api/knjige");
        console.log("Dohvaćene knjige:", response.data);
        this.knjige = response.data;
      } catch (error) {
        console.error("Greška pri dohvaćanju knjiga:", error);
        this.$q.notify({ type: "negative", message: "Greška pri dohvaćanju knjiga." });
      }
    },

    getKorisnikUsername(korisnik_id) {
      const korisnik = this.korisnici.find(k => k.id === korisnik_id);
      return korisnik ? korisnik.username : "Nepoznato";
    },

    async dodajRezervaciju() {
      if (!this.novaRezervacija.korisnik || !this.novaRezervacija.knjiga || !this.novaRezervacija.datum_rezervacije) {
        this.$q.notify({ type: "negative", message: "Sva polja su obavezna." });
        return;
      }

      try {
        const response = await axios.post("http://localhost:3000/api/rezervacija", {
          username: this.novaRezervacija.korisnik,
          knjiga: this.novaRezervacija.knjiga,
          datum_rez: this.novaRezervacija.datum_rezervacije,
        });

        this.rezervacije.push(response.data);

        // Resetiranje forme
        this.novaRezervacija.korisnik = null;
        this.novaRezervacija.knjiga = null;
        this.novaRezervacija.datum_rezervacije = "";

        this.$q.notify({ type: "positive", message: "Rezervacija uspješno dodana!" });
      } catch (error) {
        console.error("Greška pri dodavanju rezervacije:", error);
        this.$q.notify({ type: "negative", message: "Greška pri dodavanju rezervacije." });
      }
    },

    async obrisiRezervaciju(id) {
      try {
        await axios.delete(`http://localhost:3000/api/rezervacija/${id}`);
        this.rezervacije = this.rezervacije.filter((rez) => rez.id !== id);
        this.$q.notify({ type: "positive", message: "Rezervacija uspješno obrisana!" });
      } catch (error) {
        console.error("Greška pri brisanju rezervacije:", error);
        this.$q.notify({ type: "negative", message: "Greška pri brisanju rezervacije." });
      }
    },
  },

};
</script>

<style scoped>
.rezervacije-page {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.custom-table {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.custom-table th {
  background-color: #89541c;
  color: white;
}

.custom-table tr:hover {
  background-color: #e3f2fd;
}
</style>