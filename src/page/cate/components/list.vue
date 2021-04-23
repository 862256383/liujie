<template>
  <div>
    <el-table
      :data="cateList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="分类编号" width="180"></el-table-column>
      <el-table-column prop="catename" label="分类名称" width="180"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <div>
            <img :src="$imgUrl + scope.row.img" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if="scope.row.status == 1">启用</el-button>
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
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { catDel } from "../../../utlis/request.js";
import { success, warning } from "../../../utlis/alert";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list"
    })
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/reqChangeList"
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      catDel({ id: id }).then(res => {
        if (res.data.code == 200) {
          success(res.data.msg);
          this.reqCateList();
        } else {
          warning(res.data.msg);
        }
      });
    }
  },
  mounted() {
    this.reqCateList({ istree: true });
  }
};
</script>
<style scoped>
img {
  width: 100px;
  height: 100px;
}
</style>