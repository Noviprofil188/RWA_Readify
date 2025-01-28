<template>
    <q-layout view="lHh Lpr lFf">
        <!-- Header -->
        <q-header elevated class="bg-primary text-white">
            <q-toolbar>
                <!-- Gumb za otvaranje/sklapanje izbornika -->
                <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

                <!-- Naslov aplikacije -->
                <q-toolbar-title>
                    Knjižnica - Korisnik Panel
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
        <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-2">
            <q-list padding>
                <!-- Naslov izbornika -->
                <q-item-label header class="text-weight-bold">
                    Izbornik
                </q-item-label>

                <!-- Linkovi u izborniku -->
                <q-item v-for="link in linksList" :key="link.title" clickable v-ripple @click="navigateTo(link.route)">
                    <q-item-section avatar>
                        <q-icon :name="link.icon" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>{{ link.title }}</q-item-label>
                        <q-item-label caption>{{ link.caption }}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-drawer>

        <!-- Glavni sadržaj -->
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const leftDrawerOpen = ref(false);
const user = reactive({});
const router = useRouter();

// Funkcija za otvaranje/sklapanje izbornika
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

// Funkcija za navigaciju
function navigateTo(route) {
  router.push(route);
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
    Object.assign(user, JSON.parse(storedUser));
  } else {
    router.push('/login'); // Ako korisnik nije prijavljen, preusmjeri na login
  }
});

// Linkovi u izborniku
const linksList = [
    {
        title: 'Početna',
        caption: 'Početna stranica',
        icon: 'home',
        route: '/profil',
    },
    {
        title: 'Popis knjiga',
        caption: 'Popis svih knjiga',
        icon: 'menu_book',
        route: '/profil/popis_knjiga',
    },
    {
        title: 'Rezervacija knjiga',
        caption: 'Rezerviraj knjige',
        icon: 'book',
        route: '/profil/rezervacija',
    },
    {
        title: 'Odjava',
        caption: 'Odjavi se iz sustava',
        icon: 'logout',
        action: logout,
    },
];

</script>

<style scoped>
/* Stilovi po potrebi */
</style>