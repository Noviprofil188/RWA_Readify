<template>
  <q-page padding>
    <div id="map" style="height: 500px;"></div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  setup() {
    const initialMap = ref(null); // Inicijalizacija reference za kartu

    onMounted(() => {
      // Kreiranje karte na elementu s ID-jem 'map'
      initialMap.value = L.map('map').setView([45.3381, 14.42480], 17);

      // Dodavanje tile layer-a (ploča) na kartu
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(initialMap.value);
    });

    return {
      initialMap,
    };
  },
};
</script>

<style scoped>
/* Dodavanje osnovnog stila za mapu */
#map {
  width: 100%;
  height: 500px; /* Visina mape definirana u inline stilu unutar <template> */
}
</style>
