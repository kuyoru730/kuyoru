<!--  专用的主滚动页面存放地-->
<template>
  <div id="nostyle">
    <div id="ctrlAll">
      <!--  左侧边栏-->
      <aside>
        <Sidebar :lightoff="lightoff"/>
      </aside>

      <!--  右侧全体区域-->
      <v-main class="k-relative">
        <v-card :dark="lightoff" class="rounded-0">
          <Contents :lightoff="lightoff"/>
        </v-card>
      </v-main>

    </div>
  </div>
</template>

<script>
import Contents from "@/components/Contents";
import Sidebar from "@/components/Sidebar";

export default {
  name: "Mainpage",
  components: {
    Contents,
    Sidebar,
  },
  props: {
    lightoff: Boolean
  },

  data: () => ({}),
  mounted() {

  }
}
</script>

<style scoped lang="less">

</style>