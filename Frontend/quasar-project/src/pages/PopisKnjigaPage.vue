<template>
  <q-page padding>
    <!-- Naslov i opis -->
    <h1 class="text-h4 text-bold text-center">Popis knjiga</h1>
    <p class="text-subtitle1 text-center">
      Ovdje možete pronaći popis svih knjiga koje su dostupne u našoj knjižnici.
    </p>

    <!-- Tražilica -->
    <div class="q-my-md q-gutter-md">
      <q-input filled v-model="searchQuery" label="Unesite pojam za pretraživanje" />
      <q-checkbox v-model="searchByAuthor" label="Pretraži po autoru" />
      <q-checkbox v-model="searchByTitle" label="Pretraži po naslovu" />
      <q-btn color="primary" label="Traži" @click="searchBooks" />
    </div>

    <!-- Tablica za rezultate pretrage -->
    <q-table
      v-if="filteredRows.length"
      separator="horizontal"
      title="Rezultati pretrage"
      :rows="filteredRows"
      :columns="columns"
      row-key="id"
    ></q-table>

    <!-- Tablica svih knjiga -->
    <div class="q-pa-md" v-else>
      <q-table
        separator="horizontal"
        title="Popis svih knjiga"
        title-class="text-h4 text-bold text-red-9"
        :rows="rows"
        :columns="columns"
        row-key="id"
        table-class="text-black"
        table-style="border: 3px solid black;"
        table-header-style="height: 65px"
        table-header-class="bg-red-2"
        bordered
        flat
        square
      ></q-table>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const columns = [
      { name: 'id', label: 'ID', field: 'id', align: 'left', headerStyle: { fontSize: '24px' }, style: { fontSize: '18px' } },
      { name: 'naslov', label: 'Naslov', field: 'naslov', align: 'left', headerStyle: { fontSize: '24px' }, style: { fontSize: '18px' } },
      { name: 'autor', label: 'Autor', field: 'autor', align: 'left', headerStyle: { fontSize: '24px' }, style: { fontSize: '18px' } },
      { name: 'stanje', label: 'Stanje', field: 'stanje', align: 'center', headerStyle: { fontSize: '24px' }, style: { fontSize: '18px' } },
    ];

    const rows = ref([
      { id: '1', naslov: 'Funny Story', autor: 'Emily Henry', stanje: '4' },
      { id: '2', naslov: 'The Lord of the Rings', autor: 'J. R. R. Tolkien', stanje: '5' },
      { id: '3', naslov: 'Harry Potter', autor: 'J.K. Rowling', stanje: '2' },
      { id: '4', naslov: 'Diary of a Wimpy Kid', autor: 'Jeff Kinney', stanje: '2' },
    ]);

    const searchQuery = ref('');
    const searchByAuthor = ref(false);
    const searchByTitle = ref(false);
    const filteredRows = ref([]);

    const searchBooks = () => {
      if (!searchQuery.value.trim()) {
        filteredRows.value = [];
        return;
      }

      const query = searchQuery.value.toLowerCase();
      filteredRows.value = rows.value.filter((book) => {
        if (searchByAuthor.value && book.autor.toLowerCase().includes(query)) {
          return true;
        }
        if (searchByTitle.value && book.naslov.toLowerCase().includes(query)) {
          return true;
        }
        return false;
      });
    };

    return {
      columns,
      rows,
      searchQuery,
      searchByAuthor,
      searchByTitle,
      filteredRows,
      searchBooks,
    };
  },
};
</script>

<style scoped>
.text-center {
  margin-bottom: 16px;
}
</style>
