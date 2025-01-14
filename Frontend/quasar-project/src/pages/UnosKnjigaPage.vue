<template>
  <q-page padding>
    <q-form @submit="submitForm">
      <q-input v-model="book.title" label="Naslov knjige" outlined required />
      <q-input v-model="book.author" label="Autor" outlined required />
      <q-input v-model="book.genre" label="Žanr" outlined />
      <q-input v-model="book.year" type="number" label="Godina izdanja" outlined />
      <q-input v-model="book.description" label="Opis" type="textarea" outlined />

      <q-btn type="submit" label="Dodaj knjigu" color="primary" />
    </q-form>
  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      book: {
        title: '',
        author: '',
        genre: '',
        year: '',
        description: '',
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('http://localhost:3000/api/books/add', this.book);
        this.$q.notify({ type: 'positive', message: response.data.message });
        this.book = { title: '', author: '', genre: '', year: '', description: '' }; // Reset forme
      } catch (error) {
        this.$q.notify({ type: 'negative', message: error.response?.data?.message || 'Greška' });
      }
    },
  },
};
</script>
