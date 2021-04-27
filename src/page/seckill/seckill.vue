<template>
<div>
      <el-button type="primary">添加</el-button>
      <v-list></v-list>
      <v-add></v-add>
</div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex';
import vList from './components/list.vue'
import vAdd from './components/add.vue'
export default {
props: [],
components: {
    vList,
    vAdd
},
data() {
return {};
},
computed: {
...mapGetters({}),
},
methods: {
...mapActions({}),
},
mounted() {},
};
</script>
<style scoped>
</style>