<template>
  <div class="dashboard-container">
    <a-row :gutter="[16, 16]">
      <!-- 顶部统计卡片保持不变 -->
      <a-col :xs="24" :sm="12" :md="6">
        <a-card class="stat-card">
          <template #title>
            <div class="card-title">
              <shop-outlined />
              <span>总供应商数</span>
            </div>
          </template>
          <div class="stat-value">168</div>
          <div class="stat-trend up">
            <rise-outlined />
            <span>5.2% vs 上月</span>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <a-card class="stat-card">
          <template #title>
            <div class="card-title">
              <global-outlined />
              <span>国外客户数</span>
            </div>
          </template>
          <div class="stat-value">243</div>
          <div class="stat-trend up">
            <rise-outlined />
            <span>3.7% vs 上月</span>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <a-card class="stat-card">
          <template #title>
            <div class="card-title">
              <dollar-outlined />
              <span>本月销售额</span>
            </div>
          </template>
          <div class="stat-value">$278,530</div>
          <div class="stat-trend up">
            <rise-outlined />
            <span>12.8% vs 上月</span>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <a-card class="stat-card">
          <template #title>
            <div class="card-title">
              <fund-outlined />
              <span>毛利率</span>
            </div>
          </template>
          <div class="stat-value">32.5%</div>
          <div class="stat-trend down">
            <fall-outlined />
            <span>1.3% vs 上月</span>
          </div>
        </a-card>
      </a-col>

      <!-- 销售趋势图 - 使用ECharts -->
      <a-col :span="24" :lg="16">
        <a-card title="销售趋势" class="chart-card">
          <div class="chart-container" style="height: 350px;">
            <div ref="salesTrendChart" style="height: 100%; width: 100%;"></div>
          </div>
        </a-card>
      </a-col>

      <!-- 右侧热门产品保持不变 -->
      <a-col :span="24" :lg="8">
        <a-card title="热门产品" class="product-card">
          <a-list item-layout="horizontal" :data-source="hotProducts">
            <template #renderItem="{ item }">
              <a-list-item>
                <a-list-item-meta :title="item.name">
                  <template #avatar>
                    <a-avatar :src="item.image" />
                  </template>
                  <template #description>
                    <div class="product-meta">
                      <span>¥{{ item.price }}</span>
                      <span>销量: {{ item.salesCount }}</span>
                    </div>
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>
        </a-card>
      </a-col>

      <!-- 供应商分布地图 - 使用ECharts中国地图 -->
      <a-col :span="24" :lg="12">
        <a-card title="供应商分布" class="map-card">
          <div class="chart-container" style="height: 350px;">
            <div ref="supplierMapChart" style="height: 100%; width: 100%;"></div>
          </div>
        </a-card>
      </a-col>

      <!-- 海外客户分布地图 - 使用ECharts世界地图 -->
      <a-col :span="24" :lg="12">
        <a-card title="海外客户分布" class="map-card">
          <div class="chart-container" style="height: 350px;">
            <div ref="customerMapChart" style="height: 100%; width: 100%;"></div>
          </div>
        </a-card>
      </a-col>

      <!-- 产品类别分布 -->
      <a-col :span="24" :lg="12">
        <a-card title="产品类别销售分布" class="chart-card">
          <div class="chart-container" style="height: 350px;">
            <div ref="categoryPieChart" style="height: 100%; width: 100%;"></div>
          </div>
        </a-card>
      </a-col>

      <!-- 目标市场表现 -->
      <a-col :span="24" :lg="12">
        <a-card title="目标市场表现" class="chart-card">
          <div class="chart-container" style="height: 350px;">
            <div ref="marketBarChart" style="height: 100%; width: 100%;"></div>
          </div>
        </a-card>
      </a-col>

      <!-- 待处理订单保持不变 -->
      <a-col :span="24">
        <a-card title="最近订单" class="order-card" :tab-list="orderTabs" :active-tab-key="activeOrderTab" @tabChange="handleOrderTabChange">
          <a-table :columns="orderColumns" :data-source="recentOrders" :pagination="{ pageSize: 5 }">
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'status'">
                <a-tag :color="getStatusColor(record.status)">{{ record.status }}</a-tag>
              </template>
              <template v-if="column.key === 'action'">
                <a-space>
                  <a-button type="link" size="small">
                    <eye-outlined /> 查看
                  </a-button>
                  <a-button type="link" size="small">
                    <edit-outlined /> 编辑
                  </a-button>
                </a-space>
              </template>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import {
  ShopOutlined,
  GlobalOutlined,
  DollarOutlined,
  FundOutlined,
  RiseOutlined,
  FallOutlined,
  LineChartOutlined,
  EyeOutlined,
  EditOutlined
} from '@ant-design/icons-vue';

// Echarts地图需要注册的组件
// import 'echarts/map/js/china';
// import 'echarts/map/js/world';

// 图表引用
const salesTrendChart = ref();
const supplierMapChart = ref();
const customerMapChart = ref();
const categoryPieChart = ref();
const marketBarChart = ref();

// 热门产品数据
const hotProducts = ref([
  { id: 1, name: '高档陶瓷茶具套装', image: 'https://via.placeholder.com/40', price: 299, salesCount: 1258 },
  { id: 2, name: '智能家居控制器', image: 'https://via.placeholder.com/40', price: 599, salesCount: 892 },
  { id: 3, name: '便携式太阳能充电宝', image: 'https://via.placeholder.com/40', price: 189, salesCount: 765 },
  { id: 4, name: '防水蓝牙音箱', image: 'https://via.placeholder.com/40', price: 129, salesCount: 712 },
  { id: 5, name: '竹制厨房用品套装', image: 'https://via.placeholder.com/40', price: 219, salesCount: 683 },
]);

// 订单标签页
const activeOrderTab = ref('pending');
const orderTabs = [
  { key: 'pending', tab: '待处理' },
  { key: 'shipping', tab: '发货中' },
  { key: 'completed', tab: '已完成' },
];

// 订单列表
const orderColumns = [
  { title: '订单号', dataIndex: 'orderNo', key: 'orderNo' },
  { title: '客户', dataIndex: 'customer', key: 'customer' },
  { title: '国家', dataIndex: 'country', key: 'country' },
  { title: '金额', dataIndex: 'amount', key: 'amount' },
  { title: '订单日期', dataIndex: 'date', key: 'date' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '操作', key: 'action' },
];

const recentOrders = ref([
  { key: '1', orderNo: 'ORD-2023-5782', customer: 'ABC Trading Co.', country: '美国', amount: '$8,520', date: '2023-10-15', status: '待付款' },
  { key: '2', orderNo: 'ORD-2023-5781', customer: 'Euro Retail GmbH', country: '德国', amount: '$12,350', date: '2023-10-14', status: '待发货' },
  { key: '3', orderNo: 'ORD-2023-5780', customer: 'Japan Home Ltd.', country: '日本', amount: '$5,780', date: '2023-10-13', status: '已发货' },
  { key: '4', orderNo: 'ORD-2023-5779', customer: 'UK Supplies Inc.', country: '英国', amount: '$9,650', date: '2023-10-12', status: '已完成' },
  { key: '5', orderNo: 'ORD-2023-5778', customer: 'Aussie Markets', country: '澳大利亚', amount: '$4,320', date: '2023-10-11', status: '已完成' },
  { key: '6', orderNo: 'ORD-2023-5777', customer: 'Canadian Retail Group', country: '加拿大', amount: '$7,890', date: '2023-10-10', status: '已完成' },
]);

// 订单标签切换处理
const handleOrderTabChange = (key: string) => {
  activeOrderTab.value = key;
  // 实际应用中这里可以根据标签加载不同的订单数据
};

// 获取订单状态颜色
const getStatusColor = (status: string) => {
  switch (status) {
    case '待付款': return 'orange';
    case '待发货': return 'blue';
    case '已发货': return 'purple';
    case '已完成': return 'green';
    default: return 'default';
  }
};

// 初始化销售趋势图表
const initSalesTrendChart = () => {
  const chartDom = salesTrendChart.value;
  const myChart = echarts.init(chartDom);

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['销售额', '成本', '利润']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '销售额',
        type: 'line',
        smooth: true,
        data: [150, 230, 224, 218, 135, 147, 260, 270, 310, 320, 350, 375],
        itemStyle: {
          color: '#1890ff'
        }
      },
      {
        name: '成本',
        type: 'line',
        smooth: true,
        data: [100, 160, 150, 150, 90, 100, 180, 185, 210, 220, 240, 250],
        itemStyle: {
          color: '#faad14'
        }
      },
      {
        name: '利润',
        type: 'bar',
        data: [50, 70, 74, 68, 45, 47, 80, 85, 100, 100, 110, 125],
        itemStyle: {
          color: '#52c41a'
        }
      }
    ]
  };

  myChart.setOption(option);

  window.addEventListener('resize', () => {
    myChart.resize();
  });
};

// 初始化供应商地图
const initSupplierMapChart = () => {
  const chartDom = supplierMapChart.value;
  const myChart = echarts.init(chartDom);

  const option = {
    title: {
      text: '供应商区域分布',
      left: 'center',
      textStyle: {
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} 家 ({d}%)'
    },
    visualMap: {
      min: 0,
      max: 50,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'],
      calculable: true,
      inRange: {
        color: ['#e0f7fa', '#4fc3f7', '#0277bd']
      }
    },
    series: [
      {
        name: '供应商数量',
        type: 'map',
        map: 'china',
        roam: true,
        emphasis: {
          label: {
            show: true
          }
        },
        data: [
          { name: '广东', value: 48 },
          { name: '浙江', value: 42 },
          { name: '江苏', value: 35 },
          { name: '福建', value: 23 },
          { name: '山东', value: 18 },
          { name: '上海', value: 15 },
          { name: '河北', value: 12 },
          { name: '湖南', value: 11 },
          { name: '安徽', value: 9 },
          { name: '北京', value: 8 },
          { name: '四川', value: 7 },
          { name: '湖北', value: 6 },
          { name: '河南', value: 5 },
          { name: '江西', value: 4 }
        ]
      }
    ]
  };

  myChart.setOption(option);

  window.addEventListener('resize', () => {
    myChart.resize();
  });
};

// 初始化海外客户分布地图
const initCustomerMapChart = () => {
  const chartDom = customerMapChart.value;
  const myChart = echarts.init(chartDom);

  const option = {
    title: {
      text: '海外客户分布',
      left: 'center',
      textStyle: {
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} 家'
    },
    visualMap: {
      min: 0,
      max: 50,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'],
      calculable: true,
      inRange: {
        color: ['#e6f7ff', '#91d5ff', '#1890ff']
      }
    },
    series: [
      {
        name: '客户数量',
        type: 'map',
        map: 'world',
        roam: true,
        emphasis: {
          label: {
            show: false
          }
        },
        nameMap: {
          'United States': '美国',
          'United Kingdom': '英国',
          'Japan': '日本',
          'Germany': '德国',
          'France': '法国',
          'Australia': '澳大利亚',
          'Canada': '加拿大',
          'Italy': '意大利',
          'Spain': '西班牙',
          'South Korea': '韩国',
          'Netherlands': '荷兰',
          'Sweden': '瑞典',
          'Singapore': '新加坡'
        },
        data: [
          { name: '美国', value: 48 },
          { name: '德国', value: 36 },
          { name: '日本', value: 35 },
          { name: '英国', value: 29 },
          { name: '法国', value: 23 },
          { name: '澳大利亚', value: 20 },
          { name: '加拿大', value: 18 },
          { name: '意大利', value: 14 },
          { name: '西班牙', value: 12 },
          { name: '韩国', value: 11 },
          { name: '荷兰', value: 8 },
          { name: '瑞典', value: 7 },
          { name: '新加坡', value: 6 }
        ]
      }
    ]
  };

  myChart.setOption(option);

  window.addEventListener('resize', () => {
    myChart.resize();
  });
};

// 初始化产品类别饼图
const initCategoryPieChart = () => {
  const chartDom = categoryPieChart.value;
  const myChart = echarts.init(chartDom);

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      data: ['电子产品', '家居用品', '厨房用具', '办公用品', '户外装备', '手工艺品']
    },
    series: [
      {
        name: '销售额占比',
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 38, name: '电子产品' },
          { value: 25, name: '家居用品' },
          { value: 18, name: '厨房用具' },
          { value: 10, name: '办公用品' },
          { value: 5, name: '户外装备' },
          { value: 4, name: '手工艺品' }
        ]
      }
    ]
  };

  myChart.setOption(option);

  window.addEventListener('resize', () => {
    myChart.resize();
  });
};

// 初始化市场表现柱状图
const initMarketBarChart = () => {
  const chartDom = marketBarChart.value;
  const myChart = echarts.init(chartDom);

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['实际销售额', '目标销售额']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: ['北美市场', '欧洲市场', '亚太市场', '中东市场', '南美市场', '非洲市场']
    },
    series: [
      {
        name: '实际销售额',
        type: 'bar',
        data: [98000, 85600, 64800, 25400, 18700, 12500],
        itemStyle: {
          color: '#1890ff'
        }
      },
      {
        name: '目标销售额',
        type: 'bar',
        data: [95000, 90000, 70000, 30000, 25000, 15000],
        itemStyle: {
          color: '#faad14'
        }
      }
    ]
  };

  myChart.setOption(option);

  window.addEventListener('resize', () => {
    myChart.resize();
  });
};

// 初始化所有图表
onMounted(() => {
  nextTick(() => {
    initSalesTrendChart();
    initSupplierMapChart();
    initCustomerMapChart();
    initCategoryPieChart();
    initMarketBarChart();
  });
});
</script>

<style scoped>
.dashboard-container {
  padding: 24px;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-card {
  height: 100%;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
}

.stat-trend {
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 5px;
}

.stat-trend.up {
  color: #52c41a;
}

.stat-trend.down {
  color: #f5222d;
}

.chart-container {
  width: 100%;
  height: 100%;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  color: #666;
}

/* 确保地图容器有正确的高度 */
.map-container {
  height: 350px;
  width: 100%;
}
</style>
