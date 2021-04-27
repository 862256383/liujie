<template>
  <div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <div class="block">
          <span class="demonstration">活动期限 </span>
          <el-date-picker
            class="time"
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
        <el-form-item label="一级分类">
          <el-select
            @change="changeFid"
            v-model="form.first_cateid"
            placeholder="请选择一级分类"
          >
            <el-option label="请选择" value="shanghai"></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid" placeholder="请选择活动区域">
            <el-option label="请选择" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品">
          <el-select v-model="form.goodsid" placeholder="请选择活动区域">
            <el-option label="请选择" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch v-model="form.status"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { FistCateId } from "../../../utlis/request.js";
export default {
  props: [],
  components: {},
  data() {
    return {
      value1: [],
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: [],
        goodsid: "",
        status: "",
      },
      dialogVisible: true,
    //   second: [],
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeList: "cate/reqChangeList",
    }),
    changeFid() {
      FistCateId(this.form.first_cateid).then((res) => {
        this.secsecond_cateidond = res.data.list;
      });
    },
  },
  mounted() {
    this.reqChangeList();
  },
};
</script>
<style scoped>
.demonstration {
  display: inline-block;
  width: 80px;
  margin-left: -3px;
  text-indent: 13px;
}
.time {
  width: 75%;
  margin-bottom: 20px;
}
</style>