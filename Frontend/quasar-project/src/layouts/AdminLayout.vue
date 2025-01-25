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

// Stanje za otvoren/zatvoren izbornik
const leftDrawerOpen = ref(false);

// Podaci o prijavljenom korisniku
const user = ref(null);

// Router za navigaciju
const router = useRouter();

// Linkovi u izborniku
const linksList = [
  {
    title: 'Početna',
    caption: 'Početna stranica',
    icon: 'home',
    link: '/admin',
  },
  {
    title: 'Popis knjiga',
    caption: 'Popis svih knjiga',
    icon: 'menu_book',
    link: '/admin/popis_knjiga',
  },
  {
    title: 'Pretraživanje',
    caption: 'Traži knjigu',
    icon: 'search',
    link: '/admin/pretrazivanje',
  },
  {
    title: 'Popis korisnika',
    caption: 'Popis svih korisnika',
    icon: 'people',
    link: '/admin/pregled_korisnika',
  },
  {
    title: 'Unos knjiga',
    caption: 'Unos novih knjiga',
    icon: 'add',
    link: '/admin/unos_knjiga',
  },
  {
    title: 'Odjava',
    caption: 'Odjavi se iz sustava',
    icon: 'logout',
    link: '/login',
  },
];

// Funkcija za otvaranje/sklapanje izbornika
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
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
/* Stilovi za header */
.q-header {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Stilovi za izbornik */
.q-drawer {
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
}

/* Stilovi za linkove u izborniku */
.q-item {
  transition: background-color 0.3s;
}

.q-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>