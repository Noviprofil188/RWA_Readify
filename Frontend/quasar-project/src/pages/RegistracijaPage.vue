<template>
  <q-page padding>
    <h1 class="text-h4 text-bold text-center">Registracija</h1>
    <q-form class="q-gutter-md" @submit="handleSubmit">
      <q-input filled v-model="user.name" label="Ime" />
      <q-input filled v-model="user.surname" label="Prezime" />
      <q-input filled v-model="user.username" label="Korisničko ime" />
      <q-input filled v-model="user.email" label="Email" type="email" />
      <q-input filled v-model="user.password" label="Lozinka" type="password" />
      <q-btn type="submit" color="primary" label="Potvrdi" />
    </q-form>
  </q-page>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    const user = ref({
      name: "",
      surname: "",
      username: "",
      email: "",
      password: "",
    });

    const router = useRouter();

    const handleSubmit = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/korisnici",
          {
            ime: user.value.name,
            prezime: user.value.surname,
            username: user.value.username,
            email: user.value.email,
            lozinka: user.value.password,
          }
        );
        console.log("Registracija uspješna:", response.data);
        alert("Registracija uspješna!");
        router.push("/popis_knjiga"); // Ovo treba preusmjeriti na stranicu profila
      } catch (error) {
        console.error("Greška pri registraciji:", error);
        alert(error.response?.data?.message || "Greška na serveru.");
      }
    };

    return { user, handleSubmit };
  },
};
</script>