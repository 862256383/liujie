<template>
  <div>
    <el-container class="wrap">
      <el-aside width="200px">
        <el-menu
          default-active="/"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          unique-opened
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <!-- 目录 -->
          <div v-for="item in info.menus" :key="item.id">
            <div v-if="item.children">
              <el-submenu :index="item.id+''">
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span>{{item.title}}</span>
                </template>
                <el-menu-item v-for="i in item.children" :key="i.id" :index="i.url">{{i.title}}</el-menu-item>
              </el-submenu>
            </div>
            <!-- 菜单 -->
            <div v-else>
              <el-menu-item :index="item.url">{{item.title}}</el-menu-item>
            </div>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="right">
            <p class="p">{{info.username}}</p>
            <el-button type="primary" @click="goOut">退出</el-button>
          </div>
        </el-header>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      info: "info",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeInfo: "reqChangeInfo",
    }),
    goOut() {
      this.reqChangeInfo({});
      this.$router.push("/login");
    },
  },
  mounted() {},
};
</script>
<style scoped>
.wrap {
  width: 100vw;
  height: 100vh;
}
.el-header,
.el-footer {
  background: rgb(51, 155, 153);
  color: #fff;
}

.el-aside {
  background-color: rgb(32, 34, 42);
  color: #fff;
}

.el-main {
  background-color: #fff;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.right {
  position: relative;
  float: right;
  margin: 12px 10px 0 0;
}
.p {
  position: absolute;
  right: 90px;
  line-height: 60px;
  bottom:-10px;
}
</style>