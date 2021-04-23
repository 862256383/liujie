<template>
<div class="bg">
    <div class="box">
        <h3>登录</h3>
        <div>
           用户名： <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
        </div>
        <div>
           密&emsp;码： <el-input placeholder="请输入密码" v-model="user.password" show-password clearable></el-input>
        </div>
        <el-button type="primary">登录</el-button>
    </div>
</div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex';
export default {
props: [],
components: {},
data() {
return {
    user:{
        uaername:'',
        password:''
    }
};
},
computed: {
...mapGetters({}),
},
methods: {
...mapActions({}),
},
mounted() {},
};
</script>
<style scoped>
.bg{
    width: 100vw;
    height: 100vh;
    background:linear-gradient(to right,rgb(83,52,69),rgb(48,60,95));
}
.box{
    position:absolute;
    width: 440px;
    height: 260px;
    text-align: center;
    background-color: #fff;
    border-radius:15px;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%)
}
.box div{
    width: 70%;
    margin:10px auto;
}
</style>