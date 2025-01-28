<template>
  <q-page padding>
    <!-- content -->
    <q-card dark bordered class="bg-grey-9 my-card">
      <q-card-section>
        <q-img src="https://www.rijeka.hr/wp-content/uploads/2023/12/Nova-knji%C5%BEnica-4-901x600.jpg">
          <div class="text-h3 text-weight-bolder absolute-bottom text-center">O nama</div>
        </q-img>
      </q-card-section>
      <q-card-section class="text-h5 text-justify">
        {{ o_nama }}
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  setup() {
    return {
      o_nama: `Online knjižnica Readify omogućuje pretraživanje po nazivu, žarnu, 
      godini izadanja knjige, odaberite svoju najdražu. Ona je informacijsko, obrazovno, kulturno, 
      komunikacijsko i socijalno središte usmjereno prema novom stvaralaštvu, 
      održivom razvoju i kvaliteti razvoja zajednice i čitateljske kulture.`,
    };
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%

</style>
