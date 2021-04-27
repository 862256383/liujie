<template>
  <div>
    <template>
      <el-table :data="memberList" style="width: 100%">
        <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
        <el-table-column prop="nickname" label="昵称" width="180"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column label="状态">
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
              <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {},
  data() {
    return {
      // isTrue: Boolean(sessionStorage.getItem('switch')),
      isTrue: false,
    };
  },
  computed: {
    ...mapGetters({
      memberList: "member/list",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeLis: "member/reqChangeList",
      reqChangeWitch: "member/reqChangeWitch",
    }),
    edit(uid) {
      // 发送数据到add
      this.isTrue = true;
      this.Event.$emit("switch", this.isTrue,uid);
    },
  },
  mounted() {
    this.reqChangeLis();
  },
};
</script>
<style scoped>
</style>