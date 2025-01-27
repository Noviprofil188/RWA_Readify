<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <!-- Gumb za otvaranje/sklapanje izbornika -->
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <!-- Naslov aplikacije -->
        <q-toolbar-title>
          Knjižnica - Admin Panel
        </q-toolbar-title>

        <!-- Prikaz trenutno prijavljenog korisnika -->
        <div v-if="user" class="q-mr-sm">
          <q-icon name="person" class="q-mr-xs" />
          {{ user.username }} ({{ user.role }})
        </div>

        <!-- Gumb za odjavu -->
        <q-btn flat round icon="logout" @click="logout" />
      </q-toolbar>
    </q-header>

    <!-- Sidebar (Lijevi izbornik) -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
    >
      <q-list padding>
        <!-- Naslov izbornika -->
        <q-item-label header class="text-weight-bold">
          Izbornik
        </q-item-label>

        <!-- Linkovi u izborniku -->
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
          @click="navigateTo(link.route)"
        />
      </q-list>
    </q-drawer>

    <!-- Glavni sadržaj -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import EssentialLink from 'components/EssentialLink.vue';

const leftDrawerOpen = ref(false);
const user = ref(null);
const router = useRouter();

// Linkovi u izborniku
const linksList = [
  {
    title: 'Početna',
    caption: 'Početna stranica',
    icon: 'home',
    route: '/admin',
  },
  {
    title: 'Popis knjiga',
    caption: 'Popis svih knjiga',
    icon: 'menu_book',
    route: '/admin/popis_knjiga',
  },
  {
    title: 'Popis korisnika',
    caption: 'Popis svih korisnika',
    icon: 'people',
    route: '/admin/popis_korisnika',
  },
  {
    title: 'Unos knjiga',
    caption: 'Unos novih knjiga',
    icon: 'add',
    route: '/admin/unos_knjiga',
  },
  {
    title: 'Rezervacija knjiga',
    caption: 'Rezerviraj knjige',
    icon: 'book',
    route: '/admin/rezervacija',
  },
  {
    title: 'Odjava',
    caption: 'Odjavi se iz sustava',
    icon: 'logout',
    route: '/login',
  },

];

// Funkcija za otvaranje/sklapanje izbornika
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

// Funkcija za navigaciju
function navigateTo(route) {
  if (route === '/login') {
    logout();
  } else {
    router.push(route);
  }
}

// Funkcija za odjavu
function logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('role');
  router.push('/login');
}

// Dohvati podatke o prijavljenom korisniku prilikom učitavanja komponente
onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    user.value = JSON.parse(storedUser);
  } else {
    router.push('/login'); // Ako korisnik nije prijavljen, preusmjeri na login
  }
});
</script>

<style scoped>
/* Stilovi po potrebi */
</style>