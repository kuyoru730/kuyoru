<template>
  <section id="Contents">
    <v-lazy>
      <FilmSites :lightoff="lightoff"/>
    </v-lazy>
  </section>
</template>

<script>
import FilmSites from "@/components/contents/FilmSites";

export default {
  name: "Contents",
  props: {
    lightoff: Boolean,
  },
  data() {
    return {}
  },
  components: {
    FilmSites
  },
  mounted() {
  }
}
</script>

<style scoped lang="less">

</style>