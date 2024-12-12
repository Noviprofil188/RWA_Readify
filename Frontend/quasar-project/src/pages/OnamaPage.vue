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
      o_nama: `Gradska knjižnica Rijeka središnja je narodna knjižnica grada 
      Rijeke i matična knjižnica za narodne i školske knjižnice Primorsko-
      goranske županije. Ona je informacijsko, obrazovno, kulturno, 
      komunikacijsko i socijalno središte Rijeke i okolice usmjereno prema novom 
      stvaralaštvu, održivom razvoju i kvaliteti razvoja zajednice i čitateljske 
      kulture.`,
    };
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
</style>
