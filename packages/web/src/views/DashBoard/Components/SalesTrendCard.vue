<template>
  <a-card title="销售趋势" class="chart-card">
    <div class="chart-container" style="height: 350px">
      <div ref="salesTrendChart" style="height: 100%; width: 100%"></div>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import * as echarts from "echarts";

const salesTrendChart = ref();

// 初始化销售趋势图表
const initSalesTrendChart = () => {
  const chartDom = salesTrendChart.value;
  const myChart = echarts.init(chartDom);

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["销售额", "成本", "利润"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "销售额",
        type: "line",
        smooth: true,
        data: [150, 230, 224, 218, 135, 147, 260, 270, 310, 320, 350, 375],
        itemStyle: {
          color: "#1890ff",
        },
      },
      {
        name: "成本",
        type: "line",
        smooth: true,
        data: [100, 160, 150, 150, 90, 100, 180, 185, 210, 220, 240, 250],
        itemStyle: {
          color: "#faad14",
        },
      },
      {
        name: "利润",
        type: "bar",
        data: [50, 70, 74, 68, 45, 47, 80, 85, 100, 100, 110, 125],
        itemStyle: {
          color: "#52c41a",
        },
      },
    ],
  };

  myChart.setOption(option);

  window.addEventListener("resize", () => {
    myChart.resize();
  });
};

// 初始化图表
onMounted(() => {
  nextTick(() => {
    initSalesTrendChart();
  });
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style>
