<template>
  <div>
    <div id="box"></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import * as echarts from "echarts";
export default {
  props: [],
  components: {},
  data() {
    return {};
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
  },
   watch: {
      cateList: {
        handler() {
          var myChart = echarts.init(document.getElementById("box"));
          var option = {
            title: {
              text: "分类子数量",
            },
            tooltip: {},
            legend: {
              data: ["数量"],
            },
            xAxis: {
              data: this.cateList.map((item) => item.catename),
            },
            yAxis: {},
            series: [
              {
                name: "数量",
                type: "bar",
                data: this.cateList.map((item) => item.children.length),
              },
            ],
          };

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        },
        deep: true,
      },
    },
  mounted() {
    this.reqChangeList();
  },
};
</script>
<style scoped>
#box {
  width: 600px;
  height: 400px;
}
</style>