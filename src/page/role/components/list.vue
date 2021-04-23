<template>
  <div>
    <template>
      <el-table :data="roleList" style="width: 100%">
        <el-table-column prop="id" label="角色编号" width="180"></el-table-column>
        <el-table-column prop="rolename" label="角色名称" width="180"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
              <el-button type="info" v-else>禁用</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
              <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {roleDel} from "../../../utlis/request.js";
import { success, warning } from "../../../utlis/alert.js";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      roleList: "role/list"
    })
  },
  methods: {
    ...mapActions({
      reqChangeList: "role/reqChangeList"
    }),
    edit(id) {
      this.$emit("emit", id);
    },
    del(id) {
      roleDel(id).then(res => {
        if (res.data.code == 200) {
          success(res.data.msg);
          this.reqChangeList();
        } else {
          warning(res.data.msg)
        }
      });
    }
  },
  mounted() {
    this.reqChangeList();
  }
};
</script>
<style scoped>
</style>