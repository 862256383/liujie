<template>
  <div>
    <el-dialog
      :title="obj.isAdd ? '添加商品规格' : '编辑商品规格'"
      :visible.sync="obj.isTrue"
      width="50%"
      @close="cancel"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="规格名称">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>
        <el-form-item
          label="规格属性"
          v-for="(item, index) in attrArr"
          :key="index"
        >
          <div class="box">
            <el-input v-model="item.value"></el-input>
            <el-button type="primary" v-if="index == 0" @click="addAttr"
              >新增规格属性</el-button
            >
            <el-button type="danger" v-else @click="delAttr(index)"
              >删除</el-button
            >
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
        <el-button type="primary" @click="add" v-if="obj.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="edit">编 辑</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { specsAdd, specsInfo, specsEdit } from "../../../utlis/request.js";
import { success, warning } from "../../../utlis/alert.js";
export default {
  props: ["obj"],
  components: {},
  data() {
    return {
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      attrArr: [{ value: "" }, { value: "" }],
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      reqChangeList: "specs/reqChangeList",
      reqChangeCount: "specs/reqChangeCount",
    }),
    cancel() {
      (this.obj.isTrue = false),
        (this.form = {
          specsname: "",
          attrs: "",
          status: 1,
        });
      this.attrArr = [{ value: "" }, { value: "" }];
    },
    addAttr() {
      this.attrArr.push({ value: "" });
    },
    delAttr(index) {
      this.attrArr.splice(index, 1);
    },
    add() {
      let arr = JSON.stringify(this.attrArr.map((item) => item.value));
      this.form.attrs = arr;
      specsAdd(this.form).then((res) => {
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
    getOne(id) {
      console.log(this.form);
      specsInfo({ id: id }).then((res) => {
        this.form = res.data.list[0];
        let arr = JSON.parse(this.form.attrs);
        this.attrArr = arr.map((item) => {
          return { value: item };
        });
      });
    },
    edit() {
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      specsEdit(this.form).then((res) => {
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
  mounted() {},
};
</script>
<style scoped>
.box {
  display: flex;
}
.box input {
  flex: 1;
}
</style>