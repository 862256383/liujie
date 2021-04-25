<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-list @edit="edit"></v-list>
    <v-add :obj="obj" ref="pink"></v-add>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./componentc/list";
import vAdd from "./componentc/add";
export default {
  props: [],
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      obj: {
        isTrue: false,
        isAdd: false,
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    add() {
      this.obj.isTrue = true;
      this.obj.isAdd = true;
    },
    edit(id) {
      this.obj.isTrue = true;
      this.obj.isAdd = false;
      this.$refs.pink.getOne(id);
    },
  },
  mounted() {},
};
</script>
<style scoped></style>
