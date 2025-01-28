<template>
  <q-page padding>
    <h1 class="text-h4 q-mb-md">Unos knjiga</h1>

    <!-- Forma za unos knjige -->
    <q-form @submit="submitForm">
      <q-input v-model="book.naslov" label="Naslov knjige" outlined dense required />
      <q-input v-model="book.autor" label="Autor" outlined dense required />
      <q-input v-model="book.zarn" label="Žanr" outlined dense />
      <q-input v-model="book.godina_izdanja" label="Godina izdanja" type="number" outlined dense />

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
        naslov: "",
        autor: "",
        zarn: "",
        godina_izdanja: "",
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post("http://localhost:3000/api/knjige", this.book);
        
        // Koristite alert umjesto this.$q.notify
        alert(response.data.message || "Knjiga uspješno dodana!");

        // Reset forme
        this.book = { naslov: "", autor: "", zarn: "", godina_izdanja: "" };
      } catch (error) {
        // Koristite alert za prikaz grešaka
        alert(error.response?.data?.message || "Greška pri unosu knjige.");
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