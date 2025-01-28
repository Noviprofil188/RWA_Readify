<template>
    <q-layout view="lHh Lpr lFf">
      <!-- Zaglavlje -->
      <q-header elevated>
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
          />
  
          <q-toolbar-title>
            Moj Profil
          </q-toolbar-title>
  
          <q-btn flat round dense icon="logout" @click="logout" />
        </q-toolbar>
      </q-header>
  
      <!-- Navigacija (lijeva strana) -->
      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
      >
        <q-list>
          <q-item-label header>
            Navigacija
          </q-item-label>
  
          <q-item clickable v-ripple to="/profil">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>
              Moj Profil
            </q-item-section>
          </q-item>
  
          <q-item clickable v-ripple to="/profil/popis_knjiga">
            <q-item-section avatar>
              <q-icon name="menu_book" />
            </q-item-section>
            <q-item-section>
              Popis Knjiga
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
  
  <script>
  export default {
    data() {
      return {
        leftDrawerOpen: false,
      };
    },
    methods: {
      toggleLeftDrawer() {
        this.leftDrawerOpen = !this.leftDrawerOpen;
      },
      logout() {
        this.$store.dispatch('auth/logout'); // Poziv Vuex akcije za odjavu
        this.$router.push('/login'); // Preusmjeri na stranicu za prijavu
      },
    },
  };
  </script>