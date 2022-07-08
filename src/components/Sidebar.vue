<template>
  <v-navigation-drawer app :dark="lightoff" clipped :expand-on-hover="expandOnHover" :value="showif">
    <v-card class="rounded-0">
      <v-list v-for="i in 12" :key="i">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ i }}+++++++++++++</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Sidebar",

  props: {
    lightoff: Boolean,
  },

  data: () => ({
    expandOnHover: false,  // 左边栏控制，true折叠
    showif: "any",         // 左边栏控制，空字段则隐藏
  }),
  methods: {},
  mounted() {
  }
}
</script>

<style scoped>

</style>