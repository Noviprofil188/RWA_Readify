<template>
  <q-page class="flex flex-center">
    <q-card class="q-ma-md" style="width: 400px;">
      <q-card-section>
        <div class="text-h6">Prijavite se</div>
        
        <!-- Input za Email -->
        <q-input
          v-model="email"
          label="Email"
          type="email"
          outlined
          dense
          class="q-mb-md"
        />
        
        <!-- Input za Lozinku -->
        <q-input
          v-model="password"
          label="Lozinka"
          type="password"
          outlined
          dense
          class="q-mb-md"
        />
        
        <!-- Gumb za prijavu -->
        <q-btn
          label="Prijava"
          color="primary"
          @click="login"
          :disabled="loading"
          class="full-width"
        />
        
        <!-- Prikaz greške ako prijava nije uspješna -->
        <div v-if="error" class="text-negative q-mt-md">{{ error }}</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Definicija varijabli
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()

// Funkcija za prijavu
const login = () => {
  loading.value = true
  error.value = '' // Resetiraj grešku prije nove prijave

  // Provjera prijave na temelju emaila i lozinke
  if (email.value === 'dhaskic@veleri.hr' && password.value === 'admin1') {
    // Ako je korisnik admin
    localStorage.setItem('role', 'admin') // Pohranjuje role kao admin
    localStorage.setItem('email', email.value) // Pohranjuje email
    router.push('/admin') // Preusmjerenje na admin stranicu
  } else if (email.value === 'korisnik@korisnik.com' && password.value === 'korisnik123') {
    // Ako je korisnik obični korisnik
    localStorage.setItem('role', 'user') // Pohranjuje role kao user
    router.push('/') // Preusmjerenje na početnu stranicu
  } else {
    // Ako prijava nije uspješna
    error.value = 'Krivi email ili lozinka!' // Prikazuje poruku o grešci
  }

  loading.value = false
}
</script>

<style scoped>
.q-page {
  background-color: #f5f5f5;
}

.q-card {
  max-width: 400px;
}
</style>
