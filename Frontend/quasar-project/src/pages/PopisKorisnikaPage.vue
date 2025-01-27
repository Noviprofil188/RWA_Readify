<template>
  <q-page padding>
    <h1 class="text-h4 q-mb-md">Popis korisnika</h1>

    <!-- Tablica za prikaz korisnika -->
    <q-table
      :rows="users"
      :columns="columns"
      row-key="id"
      :loading="loading"
      :pagination="pagination"
      no-data-label="Nema korisnika za prikaz."
    >
      <!-- Opcije za pretraživanje i filtriranje -->
      <template v-slot:top>
        <q-input
          v-model="searchQuery"
          outlined
          dense
          placeholder="Pretraži korisnike..."
          class="q-mb-md"
          @input="fetchUsers"
        />
      </template>
    </q-table>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: [], // Podaci o korisnicima
      loading: false, // Učitavanje podataka
      searchQuery: "", // Upit za pretraživanje
      columns: [
        { name: "id", label: "ID", field: "id", align: "left", sortable: true },
        { name: "username", label: "Korisničko ime", field: "username", align: "left", sortable: true },
        { name: "email", label: "Email", field: "email", align: "left", sortable: true },
        { name: "uloga", label: "Uloga", field: "uloga", align: "left", sortable: true }, // Promijenjeno iz "role" u "uloga"
      ],
      pagination: {
        rowsPerPage: 10, // Broj redova po stranici
      },
    };
  },
  methods: {
    // Dohvati korisnike s backend-a
    async fetchUsers() {
      this.loading = true;
      try {
        const response = await axios.get("http://localhost:3000/api/korisnici", {
          params: {
            search: this.searchQuery, // Proslijedi upit za pretraživanje
          },
        });
        console.log("Odgovor od servera:", response.data); // Log za provjeru
        this.users = response.data;
      } catch (error) {
        console.error("Greška pri dohvaćanju korisnika:", error);
        this.$q.notify({
          type: "negative",
          message: "Greška pri dohvaćanju korisnika.",
        });
      } finally {
        this.loading = false;
      }
    },

    // Provjeri je li korisnik prijavljen i ima li prava pristupa
    checkAuth() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || user.role !== "admin") {
        this.$router.push("/login"); // Preusmjeri na login ako korisnik nije prijavljen ili nije admin
      }
    },
  },
  mounted() {
    this.checkAuth(); // Provjeri autentifikaciju prilikom učitavanja komponente
    this.fetchUsers(); // Dohvati korisnike
  },
};
</script>

<style scoped>
.popis-korisnika {
  background-color: #ffffff;
  min-height: 100vh;
}

.custom-table {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.custom-table th {
  background-color: #cbc2a8;
  color: white;
}

.custom-table tr:hover {
  background-color: #d1ccbf;
}
</style>