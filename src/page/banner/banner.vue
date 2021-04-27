<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-list @edit="edit"></v-list>
    <v-add :obj="obj" ref="pink"></v-add>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vAdd from "./components/add.vue";
import vList from "./components/list.vue";
export default {
  props: [],
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      obj:{
        isTrue:false,
        isAdd:false
      }
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    add(){
     this.obj.isTrue = true,
     this.obj.isAdd = true
    },
    edit(id){
      this.obj.isTrue = true,
      this.obj.isAdd = false,
      this.$refs.pink.getOne(id)
    }
  },
  mounted() {},
};
</script>
<style scoped>
</style>