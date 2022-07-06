<template>
  <section id="FilmApp" ref="FilmApp">
    <v-container >
      <!--    视差动画-->
      <v-responsive
          id="videoContainer"
          v-if="videoif"
          :aspect-ratio="aspectratio"
          max-height="80px"
      >
          <video id="video" class="k-full-width k-relative k-transform-yn5" autoplay loop poster>
            <source :src="videosrc2" type="video/webm">
            <source :src="videosrc1" type="video/mp4">
            Sorry, your browser doesn't support embedded videos.
          </video>
      </v-responsive>

<!--      内容区-->
      <section class="k-width-percent-90 mx-auto">

      <p v-for="i in 100" v-text="i+'Apppppppppppppppppppppppppppppppppppppppppp'+i"></p>
      </section>

    </v-container>

  </section>
</template>

<script>
import appbarwebm from "@/assets/webm/appbarvideo.webm";

export default {
  name: "FilmSites",
  props:{
    lightoff:Boolean,
  },

  data: () => ({
    aspectratio:5,

    videoif: false,
    videosrc1: "https://1-1309450330.cos.ap-hongkong.myqcloud.com/videos/madshot.mp4",
    videosrc2: appbarwebm,
  }),
  methods:{
    videoelement(){
    //判断客户端类型，根据客户端类型决定是否需要加载视频,注意，视频标签在Vue实例初始化时存在
      let uA = navigator.userAgent
      if (uA.includes("Win") || uA.includes("Mac")) {
        this.videoif = true
      } else {
        this.videoif = false
      }
      let video = document.querySelector("#video");
      video.addEventListener('error', () => {
        this.videoif = false
      })
    }
  },
  mounted() {
    this.videoelement()

    // stellar

  }
}
</script>

<style scoped>

</style>