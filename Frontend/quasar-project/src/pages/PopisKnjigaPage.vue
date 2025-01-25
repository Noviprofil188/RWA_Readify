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
      </q-item>
    </q-list>
  </div>
</template>

<script>
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
      knjige: [
        // Primjer podataka (možete ih zamijeniti podacima iz baze)
        { id: 1, naslov: "1984", autor: "George Orwell", godina_izdanja: 1949, zanr: "Dystopian" },
        { id: 2, naslov: "Rat i mir", autor: "Leo Tolstoy", godina_izdanja: 1869, zanr: "Povijesni roman" },
        { id: 3, naslov: "Uliks", autor: "James Joyce", godina_izdanja: 1922, zanr: "Modernistički roman" },
        { id: 4, naslov: "Lolita", autor: "Vladimir Nabokov", godina_izdanja: 1955, zanr: "Psihološki roman" },
        { id: 5, naslov: "Zločin i kazna", autor: "Fyodor Dostoevsky", godina_izdanja: 1866, zanr: "Psihološki roman" },
        // Dodajte više knjiga prema potrebi
      ],
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
};
</script>

<style scoped>
/* Dodatni stilovi po potrebi */
</style>