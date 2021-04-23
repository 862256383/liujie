<template>
  <div>
    <el-dialog :title="obj.isAdd?'添加':'编辑'" :visible.sync="obj.isTrue" width="50%" @close="cancel">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="上级分类">
          <el-select placeholder="请选择上级分类" v-model="form.pid">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称">
          <el-input v-model="form.catename"></el-input>
        </el-form-item>

        <el-form-item label="图片">
          <div class="box">
            <h3>+</h3>
            <input type="file" @change="change" v-if="obj.isTrue" />
            <img :src="imgUrl" v-if="imgUrl" />
          </div>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit" v-if="obj.isAdd">添 加</el-button>
        <el-button type="primary" v-else @click="edit">编辑</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { cateAdd,cateInfo,cateEdit } from "../../../utlis/request.js";
import { success, warning } from "../../../utlis/alert";
export default {
  props: ["obj"],
  components: {},
  data() {
    return {
      form: {
        pid: 0,
        catename: "",
        img: "",
        status: 1
      },
      imgUrl: ""
    };
  },
  computed: {
    ...mapGetters({
      cateList:'cate/list'
    })
  },
  methods: {
    ...mapActions({
      reqChangeList:'cate/reqChangeList'
    }),
    change(e) {
      // console.log(e);
      let files = e.target.files[0];
      this.imgUrl = URL.createObjectURL(files);
      this.form.img = files;
    },
    cancel() {
      (this.obj.isTrue = false),
        (this.imgUrl = ""),
        (this.form = {
          pid: 0,
          catename: "",
          img: "",
          status: 1
        });
    },
    submit() {
      cateAdd(this.form).then(res => {
        if (res.data.code == 200) {
          success(res.data.msg);
          this.cancel();
          this.reqChangeList()
        } else {
          warning(res.data.msg);
        }
      });
    },
      getOne(id){
       cateInfo(id).then(res => {
         this.form = res.data.list,
         this.imgUrl = this.$imgUrl + res.data.list.img,
         this.form.id = id
       })
    },
    edit() {
      console.log(this.form);
      cateEdit(this.form).then(res => {
        if(res.data.code == 200) {
          success(res.data.msg);
          this.cancel();
          this.reqChangeList();
        } else {
          warning(res.data.msg)
        }
      })
    }
  },
  mounted() {
    this.reqChangeList()
  }
};
</script>
<style scoped>
.box {
  position: relative;
  width: 200px;
  height: 200px;
  border: 1px dashed #ccc;
  text-align: center;
  line-height: 200px;
}
.box input {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
  opacity: 0;
}
.box h3 {
  font-size: 50px;
  margin: 0;
}
.box img {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 2;
}
</style>