<template>
  <div class="bg">
    <div class="box">
      <h3>登录</h3>
      <div>
        <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
      </div>
      <div>
        <el-input placeholder="请输入密码" v-model="user.password" show-password clearable></el-input>
      </div>
      <el-button type="primary" @click="submit()">登录</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { login } from "../../utlis/request.js";
import { success, warning } from "../../utlis/alert.js";
export default {
  props: [],
  components: {},
  data() {
    return {
      user: {
        uaername: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters({
        info:'info'
    }),
  },
  methods: {
    ...mapActions({
        reqChangeInfo:'reqChangeInfo'
    }),
    submit() {
      login(this.user).then((res) => {
        if (res.data.code == 200) {
          success(res.data.msg);
         this.reqChangeInfo(res.data.list)
          this.$router.push('/')
        } else {
          warning(res.data.msg);
        }
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.bg {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, rgb(83, 52, 69), rgb(48, 60, 95));
}
.box {
  position: absolute;
  width: 440px;
  height: 260px;
  text-align: center;
  background-color: #fff;
  border-radius: 15px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.box div {
  width: 70%;
  margin: 10px auto;
}
</style>