<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 1200px; width: 100%;">

      <!-- Naslov aplikacije -->
      <div class="text-h3 q-mb-md" style="text-align: center;">
        Dobrodošli u knjižnicu knjiga!
      </div>

      <!-- Kratki opis aplikacije -->
      <div class="text-subtitle1 q-mb-md" style="text-align: center;">
        Otkrijte najnovije i najpopularnije knjige. Pretražujte različite žanrove i nađite svoju sljedeću omiljenu knjigu.
      </div>

      <!-- Slika -->
      <div class="q-mb-md" style="text-align: center;">
        <img
          src="~assets/skolska_knjiznica.jpg"
          alt="Knjižnica"
          style="max-width: 100%; height: auto; border-radius: 8px;"
        />
      </div>

    </div>
  </q-page>
</template>

<script setup>
defineOptions({
  name: 'IndexPage'
})
</script>
