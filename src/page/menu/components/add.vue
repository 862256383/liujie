<template>
  <div>
    <el-dialog :title="obj.isAdd?'菜单添加':'菜单编辑'" :visible.sync="obj.isTrue" width="50%" @close="cancel">
      <el-form ref="form" :model="form" label-width="80px" @close="cancel">
        <el-form-item label="菜单名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select v-model="form.pid" placeholder="请选择上级菜单" @change="changePid()">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in menuList" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型">
          <el-radio-group v-model="form.type">
            <el-radio :label="1" disabled>目录</el-radio>
            <el-radio :label="2" disabled>菜单</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单图标" v-if="form.pid==0">
          <el-select v-model="form.icon" placeholder="请选择菜单图标">
            <el-option v-for="(item, index) in iconArr" :key="index" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" v-else>
          <el-select v-model="form.url" placeholder="请选择菜单地址">
            <el-option
              v-for="item in secondRouter"
              :key="item.path"
              :label="item.name"
              :value="'/' + item.path"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit" v-if="obj.isAdd">添 加</el-button>
        <el-button type="primary" v-else @click="edit">编 辑</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { menuAdd, menuInfo, menuEdit } from "../../../utlis/request.js";
import { secondRouter } from "../../../router/index.js";
import { success, warning } from "../../../utlis/alert.js";
export default {
  props: ["obj"],
  components: {},
  data() {
    return {
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1
      },
      iconArr: ["el-icon-eleme", "el-icon-phone", "el-icon-s-tools"],
      secondRouter: secondRouter
    };
  },
  computed: {
    ...mapGetters({
      menuList: "menu/list"
    })
  },
  methods: {
    ...mapActions({
      reqMenuList: "menu/reqChangeList"
    }),
    changePid() {
      if (this.form.pid == 0) {
        this.form.type = 1;
        this.form.url = "";
      } else {
        this.form.type = 2;
        this.form.icon = "";
      }
    },
    cancel() {
      this.obj.isTrue = false;
      (this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1
      }),
        this.reqMenuList();
    },
    submit() {
      menuAdd(this.form).then(res => {
        if (res.data.code == 200) {
          success(res.data.msg);
        } else {
          warning(res.data.msg);
        }
      });
      this.cancel();
    },
    getOne(id) {
      menuInfo(id).then(res => {
        (this.form = res.data.list), (this.form.id = id);
      });
    },
    edit() {
      // console.log(this.form);
      menuEdit(this.form).then(res => {
        if (res.data.code == 200) {
          success(res.data.msg);
          this.cancel();
          this.reqMenuList()
        } else {
          warning(res.data.msg);
        }
      });
    }
  },
  mounted() {}
};
</script>
<style scoped>
</style>