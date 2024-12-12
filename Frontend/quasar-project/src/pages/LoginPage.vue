<template>
  <q-page padding>
    <h1 class="text-h4 text-bold text-center">Prijava</h1>
    <q-form class="q-gutter-md" @submit="handleLogin">
      <q-input filled v-model="credentials.username" label="Korisničko ime" />
      <q-input filled v-model="credentials.password" label="Lozinka" type="password" />
      <q-btn type="submit" color="primary" label="Potvrdi" />
    </q-form>
  </q-page>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const credentials = ref({
      username: '',
      password: '',
    });

    const handleLogin = () => {
      console.log('Credentials:', credentials.value);
      alert('Prijava uspješna!');
    };

    return { credentials, handleLogin };
  },
};
</script>
