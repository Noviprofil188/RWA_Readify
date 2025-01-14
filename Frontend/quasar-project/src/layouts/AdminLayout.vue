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
  name: 'AdminLayout'
})

const linksList = [
  {
    title: 'Početna',
    caption: 'Početna stranica',
    icon: 'home',
    link: '#/admin/'
  },
  {
    title: 'Popis knjiga',
    caption: 'Popis svih knjiga',
    icon: 'book',
    link: '#/admin/popis_knjiga'
  },
  {
    title: 'Pretraživanje',
    caption: 'Traži knjigu',
    icon: 'book',
    link: '#/admin/pretrazivanje'
  },
  {
    title: 'Popis korisnika',
    caption: 'Popis svih korisnika',
    icon: 'local_library',
    link: '#/admin/pregled_korisnika'
  },
  {
    title: 'Unos knjiga',
    caption: 'Unos knjiga',
    icon: 'local_library',
    link: '#/admin/unos_knjiga'
  },
  {
    title: 'Logout',
    caption: 'Odjava',
    icon: 'person',
    link: '#/'
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>