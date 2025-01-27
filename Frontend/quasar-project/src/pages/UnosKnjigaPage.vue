<template>
  <q-page padding>
    <h1 class="text-h4 q-mb-md">Unos knjiga</h1>

    <!-- Forma za unos knjige -->
    <q-form @submit="submitForm">
      <q-input v-model="book.title" label="Naslov knjige" outlined dense required />
      <q-input v-model="book.author" label="Autor" outlined dense required />
      <q-input v-model="book.genre" label="Žanr" outlined dense />
      <q-input v-model="book.year" label="Godina izdanja" type="number" outlined dense />
      <q-input v-model="book.description" label="Opis" type="textarea" outlined dense />

      <q-btn type="submit" label="Dodaj knjigu" color="primary" class="q-mt-md" />
    </q-form>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      book: {
        title: "",
        author: "",
        genre: "",
        year: "",
        description: "",
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post("http://localhost:3000/api/knjige", this.book);
        this.$q.notify({ type: "positive", message: response.data.message });
        this.book = { title: "", author: "", genre: "", year: "", description: "" }; // Reset forme
      } catch (error) {
        this.$q.notify({
          type: "negative",
          message: error.response?.data?.message || "Greška pri unosu knjige.",
        });
      }
    },
  },
};
</script>

<style scoped>
.unos-knjiga {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.form {
  max-width: 600px;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.q-input {
  margin-bottom: 20px;
}
</style>