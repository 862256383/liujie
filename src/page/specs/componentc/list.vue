<template>
  <div>
    <el-table :data="specsList" style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180">
      </el-table-column>
      <el-table-column label="规格属性">
        <template slot-scope="scope">
          <div>
            <el-tag v-for="(item, index) in scope.row.attrs" :key="index">{{
              item
            }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if="scope.row.status == 1"
              >启用</el-button
            >
            <el-button type="info" v-else>禁用</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click="edit(scope.row.id)"
              >编辑</el-button
            >
            <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="count"
      :page-size="size"
      @current-change="change"
    >
    </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { specsDel } from "../../../utlis/request.js";
import { success, warning } from "../../../utlis/alert.js";
export default {
  props: [],
  components: {},
  data() {
    return {
      form: {},
    };
  },
  computed: {
    ...mapGetters({
      specsList: "specs/list",
      size: "specs/size",
      count: "specs/count",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeList: "specs/reqChangeList",
      reqChangeCount: "specs/reqChangeCount",
      reqChangePage: "specs/reqChangePage",
    }),
    del(id) {
      specsDel({ id: id }).then((res) => {
        if (res.data.code == 200) {
          success(res.data.msg);
          this.reqChangeList();
          this.reqChangeCount();
        } else {
          warning(res.data.msg);
        }
      });
    },
    change(e) {
      this.reqChangePage(e);
    },
    edit(id) {
      this.$emit("edit", id);
    },
  },
  mounted() {
    this.reqChangeCount();
    this.reqChangePage(1);
  },
};
</script>
<style scoped>
</style>