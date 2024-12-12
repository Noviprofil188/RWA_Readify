<template>
  <q-page padding>
    <h1 class="text-h4 text-bold text-center">Registracija</h1>
    <q-form class="q-gutter-md" @submit="handleSubmit">
      <q-input filled v-model="user.name" label="Ime" />
      <q-input filled v-model="user.surname" label="Prezime" />
      <q-input filled v-model="user.email" label="Email" type="email" />
      <q-input filled v-model="user.username" label="Korisničko ime" />
      <q-input filled v-model="user.password" label="Lozinka" type="password" />
      <q-btn type="submit" color="primary" label="Potvrdi" />
    </q-form>
  </q-page>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const user = ref({
      name: '',
      surname: '',
      email: '',
      username: '',
      password: '',
    });

    const handleSubmit = () => {
      console.log('User data:', user.value);
      alert('Registracija uspješna!');
    };

    return { user, handleSubmit };
  },
};
</script>
