
<template>
  <div>
    <el-dialog
      :title="obj.isAdd?'添加商品':'编辑商品'"
      :visible.sync="obj.isTrue"
      width="50%"
      @close="cancel"
      @opened="opened1"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="一级分类">
          <el-select v-model="form.first_cateid" placeholder="请选择" @change="second1">
            <el-option label="请选择" disabled value="请选择"></el-option>
            <el-option
              :label="item.catename"
              :value="item.id"
              v-for="item in cateList1"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <el-option label="请选择" value="请选择" disabled></el-option>
            <el-option
              :label="item.catename"
              :value="item.id"
              v-for="item in cateSecond"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <div class="box">
            <h3>+</h3>
            <input type="file" @change="changeImg" v-if="obj.isTrue" />
            <img :src="imgUrl" v-if="imgUrl" />
          </div>
        </el-form-item>

        <el-form-item label="商品规格">
          <el-select v-model="form.specsid" placeholder="请选择商品规格" @change="second2">
            <el-option label="请选择" value="请选择" disabled></el-option>
            <el-option
              :value="item.id"
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性">
          <el-select v-model="form.specsattr" placeholder="请选择规格属性" multiple>
            <el-option label="请选择" value="请选择" disabled></el-option>
            <el-option :label="item" :value="item" v-for="item in specsSecond" :key="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品">
          <el-radio-group v-model="form.isnew">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否热卖">
          <el-radio-group v-model="form.ishot">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>

        <el-form-item label="商品描述">
          <div id="box" v-if="obj.isTrue"></div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit" v-if="obj.isAdd">添 加</el-button>
        <el-button type="primary" v-else @click="edit">编 辑</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  cateList,
  goodsAdd,
  goodsInfo,
  goodsEdit,
} from "../../../utlis/request.js";
import { success, warning } from "../../../utlis/alert.js";
import E from "wangeditor";
export default {
  props: ["obj"],
  components: {},
  data() {
    return {
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      imgUrl: "",
      cateSecond: [],
      specsSecond: [],
    };
  },
  computed: {
    ...mapGetters({
      cateList1: "cate/list",
      specsList: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeCateList: "cate/reqChangeList",
      reqChangeSpecsList: "specs/reqChangeList",
      reqChangeList: "goods/reqChangeList",
      reqChangeCount: "goods/reqChangeCount",
    }),
    second1() {
      cateList({ pid: this.form.first_cateid }).then((res) => {
        if (res.data.code == 200) {
          this.form.second_cateid = "";
          this.cateSecond = res.data.list;
        }
      });
    },
    changeImg(e) {
      let files = e.target.files[0];
      this.imgUrl = URL.createObjectURL(files);
      this.form.img = files;
    },
    second2() {
      this.form.specsattr = [];
      let arr = this.specsList.find((item) => item.id == this.form.specsid);
      this.specsSecond = arr.attrs;
    },

    submit() {
      this.form.specsattr = JSON.stringify(this.form.specsattr);
    this.form.description = this.editor.txt.html()
      goodsAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          success(res.data.msg);
          this.cancel();
          this.reqChangeList();
          this.reqChangeCount();
        } else {
          warning(res.data.msg);
        }
      });
    },
    cancel() {
      (this.obj.isTrue = false),
        (this.form = {
          first_cateid: "",
          second_cateid: "",
          goodsname: "",
          price: "",
          market_price: "",
          img: "",
          description: "",
          specsid: "",
          specsattr: [],
          isnew: 1,
          ishot: 1,
          status: 1,
        });
      this.imgUrl = "";
      this.cateSecond = [];
      this.specsSecond = [];
    },
    getOne(id) {
      goodsInfo(id).then((res) => {
        this.form = res.data.list;
        cateList({ pid: this.form.first_cateid }).then((res) => {
          this.cateSecond = res.data.list;
        });
        this.imgUrl = this.$imgUrl + this.form.img;
        this.form.specsattr = JSON.parse(this.form.specsattr);
        let arr = this.specsList.find((item) => item.id == this.form.specsid);
        this.specsSecond = arr.attrs;
        this.form.id = id;
      });
    },
    edit() {
      this.form.description = this.editor.txt.html()
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr),
      };
      goodsEdit(data).then((res) => {
        if (res.data.code == 200) {
          success(res.data.msg);
          this.cancel();
          this.reqChangeList();
        } else {
          warning(res.data.msg);
        }
      });
    },
    opened1() {
      this.editor = new E("#box");
      this.editor.create();
      this.editor.txt.html(this.form.description)
    },
  },
  mounted() {
    this.reqChangeCateList();
    this.reqChangeSpecsList(true);
  },
};
</script>
<style scoped>
.box {
  position: relative;
  width: 200px;
  height: 200px;
  border: 1px dashed #ccc;
  text-align: center;
}
.box h3 {
  font-size: 30px;
  line-height: 200px;
  margin: 0;
}
.box input {
  position: absolute;
  width: 200px;
  height: 200px;
  left: 0;
  top: 0;
  opacity: 0;
  z-index: 2;
}
.box img {
  position: absolute;
  width: 200px;
  height: 200px;
  left: 0;
  top: 0;
}
</style>