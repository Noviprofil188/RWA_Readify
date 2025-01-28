<template>
  <div class="q-pa-md">
    <!-- Polje za pretragu s autocomplete -->
    <q-select
      v-model="selectedBook"
      :options="filteredOptions"
      @filter="filterBooks"
      use-input
      input-debounce="0"
      label="Traži knjigu"
      outlined
      clearable
      class="q-mb-md"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">Nema rezultata</q-item-section>
        </q-item>
      </template>
    </q-select>

    <!-- Checkboxovi za filtere -->
    <div class="q-gutter-sm q-mb-md">
      <q-checkbox v-model="filters.naslov" label="Naziv knjige" />
      <q-checkbox v-model="filters.autor" label="Autor" />
      <q-checkbox v-model="filters.godina" label="Godina izdanja" />
      <q-checkbox v-model="filters.zanr" label="Žanr" />
    </div>

    <!-- Prikaz svih knjiga -->
    <q-list bordered separator>
      <q-item v-for="knjiga in filtriraneKnjige" :key="knjiga.id">
        <q-item-section>
          <q-item-label>{{ knjiga.naslov }}</q-item-label>
          <q-item-label caption>Autor: {{ knjiga.autor }}</q-item-label>
          <q-item-label caption>Godina izdanja: {{ knjiga.godina_izdanja }}</q-item-label>
          <q-item-label caption>Žanr: {{ knjiga.zanr }}</q-item-label>
        </q-item-section>

        <!-- Gumb za brisanje knjige -->
        <q-item-section side>
          <q-btn
            color="negative"
            icon="delete"
            @click="deleteBook(knjiga.id)"
            label="Izbriši"
            dense
          />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selectedBook: null, // Odabrana knjiga iz autocomplete-a
      searchQuery: "", // Upit za pretragu
      filters: {
        naslov: true, // Filter za naziv knjige
        autor: false, // Filter za autora
        godina: false, // Filter za godinu izdanja
        zanr: false, // Filter za žanr
      },
      knjige: [], // Knjige iz baze
      filteredOptions: [], // Opcije za autocomplete
    };
  },
  computed: {
    // Filtriranje knjiga prema upitu i odabranim filterima
    filtriraneKnjige() {
      return this.knjige.filter((knjiga) => {
        const query = this.searchQuery.toLowerCase();

        // Provjeri je li upit prisutan u odabranim filterima
        const matchesNaslov = this.filters.naslov && knjiga.naslov.toLowerCase().includes(query);
        const matchesAutor = this.filters.autor && knjiga.autor.toLowerCase().includes(query);
        const matchesGodina = this.filters.godina && knjiga.godina_izdanja.toString().includes(query);
        const matchesZanr = this.filters.zanr && knjiga.zanr.toLowerCase().includes(query);

        // Ako je barem jedan filter odabran i upit se podudara, vrati knjigu
        return matchesNaslov || matchesAutor || matchesGodina || matchesZanr;
      });
    },
  },
  methods: {
    // Dohvat svih knjiga iz baze
    async fetchBooks() {
      try {
        const response = await axios.get("http://localhost:3000/api/knjige");
        this.knjige = response.data;
      } catch (error) {
        console.error("Greška pri dohvaćanju knjiga:", error);
      }
    },

    // Filtriranje opcija za autocomplete
    filterBooks(val, update) {
      if (val === "") {
        update(() => {
          this.filteredOptions = [];
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.filteredOptions = this.knjige
          .filter((knjiga) => knjiga.naslov.toLowerCase().startsWith(needle))
          .map((knjiga) => ({
            label: knjiga.naslov,
            value: knjiga.id,
          }));
      });
    },

    // Brisanje knjige
    async deleteBook(bookId) {
      try {
        const confirmDelete = confirm("Jeste li sigurni da želite izbrisati ovu knjigu?");
        if (!confirmDelete) return;

        await axios.delete(`http://localhost:3000/api/knjige/${bookId}`);
        this.knjige = this.knjige.filter((knjiga) => knjiga.id !== bookId); // Ukloni knjigu iz liste
        alert("Knjiga uspješno izbrisana!");
      } catch (error) {
        console.error("Greška pri brisanju knjige:", error);
        alert("Greška pri brisanju knjige.");
      }
    },
  },
  watch: {
    // Pratimo promjenu odabrane knjige iz autocomplete-a
    selectedBook(newVal) {
      if (newVal) {
        this.searchQuery = newVal.label; // Postavi upit za pretragu na odabrani naslov
      } else {
        this.searchQuery = ""; // Resetiraj upit ako nema odabrane knjige
      }
    },
  },
  mounted() {
    this.fetchBooks(); // Dohvati knjige prilikom učitavanja stranice
  },
};
</script>

<style scoped>
.popis-knjiga {
  background-color: #ffffff;
  min-height: 100vh;
}

.custom-table {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.custom-table th {
  background-color: #1976d2;
  color: white;
}

.custom-table tr:hover {
  background-color: #e3f2fd;
}
</style>