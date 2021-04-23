<template>
  <div>
    <template>
      <el-table :data="manageList" style="width: 100%">
        <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="rolename" label="所属角色"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" v-if="scope.row.status==1">启 用</el-button>
              <el-button type="info" v-else>禁 用</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" @click="edit(scope.row.uid)">编 辑</el-button>
              <el-button type="danger" @click="del(scope.row.uid)">删 除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-pagination background layout="prev, pager, next" @current-change="change" :total="count" :page-size="size"></el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { manageDel } from "../../../utlis/request.js";
import { success, warning } from "../../../utlis/alert.js";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      manageList: "manage/list",
      size:'manage/size',
      count:'manage/count'
    })
  },
  methods: {
    ...mapActions({
      reqManageList: "manage/reqChangeList",
      reqChangeCount:'manage/reqChangeCount',
      reqChangePage:'manage/reqChangePage'
    }),
    edit(uid) {
      this.$emit("edit", uid);
    },
    del(uid) {
      manageDel({ uid: uid }).then(res => {
        if (res.data.code == 200) {
          success(res.data.msg);
          this.reqManageList();
          this.reqChangeCount()
        } else {
          warning(res.data.msg);
        }
      });
    },
    change(e){
      this.reqChangePage(e)
    }
  }, 
  mounted() {
    this.reqChangeCount();
    this.reqChangePage(1)
  }
};
</script>
<style scoped>
</style>