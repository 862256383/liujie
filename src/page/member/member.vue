<template>
  <div>
    
    <v-list></v-list>
    <v-add></v-add>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vAdd from "./componentc/add.vue";
import vList from "./componentc/list.vue";
export default {
  props: [],
  components: {
    vAdd,
    vList,
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