<template>
  <q-page padding>
    <q-card dark bordered class="bg-grey-9 my-card">
      <q-card-section>
        <div class="text-h6 text-weight-bold">
          O nama:
        </div>
        <p class="q-mt-sm text-body1" v-text="o_nama"></p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  setup() {
    return {
      o_nama: `Ova stranica je namjenjena za login korisnika.`,
    };
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
</style>
