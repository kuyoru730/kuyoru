<template>
  <div id="apps" class="k-relative">
    <v-app>
      <v-app-bar
          app
          class="k-relative appbar"
          :dark="lightoff"
          clipped-left
          tile
      >
        <v-row align="center"
               no-gutters
               dense
        >
          <v-col cols="2">
            <v-img
                alt="Logo"
                class="shrink k-cursor-pointer k-display-inblock"
                contain
                :src="logos[0]"
                transition="scale-transition"
                height="inherit"
                width="50px"
                @click="reloadpage"
            />
          </v-col>
          <v-spacer class="d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex"></v-spacer>
          <v-col :lg="cols" :md="4" :sm="cols">
            <v-form class="mt-2">
              <v-text-field
                  id="search"
                  :label="whichsearch"
                  color="red accent-3"
                  hide-details="auto"
                  type="text"
                  clearable
                  clear-icon="mdi-close"
                  :value="inputerValue"
                  v-model="inputerValue"
                  @keyup.enter="gosearch"
                  @keyup.esc="clear"
              >
              </v-text-field>
            </v-form>
          </v-col>

          <!--        搜索图标按钮1col-->
          <v-btn text
                 small
                 fab
                 @click="changeLogoText"
                 class="ml-2"
          >
            <v-img
                alt="searchicon"
                :src="searchLogo"
                contain
                min-width="25px"
                max-width="26px"
            >
            </v-img>
          </v-btn>

          <v-spacer class="d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex"></v-spacer>

          <v-col
              cols="1" class="d-none d-md-flex d-lg-flex d-xl-flex"
          >
          </v-col>

          <v-col cols="2">
            <div id="rightBtns" class="k-display-flex-around">
              <!--        电源按钮-->
              <div @mouseenter="iconcolor4='orange' ; switchtip=true" @mouseleave="iconcolor4=''; switchtip=false"
                   id="switch" class="d-none d-md-flex d-lg-flex d-xl-flex">
                <v-btn
                    retain-focus-on-click
                    small
                    fab
                    text
                    @click="lightoff=!lightoff"
                >
                  <v-icon
                      :color="iconcolor4"
                      v-text="lighticon"
                  ></v-icon>
                </v-btn>
                <v-expand-transition>
                  <v-card v-show="switchtip"
                          class="k-absolute k-t-50 k-font-size-13 k-font-style-i k-opacity-8 k-box-sizing pl-1 pt-1"
                          width="45px" height="30px"><span v-text="lightoff==true?'开 灯':'关 灯'"></span></v-card>
                </v-expand-transition>
              </div>
              <!--        用户登录按钮-->
              <div
                  class="k-relative"
                  @mouseenter="usershow=true"
                  @mouseleave="usershow=false"
              >
                <v-btn
                    small
                    fab
                    target="_self"
                    :href="userlogin"
                    text
                    @mouseenter="iconcolor1='light-blue lighten-2'"
                    @mouseleave="iconcolor1=''"
                >
                  <v-icon v-text="loginicon" :color="iconcolor1"></v-icon>
                </v-btn>

                <v-expand-transition>
                  <div
                      v-show="usershow"
                      class="text-caption k-absolute k-box-shadow"
                  >
                    <!--            用户登录 选项列表 条件渲染-->
                    <div v-if="user.active==true">
                      <!--                已登录状态下的列表-->
                      <v-list tile>
                        <v-list-item dense>
                          <v-list-item-content>
                            <v-list-item-title class="font-italic" v-text="user.uname"></v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item dense>
                          <v-list-item-content>
                            <v-list-item-title v-text="user.uid"></v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item dense>
                          <v-list-item-content>
                            <v-list-item-title v-text="user.logout"></v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item dense
                                     v-if="user.active==true && user.vless==true && user.disabled==false || user.admin==true">
                          <v-list-item-content>
                            <v-list-item-title v-text="user.vlesstext"></v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </div>

                    <!--                等待登陆状态下的列表内容-->
                    <div v-if="user.active==false">
                      <v-list tile>
                        <v-list-item dense>
                          <v-list-item-content>
                            <v-list-item-title v-text="user.login"></v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </div>
                  </div>
                </v-expand-transition>

              </div>
              <!--        下拉菜单按钮-->
              <div
                  @mouseleave="menuShow=false"
                  @mouseenter="menuShow=true"
              >

                <!--          菜单容器-->
                <div class="k-relative">
                  <!--          菜单按钮-->
                  <v-btn
                      fab
                      small
                      text
                      @mouseenter="iconcolor2='purple lighten-3'"
                      @mouseleave="iconcolor2=''"
                  >
                    <v-icon v-text="menuicon" :color="iconcolor2"></v-icon>
                  </v-btn>

                  <v-expand-transition>
                    <!--              菜单列表-->
                    <div
                        v-show="menuShow"
                        class="k-absolute">
                      <v-list
                          tile
                          max-height="80vh"
                          class=""
                      >
                        <!--              组名称:关于本站-->
                        <v-list-group>
                          <template v-slot:activator>
                            <v-list-item-content>
                              <v-list-item-title v-text="menus[0].title"></v-list-item-title>
                            </v-list-item-content>
                          </template>
                          <!--                成员-->
                          <v-list-item dense v-for="i in 2" :key="i" :href="menus[0].option[i+1].outlink">
                            <v-list-item-content>
                              <v-list-item-title v-text="menus[0].option[i+1].optiontext"></v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-group>
                        <!--              组名称:反馈+往期版本-->
                        <v-list-group v-for="i in 2" :key="i">
                          <template v-slot:activator>
                            <v-list-item-content>
                              <v-list-item-title v-text="menus[0].option[i-1].optiontext"></v-list-item-title>
                            </v-list-item-content>
                          </template>
                          <!--                成员-->
                          <v-list-item dense v-for="(item,index) in menus[0].option[i-1].list" :key="index"
                                       :href="item.outlink">
                            <v-list-item-content>
                              <v-list-item-title v-text="item.optiontext"></v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-group>

                        <!--              组名称:快捷导航-->
                        <v-list-group>
                          <template v-slot:activator>
                            <v-list-item-content>
                              <v-list-item-title v-text="menus[1].title"></v-list-item-title>
                            </v-list-item-content>
                          </template>

                          <!--                成员-->
                          <v-list-item dense v-for="(item,index) in menus[1].option" :key="index" :href="item.outlink">
                            <v-list-item-content>
                              <v-list-item-title v-text="item.optiontext"></v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-group>

                        <!--              组名称:实用工具-->
                        <v-list-group>
                          <template v-slot:activator>
                            <v-list-item-content>
                              <v-list-item-title v-text="menus[2].title"></v-list-item-title>
                            </v-list-item-content>
                          </template>

                          <!--                成员-->
                          <v-list-item dense v-for="(item,index) in menus[2].option" :key="index" :href="item.outlink">
                            <v-list-item-content>
                              <v-list-item-title v-text="item.optiontext"></v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-group>

                      </v-list>
                    </div>

                  </v-expand-transition>

                </div>
              </div>
            </div>
          </v-col>

          <!--        最右侧的github，一个col-->
          <v-col
              cols="1"
              offset="0"
              class="d-none d-md-flex d-lg-flex d-xl-flex mr-lg-4 mr-md-2"
          >
            <v-btn
                :href="mygithub"
                target="_self"
                text
                @mouseenter="iconcolor3='green accent-3'"
                @mouseleave="iconcolor3=''"
            >
              <span class="mr-2 text-lowercase" v-text="whoami"></span>
              <v-icon v-text="githubicon" :color="iconcolor3" class="d-none d-md-flex d-lg-flex d-xl-flex"></v-icon>
            </v-btn>
          </v-col>

          <!--        右侧空占位列  间距：1/12-->
          <v-col cols="1" class="d-none d-md-flex d-lg-none d-xl-none"></v-col>
        </v-row>

      </v-app-bar>

      <!--      导航条以外的所有内容均放置在这个容器的次级容器当中-->
      <section id="vMain">
        <MainPage :lightoff="lightoff"/>
      </section>
    </v-app>
  </div>
</template>

<script>
import baiduicon from './assets/logos/baidu.svg';
import googleicon from './assets/logos/google.svg'
import MainPage from './components/MainPage';
import * as dayjs from 'dayjs'
import appbarwebm from './assets/webm/appbarvideo.webm'
import logo from "./assets/logos/logo.svg";
import lobo from "./assets/logos/logo-black.svg";

export default {
  name: 'App',
  components: {
    MainPage,
  },

  data: () => ({
    logos: [logo, lobo],

    lightoff: true,
    switchtip: false,
    lighticon: "mdi-lightning-bolt",

    inputerValue: "",
    whichsearchs: ["Google", "Baidu"],
    whichsearch: "Google",
    searchLogos: [googleicon, baiduicon],
    searchLogo: googleicon,

    userlogin: "#",
    iconcolor1: "",
    iconcolor2: "",
    iconcolor3: "",
    iconcolor4: "",
    menuicon: "mdi-apps",
    loginicon: "mdi-account-circle-outline",
    githubicon: "mdi-github",
    mygithub: "https://github.com/kuyoru730/kuyoru",
    whoami: "kuyoru",

    closeOnContentClick: false,
    menuShow: false,

    // 账号选项
    usershow: false,
    user: {
      uname: "kty",
      uid: 1001,
      collection: "我的收藏",
      logout: "退出登录",
      gender: "女",
      umail: "邮箱",
      pwd: "密码",
      pwd2: "二级密码",
      login: "登录",
      latestlogintime: "上次登录日期",
      latestloginip: "上次登录ip",
      latestloginclient: "上次登录客户端",
      registdate: "注册日期",
      registip: "注册ip",
      registclient: "注册客户端",
      linkedqq: 123456,
      linkedwx: "关联微信",
      linkedphone: 10086,
      vlesstext: "vless",
      admin: false,
      vless: false,
      active: false,
      disabled: false,
      secondaryVerification: false,
    },

    // 菜单数据组,组的每一个对象是子选项
    // title 标题
    // Option 选项组
    // optiontext 选项名
    // outlink 选项指向的链接
    menus: [
      {
        title: "关于本站",
        option: [
          {
            optiontext: "反馈", outlink: "#",
            list: [
              {optiontext: "Telegram", outlink: "https://t.me/+S_Aq-HW_EU0yZDRl"},
              {optiontext: "Issue", outlink: "https://github.com/kuyoru730/kuyoru/issues"},
              {optiontext: "Twitter", outlink: "https://twitter.com/kuyoru_illust"},
            ]
          },
          {
            optiontext: "往期版本", outlink: "#",
            list: [
              {optiontext: "v1.1", outlink: "#"},
              {optiontext: "v1.2", outlink: "#"},
            ]
          },
          {optiontext: "介绍", outlink: "#"},
          {optiontext: "指引", outlink: "#"},
        ]
      },
      {
        title: "快捷导航", outlink: "#",
        option: [
          {optiontext: "看视频", outlink: "#"},
          {optiontext: "看动漫", outlink: "#"},
          {optiontext: "看漫画", outlink: "#"},
          {optiontext: "番剧bt", outlink: "#"},
          {optiontext: "ACG美图", outlink: "#"},
          {optiontext: "编程工具", outlink: "#"},
        ]
      },
      {
        title: "实用工具", outlink: "#",
        option: [
          {optiontext: "谷歌翻译", outlink: "https://translate.google.cn/"},
          {optiontext: "沪江词典", outlink: "https://dict.hjenglish.com/"},
          {optiontext: "Convertio", outlink: "https://convertio.co/zh/"},
          {optiontext: "谷歌邮箱", outlink: "https://mail.google.com/"},
          {optiontext: "QQ邮箱", outlink: "https://mail.qq.com/"},
          {optiontext: "汇率计算", outlink: "https://www.xe.com/zh-CN/"},
          {optiontext: "腾讯云", outlink: "https://cloud.tencent.com/"},
          {optiontext: "Namesilo", outlink: "https://www.namesilo.com/"},
          {optiontext: "Cloud flare", outlink: "https://dash.cloudflare.com/"},
        ]
      },
    ],
  }),
  methods: {
    clear() {
      this.inputerValue = ""
    },
    gosearch() {
      if (this.whichsearch == "Google" && this.inputerValue != "") {
        window.location = "https://www.google.com.hk/search?q=" + this.inputerValue
      } else if (this.whichsearch == "Baidu" && this.inputerValue != "") {
        window.location = "https://www.baidu.com/s?wd=" + this.inputerValue
      }else if (this.inputerValue==""){
        alert('您必须输入内容才能搜索')
      }
    },
    changeLogoText() {
      let w = this.whichsearchs
      let s = this.searchLogos
      if (this.whichsearch == w[0] && this.searchLogo == s[0]) {
        this.whichsearch = w[1]
        this.searchLogo = s[1]
      } else {
        this.whichsearch = w[0]
        this.searchLogo = s[0]
      }
    },
    reloadpage() {
      window.location.reload(true)
    },
  },
  computed: {
    cols() {
      const {lg, sm} = this.$vuetify.breakpoint
      if (lg) {
        return 5
      } else {
        if (sm) {
          return 6
        } else {
          return 6
        }
      }
    },
  },
  mounted() {

  },
  created() {

  }
};
</script>

<style lang="less" scoped>

</style>