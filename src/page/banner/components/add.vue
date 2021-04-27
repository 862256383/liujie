<template>
  <div>
    <el-dialog
      :title="obj.isAdd ? '添加轮播图' : '编辑轮播图'"
      :visible.sync="obj.isTrue"
      width="50%"
      @close="cancel"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <div class="box">
            <h3>+</h3>
            <input type="file" @change="changeImg" v-if="obj.isTrue" />
            <img :src="imgUrl" v-if="imgUrl" />
          </div>
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
          >添加</el-button
        >
        <el-button type="primary" @click="edit" v-else>编辑</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { bannerEdit, bannerInfo, bannerAdd } from "../../../utlis/request.js";
import { success, warning } from "../../../utlis/alert.js";
export default {
  props: ["obj"],
  components: {},
  data() {
    return {
      form: {
        title: "",
        img: "",
        status: 1,
      },
      imgUrl: "",
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      reqChangeList: "banner/reqChangeList",
    }),
    changeImg(e) {
      let img = e.target.files[0];
      this.imgUrl = URL.createObjectURL(img);
      this.form.img = img;
    },
    cancel() {
      this.obj.isTrue = false;
      this.form = {
        title: "",
        img: "",
        status: 1,
      };
      this.imgUrl = "";
    },
    edit() {
      // console.log(this.form);
      bannerEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          success(res.data.msg);
          this.cancel();
          this.reqChangeList();
        } else {
          warning(res.data.msg);
        }
      });
    },
    submit() {
      // console.log(this.form);
      bannerAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          success(res.data.msg);
          this.cancel();
          this.reqChangeList();
        } else {
          warning(res.data.msg);
        }
      });
    },
    getOne(id) {
      bannerInfo({ id: id }).then((res) => {
        (this.form = res.data.list),
          (this.imgUrl = this.$imgUrl + res.data.list.img);
        this.form.id = id;
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.box {
  position: relative;
  width: 200px;
  height: 200px;
  text-align: center;
  border: 1px dashed #ccc;
}
.box h3 {
  font-size: 50px;
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
  z-index: 10;
}
.box img {
  position: absolute;
  width: 200px;
  height: 200px;
  left: 0;
  top: 0;
}
</style>