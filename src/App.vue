<template>
  <v-app>
    <v-app-bar
        app
        color="grey darken-4"
        dark
    >
      <v-row align="center"
             no-gutters
             dense
      >
        <!--        1 4 1 spacer 1 1-->
        <v-col cols="1" align-self="center">
          <v-img
              alt="Logo"
              class="shrink"
              contain
              src="https://1-1309450330.cos.ap-hongkong.myqcloud.com/logos/logo.svg"
              transition="scale-transition"
              height="50px"
              width="50px"
          />

        </v-col>
        <v-col :lg="cols" :md="4" :sm="cols">
          <v-form>
            <v-text-field
                id="search"
                :label="whichsearch"
                color="red accent-3"
                hide-details="auto"
                type="text"
                clearable=true
                clear-icon="mdi-close"
                :value="inputerValue"
            >
            </v-text-field>
          </v-form>
        </v-col>

        <!--        搜索图标按钮1col-->
        <v-col cols="1">
          <v-btn dark=true
                 depressed=true
                 max-width="29px"
                 height="29px"
                 @click="changeLogoText"
                 x-small=true
                 class="ml-2"
          >
            <v-img
                class="v-card--link"
                alt="searchicon"
                :src="searchLogo"
                contain=true
                min-width="25px"
                max-width="26px"
            >
            </v-img>
          </v-btn>
        </v-col>

        <v-spacer class="d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex"></v-spacer>

        <v-col
            cols="1"
        >
        </v-col>

        <div
            class="menu-container"
            @mouseenter="usershow=true"
            @mouseleave="usershow=false"
        >
          <!--        用户登录按钮，未分配col-->
          <v-btn
              small
              fab
              target="_self"
              :href="userlogin"
              class="mr-2"
          >
            <v-icon v-text="loginicon" color="deep-purple lighten-5"></v-icon>
          </v-btn>

          <v-expand-transition>
            <div
                v-show="usershow"
                class="menu-list text-caption"
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
                  <v-list-item dense v-if="user.active==true && user.vless==true && user.disabled==false || user.admin==true">
                    <v-list-item-content>
                      <v-list-item-title v-text="user.vlesstext"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </div>
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

        <!--        下拉菜单，未分配col-->
        <div
            @mouseleave="menuShow=false"
            @mouseenter="menuShow=true"
        >

          <!--          菜单容器-->
          <div class="menu-container">
            <!--          菜单按钮-->
            <v-btn
                v-bind="attrs"
                v-on="on"
                fab
                small
            >
              <v-icon color="deep-purple lighten-5" v-text="menuicon"></v-icon>
            </v-btn>

            <v-expand-transition>

              <!--              菜单列表-->
              <div
                  v-show="menuShow"
                  class="menu-list">
                <v-list
                    tile
                    color=""
                    max-height="80vh"
                    class="scroller-y"
                >
                  <!--              组名称:关于本站-->
                  <v-list-group>
                    <template v-slot:activator>
                      <v-list-item-content>
                        <v-list-item-title v-text="menus[0].title"></v-list-item-title>
                      </v-list-item-content>
                    </template>
                    <!--                成员-->
                    <v-list-item dense v-for="i in 2" :key="i">
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
                    <v-list-item dense v-for="(item,index) in menus[0].option[i-1].list" :key="index">
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
                    <v-list-item dense v-for="(item,index) in menus[1].option" :key="index">
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
                    <v-list-item dense v-for="(item,index) in menus[2].option" :key="index">
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

        <!--        最右侧的github，一个col-->
        <v-col
            cols="1"
            offset="0"
            class="d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex mr-lg-4 mr-sm-2"
        >
          <v-btn
              :href="mygithub"
              target="_self"
              text
          >
            <span class="mr-2 text-lowercase" v-text="whoami"></span>
            <v-icon v-text="githubicon" class="d-none d-md-flex d-lg-flex d-xl-flex"></v-icon>
          </v-btn>
        </v-col>

        <!--        右侧空占位列  间距：1/12-->
        <v-col cols="1" class="d-none d-sm-flex d-md-flex d-lg-none d-xl-none"></v-col>
      </v-row>
    </v-app-bar>

    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import baiduicon from './assets/logos/baidu.svg';
import googleicon from './assets/logos/google.svg'
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },

  data: () => ({
    inputerValue: "",
    whichsearchs: ["Google", "Baidu"],
    whichsearch: "Google",
    searchLogos: [googleicon, baiduicon],
    searchLogo: googleicon,

    userlogin: "#",
    loginicon: "mdi-account-circle-outline",
    menuicon: "mdi-dots-horizontal",
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
      vlesstext:"vless",
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
            optiontext: "反馈", outlink: "",
            list: [
              {optiontext: "Telegram", outlink: ""},
              {optiontext: "Issue", outlink: ""},
            ]
          },
          {
            optiontext: "往期版本", outlink: "",
            list: [
              {optiontext: "v1.1", outlink: ""},
              {optiontext: "v1.2", outlink: ""},
            ]
          },
          {optiontext: "介绍", outlink: ""},
          {optiontext: "指引", outlink: ""},
        ]
      },
      {
        title: "快捷导航", outlink: "",
        option: [
          {optiontext: "看视频", outlink: ""},
          {optiontext: "看动漫", outlink: ""},
          {optiontext: "看漫画", outlink: ""},
          {optiontext: "番剧bt", outlink: ""},
          {optiontext: "ACG美图", outlink: ""},
          {optiontext: "编程工具", outlink: ""},
        ]
      },
      {
        title: "实用工具", outlink: "",
        option: [
          {optiontext: "谷歌翻译", outlink: ""},
          {optiontext: "沪江词典", outlink: ""},
          {optiontext: "Convertio", outlink: ""},
          {optiontext: "谷歌邮箱", outlink: ""},
          {optiontext: "QQ邮箱", outlink: ""},
          {optiontext: "汇率计算", outlink: ""},
          {optiontext: "Namesilo", outlink: ""},
          {optiontext: "Cloud flare", outlink: ""},
        ]
      },
    ],
  }),
  methods: {
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
  },
  computed: {
    cols() {
      const {lg, sm} = this.$vuetify.breakpoint
      if (lg) {
        return 4
      } else {
        if (sm) {
          return 6
        } else {
          return 6
        }
      }
    }
  },
  mounted() {

  }
};
</script>

<style lang="less">
::selection {
  background-color: #000000;
  color: #1cbbff;
}

.menu-list {
  position: absolute;
  right: 0;
}

.menu-container {
  position: relative;
}

.scroller-y {
  overflow: auto;
}

::-webkit-scrollbar {
  width: .4rem;
  height: .4rem;
  background: hsl(0, 0%, 4%);
}

::-webkit-scrollbar-track {
  border-radius: 0;
}

::-webkit-scrollbar-thumb {
  border-radius: 0;
  background-color: rgba(174, 231, 248, 0.67);
  transition: all .2s;
  border-radius: .5rem;

  &:hover {
    background-color: rgba(75, 178, 252, 0.68);
  }
}
</style>