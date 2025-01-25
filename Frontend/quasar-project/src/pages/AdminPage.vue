<template>
  <q-page class="q-pa-md">
    <h1 class="text-h4 q-mb-md">Dobrodošli, Admin!</h1>

    <!-- Kartice za brzi pregled -->
    <div class="row q-gutter-md q-mb-md">
      <q-card class="col-12 col-md-3">
        <q-card-section>
          <div class="text-h6">Broj korisnika</div>
          <div class="text-h3">{{ userCount }}</div>
        </q-card-section>
      </q-card>

      <q-card class="col-12 col-md-3">
        <q-card-section>
          <div class="text-h6">Broj knjiga</div>
          <div class="text-h3">{{ bookCount }}</div>
        </q-card-section>
      </q-card>

      <q-card class="col-12 col-md-3">
        <q-card-section>
          <div class="text-h6">Broj rezervacija</div>
          <div class="text-h3">{{ reservationCount }}</div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Tabovi za upravljanje -->
    <q-tabs v-model="tab" class="bg-primary text-white">
      <q-tab name="users" icon="people" label="Korisnici" />
      <q-tab name="books" icon="menu_book" label="Knjige" />
      <q-tab name="reservations" icon="event" label="Rezervacije" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated>
      <!-- Upravljanje korisnicima -->
      <q-tab-panel name="users">
        <h2 class="text-h5 q-mb-md">Upravljanje korisnicima</h2>
        <q-table
          :rows="users"
          :columns="userColumns"
          row-key="id"
          :loading="loading"
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn icon="edit" color="primary" flat @click="editUser(props.row)" />
              <q-btn icon="delete" color="negative" flat @click="deleteUser(props.row)" />
            </q-td>
          </template>
        </q-table>
      </q-tab-panel>

      <!-- Upravljanje knjigama -->
      <q-tab-panel name="books">
        <h2 class="text-h5 q-mb-md">Upravljanje knjigama</h2>
        <q-table
          :rows="books"
          :columns="bookColumns"
          row-key="id"
          :loading="loading"
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn icon="edit" color="primary" flat @click="editBook(props.row)" />
              <q-btn icon="delete" color="negative" flat @click="deleteBook(props.row)" />
            </q-td>
          </template>
        </q-table>
      </q-tab-panel>

      <!-- Upravljanje rezervacijama -->
      <q-tab-panel name="reservations">
        <h2 class="text-h5 q-mb-md">Upravljanje rezervacijama</h2>
        <q-table
          :rows="reservations"
          :columns="reservationColumns"
          row-key="id"
          :loading="loading"
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn icon="edit" color="primary" flat @click="editReservation(props.row)" />
              <q-btn icon="delete" color="negative" flat @click="deleteReservation(props.row)" />
            </q-td>
          </template>
        </q-table>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import axios from 'axios'; // Dodajte axios za HTTP zahtjeve

export default {
  data() {
    return {
      tab: "users", // Aktivni tab
      loading: false, // Učitavanje podataka
      userCount: 0, // Broj korisnika
      bookCount: 0, // Broj knjiga
      reservationCount: 0, // Broj rezervacija

      // Podaci za tablicu korisnika
      users: [],
      userColumns: [
        { name: "id", label: "ID", field: "id", align: "left" },
        { name: "name", label: "Ime", field: "name", align: "left" },
        { name: "email", label: "Email", field: "email", align: "left" },
        { name: "role", label: "Uloga", field: "role", align: "left" },
        { name: "actions", label: "Akcije", align: "center" },
      ],

      // Podaci za tablicu knjiga
      books: [],
      bookColumns: [
        { name: "id", label: "ID", field: "id", align: "left" },
        { name: "title", label: "Naslov", field: "title", align: "left" },
        { name: "author", label: "Autor", field: "author", align: "left" },
        { name: "year", label: "Godina", field: "year", align: "left" },
        { name: "genre", label: "Žanr", field: "genre", align: "left" },
        { name: "actions", label: "Akcije", align: "center" },
      ],

      // Podaci za tablicu rezervacija
      reservations: [],
      reservationColumns: [
        { name: "id", label: "ID", field: "id", align: "left" },
        { name: "book", label: "Knjiga", field: "book", align: "left" },
        { name: "user", label: "Korisnik", field: "user", align: "left" },
        { name: "date", label: "Datum", field: "date", align: "left" },
        { name: "actions", label: "Akcije", align: "center" },
      ],
    };
  },
  methods: {
    // Metode za uređivanje i brisanje korisnika
    editUser(user) {
      console.log("Uređivanje korisnika:", user);
    },
    deleteUser(user) {
      console.log("Brisanje korisnika:", user);
    },

    // Metode za uređivanje i brisanje knjiga
    editBook(book) {
      console.log("Uređivanje knjige:", book);
    },
    deleteBook(book) {
      console.log("Brisanje knjige:", book);
    },

    // Metode za uređivanje i brisanje rezervacija
    editReservation(reservation) {
      console.log("Uređivanje rezervacije:", reservation);
    },
    deleteReservation(reservation) {
      console.log("Brisanje rezervacije:", reservation);
    },

    // Dohvat podataka s backend-a
    async fetchData() {
      this.loading = true;
      try {
        // Dohvati korisnike
        const usersResponse = await axios.get("http://localhost:3000/api/korisnici");
        this.users = usersResponse.data;
        this.userCount = this.users.length;

        // Dohvati knjige
        const booksResponse = await axios.get("http://localhost:3000/api/knjige");
        this.books = booksResponse.data;
        this.bookCount = this.books.length;

        // Dohvati rezervacije
        const reservationsResponse = await axios.get("http://localhost:3000/api/rezervacije");
        this.reservations = reservationsResponse.data;
        this.reservationCount = this.reservations.length;
      } catch (error) {
        console.error("Greška pri dohvaćanju podataka:", error);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchData(); // Dohvati podatke prilikom učitavanja stranice
  },
};
</script>