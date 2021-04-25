<template>
  <div>
    <el-dialog
      :title="obj.isAdd ? '添加管理员' : '编辑管理员'"
      :visible.sync="obj.isTrue"
      width="50%"
      @close="cancel"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="所属角色">
          <el-select v-model="form.roleid">
            <el-option
              label="--请选择--"
              disabled
              v-model="form.roleid"
            ></el-option>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="submit()" v-if="obj.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="edit">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { manageAdd, manageInfo, manageEdit } from "../../../utlis/request.js";
import { success, warning } from "../../../utlis/alert.js";
export default {
  props: ["obj"],
  components: {},
  data() {
    return {
      form: {
        roleid: 1,
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      roleList: "role/list",
      manageList: "manage/list",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeList: "role/reqChangeList",
      reqManageList: "manage/reqChangeList",
      reqChangeCount: "manage/reqChangeCount",
    }),
    cancel() {
      this.obj.isTrue = false;
      this.form = {
        roleid: 1,
        username: "",
        password: "",
        status: 1,
      };
    },
    submit() {
      // console.log(this.form);
      manageAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          success(res.data.msg);
          this.cancel();
          this.reqManageList();
          this.reqChangeCount();
        } else {
          warning(res.data.msg);
        }
      });
    },
    getOne(uid) {
      manageInfo(uid).then((res) => {
        this.form = res.data.list;
        this.form.password = "";
      });
    },
    edit() {
      // console.log(this.form);
      manageEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          success(res.data.msg);
          this.cancel();
          this.reqManageList();
        } else {
          warning(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.reqChangeList();
    this.reqManageList();
  },
};
</script>
<style scoped>
</style>