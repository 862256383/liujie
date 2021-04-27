<template>
  <div>
    <template>
      <el-table :data="bannerList" style="width: 100%">
        <el-table-column prop="id" label="编号" width="180"></el-table-column>
        <el-table-column
          prop="title"
          label="轮播图标题"
          width="180"
        ></el-table-column>
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
              <el-button type="danger" @click="del(scope.row.id)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { bannerDel } from "../../../utlis/request.js";
import { success, warning } from "../../../utlis/alert.js";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      bannerList: "banner/list",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeList: "banner/reqChangeList",
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      bannerDel({ id: id }).then((res) => {
        if (res.data.code == 200) {
          success(res.data.msg);
          this.reqChangeList();
        } else {
          warning(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.reqChangeList();
  },
};
</script>
<style scoped>
img {
  width: 100px;
  height: 100px;
}
</style>