<template>
  <div>
    <el-dialog
      :title="obj.isAdd?'角色添加':'角色编辑'"
      :visible.sync="obj.isTrue"
      width="50%"
      @close="cancel"
    >
      <el-form label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>

        <el-form-item label="角色权限">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{children:'children',label: 'title'}"
          ></el-tree>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit" v-if="obj.isAdd">添 加</el-button>
        <el-button type="primary" @click ="edit" v-else>编 辑</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { roleAdd, roleInfo,roleEdit } from "../../../utlis/request.js";
import { success, warning } from "../../../utlis/alert.js";
export default {
  props: ["obj"],
  components: {},
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1
      }
    };
  },
  computed: {
    ...mapGetters({
      menuList: "menu/list",
      roleList:'role/list'
    })
  },
  methods: {
    ...mapActions({
      reqMenuList: "menu/reqChangeList",
      reqChangeList: "role/reqChangeList"
    }),
    cancel() {
      (this.obj.isTrue = false),
        (this.form = {
          rolename: "",
          menus: "",
          status: 1
        }),
        this.$refs.tree.setCheckedKeys([]);
    },
    submit() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      roleAdd(this.form).then(res => {
        if (res.data.code == 200) {
          success(res.data.msg);
          this.cancel();
          this.reqChangeList();
        } else {
          warning(res.data.msg);
        }
      });
    },
    getOne(id) {
      roleInfo(id).then(res => {
        this.form = res.data.list,
        this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus));
        this.form.id = id
      });
    },
    edit(){
      // console.log(this.form);
      roleEdit(this.form).then(res => {
        if(res.data.code == 200) {
          success(res.data.msg);
          this.cancel();
          this.reqChangeList();
        } else {
          warning(res.data.msg)
        }
      })
    }
  },
  mounted() {
    this.reqMenuList();
  }
};
</script>
<style scoped>
</style>