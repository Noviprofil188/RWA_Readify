<template>
  <q-layout view="lHh Lpr lFf">
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
          Knjiznica projekt
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

defineOptions({
  name: 'MainLayout'
})

const linksList = [
  {
    title: 'Login',
    caption: 'Stranica za log in',
    icon: 'login',
    link: '#/login'
  },
  {
    title: 'Lokacija',
    caption: 'Lokacija',
    icon: 'location_on',
    link: '#/lokacija'
  },
  {
    title: 'Mapa',
    caption: 'Mapa knjiga',
    icon: 'map',
    link: '#/mapa'
  },
  {
    title: 'Onama',
    caption: 'O nama',
    icon: 'diversity_3',
    link: '#/o_nama'
  },
  {
    title: 'Popis knjiga',
    caption: 'Popis svih knjiga',
    icon: 'book',
    link: '#/popis_knjiga'
  },
  {
    title: 'Registracija',
    caption: 'Registracija',
    icon: 'person',
    link: '#/registracija'
  },
  {
    title: 'Traži knjigu',
    caption: 'Pretraži knjigu',
    icon: 'search',
    link: '#/TraziKnjigu'
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>