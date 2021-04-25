<template>
  <div>
    <template>
      <el-table :data="goodsList" style="width: 100%">
        <el-table-column prop="id" label="商品编号"></el-table-column>
        <el-table-column prop="goodsname" label="商品名称"></el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <div>
              <img :src="$imgUrl+scope.row.img" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="isnew" label="是否新品">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" v-if="scope.row.isnew==1">是</el-button>
              <el-button type="info" v-else>否</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="ishot" label="是否热卖">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" v-if="scope.row.ishot==1">是</el-button>
              <el-button type="info" v-else>否</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" v-if="scope.row.status">是</el-button>
              <el-button type="info" v-else>否</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
              <el-button type="danger">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      goodsList: "goods/list",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeList: "goods/reqChangeList",
    }),
    edit(id) {
      this.$emit("edit", id);
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