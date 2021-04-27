<template>
  <div>
    <el-dialog title="提示" :visible.sync="innerVisible" width="50%" @close="cancel">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="昵称">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="edit">编辑</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { memberInfo, memberEdit } from "../../../utlis/request.js";
import { success, warning } from "../../../utlis/alert.js";
export default {
  props: [],
  components: {},
  data() {
    return {
      form: {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
      innerVisible: false,
      uid: "",
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      reqChangeList: "member/reqChangeList",
    }),
    cancel() {
      this.innerVisible = false;
      // 清空form表单
      this.form = {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      };
    },
    // 确定编辑
    edit() {
      console.log(this.form);
      memberEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          success(res.data.msg);
          this.reqChangeList();
          this.cancel()
        } else {
          warning(res.data.msg);
        }
      });
    },
  },
  mounted() {
    // 接收数据
    this.Event.$on("switch", (e, uid) => {
      this.innerVisible = e;
      this.uid = uid;
      memberInfo(this.uid).then((res) => {
        this.form = res.data.list;
        this.form.password = "";
      });
    });
  },
};
</script>
<style scoped>
</style>