<template>
  <v-container ref="container">

    <v-sheet @click="filtershow=!filtershow;filtershow==true?filtercolor='red accent-3':filtercolor=''">
      <v-row class="pr-8 k-cursor-pointer" justify="end" align-content="center" align="center" no-gutters>
        <v-btn plain text>
          <v-icon :color="filtercolor" v-text="filtericon"></v-icon>
        </v-btn>
        <span class="k-opacity-7">点击此处以进行分类筛选</span>
      </v-row>
      <v-expand-transition>
        <v-sheet v-show="filtershow">
          <v-row no-gutters>
            <v-card elevation="0">
              <v-card-subtitle>年份：</v-card-subtitle>
            </v-card>
            <v-col cols="10" lg="11" xl="11">
              <v-sheet elevation="0">
                <v-chip-group>
                  <v-chip v-for="i in 23" :key="i" v-text="2022-(i-1)>2000?2022-(i-1):'2000以前'"></v-chip>
                </v-chip-group>
              </v-sheet>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-card elevation="0">
              <v-card-subtitle>类型：</v-card-subtitle>
            </v-card>
            <v-col cols="10" lg="11" xl="11">
              <v-sheet elevation="0">
                <v-chip-group>
                  <v-chip v-for="(i,index) in tags" v-text="i" :key="index"></v-chip>
                </v-chip-group>
              </v-sheet>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-card elevation="0">
              <v-card-subtitle>季度：</v-card-subtitle>
            </v-card>
            <v-col cols="10">
              <v-sheet elevation="0">
                <v-chip-group class="ml-lg-13">
                  <v-chip v-for="i in season" :key="i" v-text="i"></v-chip>
                </v-chip-group>
              </v-sheet>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-card elevation="0">
              <v-card-subtitle>排序：</v-card-subtitle>
            </v-card>
            <v-col cols="10">
              <v-sheet elevation="0">
                <v-chip-group class="ml-lg-13">
                  <v-chip v-for="(i,index) in sort" v-text="i" :key="index"></v-chip>
                </v-chip-group>
              </v-sheet>
            </v-col>
          </v-row>
        </v-sheet>
      </v-expand-transition>
    </v-sheet>

    <!--      内容区-->
    <v-row dense>
      <v-col v-for="i in 14" :key="i" :cols="viewport_type">
        <v-card
            @mouseenter="play_hover"
            @mouseleave="pause_leave"
            id="videoContainer"
            v-if="videoif"
            class="rounded-0 k-video-hov k-ov-hidden"
            max-height="420px"
        >
          <v-responsive class="k-ov-hidden" :aspect-ratio="16/9" max-height="56.25%" min-width="100%">
            <video id="video" class="k-full-width k-full-height" poster preload="metadata">
              <source :src="videosrc2" type="video/webm">
              <source :src="videosrc1" type="video/mp4">
              Sorry, your browser doesn't support embedded videos.
            </video>
          </v-responsive>

          <v-row dense no-gutters align-content="start" justify="start">
            <v-col cols="2">
              <v-avatar class="mt-3" :size="avatorsize">
                <img
                    :src="avatarimg"
                    alt="John"
                >
              </v-avatar>
            </v-col>
            <v-col cols="10">
              <p class="k-cursor-pointer mt-2 mb-0 mr-1 ml-0 text-subtitle-2 font-weight-medium k-text-twoline"
                 :title="video_title" v-text="video_title">
              </p>
              <v-tooltip top nudge-bottom="0" nudge-left="0" color="grey darken-4" class="rounded-0">
                <template v-slot:activator="{ on, attrs }">
                  <v-card-subtitle class="k-cursor-pointer px-0 mt-0 ma-0" v-bind="attrs" v-on="on">
                    <span class="k-font-size-12 k-font-family-bilibili font-weight-medium k-opacity-7"
                          v-text="video_author"></span>
                  </v-card-subtitle>
                </template>
                <span class="k-font-size-12" v-text="video_author">...</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!--    页脚分页-->
      <v-row class="mt-16 mb-12" align="center" align-content="center" justify="center">
        <div class="text-center">
          <v-pagination
              v-model="page"
              :length="15"
              :total-visible="7"
          ></v-pagination>
        </div>
      </v-row>
  </v-container>

</template>

<script>
import rerugun from "../../assets/pics/avators/rerugan.png"
import appbarwebm from "@/assets/webm/appbarvideo.webm";
import test from "../../assets/mp4/test.mp4"

export default {
  name: "FilmSites",
  components: {},
  props: {
    lightoff: Boolean,
  },

  data: () => ({
    avatorsize: 36,
    videoif: false,
    videosrc1: test,
    videosrc2: appbarwebm,
    filtericon: "mdi-filter-plus-outline",
    filtercolor: "",
    filtershow: false,
    page:1,

    avatarimg: rerugun,

    video_title: "【Kuyoru在这是视频的标题】。。。在这是视频的标题。。。。在这是视频的标题。。。。在这是视频的标题。。。在这是视频的标ssdasdsda题。。。",
    video_author: "HatsuneMiku",

    season: [
      "1月",
      "4月",
      "7月",
      "10月",
    ],
    sort: [
      "按点击次数", "按更新时间", "按名称"
    ],
    status: [
      "连载中", "已完结"
    ],
    tags: [
      "奇幻", "冒险", "爱情", "魔法", "搞笑", "热血", "治愈", "励志", "音乐", "悬疑", "萝莉", "后宫", "战争", "机战", "青春", "职场", "校园", "百合", "神魔", "血腥",
    ],
  }),
  methods: {
    importvideo() {
      //判断客户端类型，根据客户端类型决定是否需要加载视频,注意，视频标签在Vue实例初始化时存在
      let uA = navigator.userAgent
      if (uA.includes("Win") || uA.includes("Mac")) {
        this.videoif = true
      } else {
        this.videoif = false
      }
    },
    play_hover(e) {
      let v = e.currentTarget.querySelector('video');
      v.muted = true
      v.play()
      v.setAttribute('autoplay', true)
      v.setAttribute('loop', true)
    },
    pause_leave(e) {
      let v = e.currentTarget.querySelector('video');
      v.muted = false
      v.volume = 0.75
      v.pause()
      v.currentTime = 0
      v.removeAttribute('autoplay')
      v.removeAttribute('loop')
    },
    mycontent(e) {
      let a = e.currentTarget
      a.setAttribute('title', a.innerText)
    },
    myAuthor(e) {
      e.currentTarget.querySelector('span').innerText = e.currentTarget.innerText
    }
  },
  mounted() {
    this.importvideo()
  },
  computed: {
    viewport_type() {
      const {xs, sm, md, lg, xl} = this.$vuetify.breakpoint
      return xs ? 12 : sm ? 6 : md ? 4 : lg ? 3 : xl ? 2 : 3
    },

  }
}
</script>

<style scoped>
</style>