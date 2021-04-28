<template>
  <div>
    <template>
      <el-table :data="seckillList" style="width: 100%">
        <el-table-column prop="title" label="活动名称" >
        </el-table-column>
        <el-table-column prop="status" label="状态">
         <template slot-scope="scope">
           <div>
              <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
           </div>
         </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
         <template slot-scope="scope">
           <div>
              <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
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
    return {};
  },
  computed: {
    ...mapGetters({
      seckillList:'seckill/list'
    }),
  },
  methods: {
    ...mapActions({
      // 请求列表数据
      reqChangeList:'seckill/reqChangeList'
    }),
    edit(id){
      this.$emit('edit',id)
    }
  },
  mounted() {
    // 进入页面就请求列表数据
    this.reqChangeList()
  },
};
</script>
<style scoped>
</style>