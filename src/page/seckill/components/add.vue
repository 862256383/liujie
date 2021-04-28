<template>
  <div>
    <el-dialog
      :title="obj.isAdd ? '添加秒杀' : '编辑秒杀'"
      :visible.sync="obj.isTrue"
      width="50%"
      @close="cancel"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <div class="block">
          <span class="demonstration">活动期限</span>
          <el-date-picker
            class="time"
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
        <!-- 一级分类 -->
        <el-form-item label="一级分类">
          <el-select
            @change="change1"
            v-model="form.first_cateid"
            placeholder="请选择一级分类"
          >
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 二级分类 -->
        <el-form-item label="二级分类">
          <el-select
            @change="change2"
            v-model="form.second_cateid"
            placeholder="请选择活动区域"
          >
            <el-option
              v-for="item in second"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品">
          <el-select v-model="form.goodsid" placeholder="请选择商品">
            <el-option
              v-for="item in threeLive"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="obj.isAdd" @click="submit"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="edit">编 辑</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  cateList,
  goodsList,
  seckillAdd,
  sexkillInfo,
  seckillEdit,
} from "../../../utlis/request.js";
import { success, warning } from "../../../utlis/alert.js";
export default {
  props: ["obj"],
  components: {},
  data() {
    return {
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      // 存放时间
      value1: [],
      // 二级分类
      second: [],
      // 三级分类
      threeLive: [],
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      // 请求商品分类数据
      reqChangeList1: "cate/reqChangeList",
      // 请求列表数据
      reqChangeList: "seckill/reqChangeList",
    }),
    change1() {
      // 调用商品二级接口
      cateList({ pid: this.form.first_cateid }).then((res) => {
        this.second = res.data.list;
      });
    },
    change2() {
      // 调用商品三级接口
      goodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        this.threeLive = res.data.list;
      });
    },
    // 点击取消
    cancel() {
      // 重置form表单
      (this.obj.isTrue = false),
        (this.form = {
          title: "",
          begintime: "",
          endtime: "",
          first_cateid: "",
          second_cateid: "",
          goodsid: "",
          status: 1,
        });
      // 清空存放时间
      (this.value1 = []),
        // 清空二级分类
        (this.second = []),
        // 清空三级分类
        (this.threeLive = []);
    },
    // 点击添加按钮
    submit() {
      // 将时间格式转换为时间戳
      this.form.begintime = Date.parse(this.value1[0]);
      this.form.endtime = Date.parse(this.value1[1]);
      seckillAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          success(res.data.msg);
          // 调用cancel方法隐藏对话框同时清空表单
          this.cancel();
          // 重新请求数据
          this.reqChangeList();
        } else {
          warning(res.data.msg);
        }
      });
    },
    // 获取一条信息
    getOne(id) {
      sexkillInfo(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        // 将时间戳转换为普通时间
        this.form.begintime = new Date(res.data.list.begintime - 0);
        this.form.endtime = new Date(res.data.list.endtime - 0);
        this.value1.push(this.form.begintime, this.form.endtime);
        // 调用商品二级结口
        this.change1();
        // 调用商品三级结口
        this.change2();
      });
    },
    // 点击确定编辑
    edit() {
      this.form.begintime = Date.parse(this.form.begintime);
      this.form.endtime = Date.parse(this.form.endtime);
      console.log(this.form);
      seckillEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          success(res.data.msg);
          this.cancel();
          this.reqChangeList();
        } else {
          warning(res.data.msg);
        }
      });
    },
  },
  mounted() {
    // 进入页面请求商品分类数据
    this.reqChangeList1();
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