<template>
  <div class="customer-management-page">
    <!-- 页面顶部区域 -->
    <a-card class="header-card">
      <div class="header-container">
        <div class="title-section">
          <h2>客户管理系统</h2>
          <p class="subtitle">高效管理您的客户数据</p>
        </div>
        <div class="button-section">
          <a-space>
            <a-button type="primary">
              <template #icon><PlusOutlined /></template>
              新增
            </a-button>
            <a-button danger>
              <template #icon><DeleteOutlined /></template>
              删除
            </a-button>
          </a-space>
        </div>
      </div>
    </a-card>

    <!-- 搜索过滤区域 -->
    <a-card class="search-card">
      <a-row :gutter="16">
        <a-col :xs="24" :sm="12" :md="8" :lg="6">
          <a-form-item label="客户名称">
            <a-input placeholder="请输入客户名称" allow-clear />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12" :md="8" :lg="6">
          <a-form-item label="客户类型">
            <a-select placeholder="请选择客户类型" style="width: 100%" allow-clear>
              <a-select-option value="vip">VIP客户</a-select-option>
              <a-select-option value="normal">普通客户</a-select-option>
              <a-select-option value="potential">潜在客户</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12" :md="8" :lg="6">
          <a-form-item label="联系时间">
            <a-range-picker style="width: 100%" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12" :md="8" :lg="6">
          <a-form-item label="来源">
            <a-select placeholder="请选择来源" style="width: 100%" allow-clear>
              <a-select-option value="website">官网</a-select-option>
              <a-select-option value="referral">推荐</a-select-option>
              <a-select-option value="exhibition">展会</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24" style="text-align: right">
          <a-button type="primary">
            <template #icon><SearchOutlined /></template>
            搜索
          </a-button>
          <a-button style="margin-left: 8px">
            <template #icon><ReloadOutlined /></template>
            重置
          </a-button>
        </a-col>
      </a-row>
    </a-card>

    <!-- 表格区域 -->
    <a-card class="table-card">
      <template #extra>
        <a-space>
          <a-button>
            <template #icon><DownloadOutlined /></template>
            导出
          </a-button>
          <a-button>
            <template #icon><ReloadOutlined /></template>
            刷新
          </a-button>
        </a-space>
      </template>

      <a-table
        :columns="columns"
        :data-source="data"
        :scroll="{ x: 1200 }"
        :pagination="{
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          showTotal: total => `共 ${total} 条数据`
        }"
        :row-selection="{ type: 'checkbox' }"
        bordered
      >
        <!-- 筛选下拉菜单 -->
        <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
          <div v-if="column.key === 'contact-time'" class="custom-filter-dropdown">
            <a-range-picker v-model:value="selectedKeys[0]" @change="() => setSelectedKeys(selectedKeys)" />
            <a-button type="primary" size="small" @click="() => confirm()">确定</a-button>
            <a-button size="small" @click="() => clearFilters()">重置</a-button>
          </div>
        </template>

        <!-- 自定义表格单元格 -->
        <template #bodyCell="{ column, record }">
          <!-- 国家/地区 -->
          <template v-if="column.key === 'county'">
            <div class="cell-content">
              <a-tag color="blue">{{ record.county }}</a-tag>
            </div>
          </template>

          <!-- 客户名称 -->
          <template v-if="column.key === 'name'">
            <div class="cell-content name-cell">
              <a-avatar :style="{ backgroundColor: getRandomColor(record.name) }">
                {{ record.name?.charAt(0) }}
              </a-avatar>
              <span class="name-text">{{ record.name }}</span>
            </div>
          </template>

          <!-- 产品 -->
          <template v-if="column.key === 'product'">
            <div class="cell-content">
              <a-tag color="cyan">{{ record.product }}</a-tag>
            </div>
          </template>

          <!-- 联系时间 -->
          <template v-if="column.key === 'contact-time'">
            <div class="cell-content">
              <a-badge status="processing" />
              {{ record['contact-time'] }}
            </div>
          </template>

          <!-- 来源 -->
          <template v-if="column.key === 'source'">
            <div class="cell-content">
              <a-tag :color="getSourceColor(record.source)">{{ record.source }}</a-tag>
            </div>
          </template>

          <!-- 联系类型 -->
          <template v-if="column.key === 'contact-type'">
            <div class="cell-content">
              <a-tag color="orange">{{ record['contact-type'] }}</a-tag>
            </div>
          </template>

          <!-- 邮箱 -->
          <template v-if="column.key === 'email'">
            <div class="cell-content">
              <MailOutlined class="icon-prefix" />
              <a :href="`mailto:${record.email}`">{{ record.email }}</a>
            </div>
          </template>

          <!-- 社交账号 -->
          <template v-if="column.key === 'whatsup/wechat'">
            <div class="cell-content">
              <WechatOutlined class="icon-prefix" />
              {{ record['whatsup/wechat'] }}
            </div>
          </template>

          <!-- 电话 -->
          <template v-if="column.key === 'phone'">
            <div class="cell-content">
              <PhoneOutlined class="icon-prefix" />
              <a :href="`tel:${record.phone}`">{{ record.phone }}</a>
            </div>
          </template>

          <!-- 客户类型 -->
          <template v-if="column.key === 'customer-type'">
            <div class="cell-content">
              <a-tag :color="getCustomerTypeColor(record['customer-type'])">
                {{ record['customer-type'] }}
              </a-tag>
            </div>
          </template>

          <!-- 公司 -->
          <template v-if="column.key === 'company'">
            <div class="cell-content">
              <BankOutlined class="icon-prefix" />
              {{ record.company }}
            </div>
          </template>

          <!-- 网站 -->
          <template v-if="column.key === 'website'">
            <div class="cell-content">
              <GlobalOutlined class="icon-prefix" />
              <a :href="record.website" target="_blank">{{ record.website }}</a>
            </div>
          </template>

          <!-- 备注 -->
          <template v-if="column.key === 'remark'">
            <a-tooltip :title="record.remark">
              <div class="cell-content truncate-text">
                <CommentOutlined class="icon-prefix" />
                {{ record.remark }}
              </div>
            </a-tooltip>
          </template>

          <!-- 操作列 -->
          <template v-if="column.key === 'action'">
            <div class="action-buttons">
              <a-button type="link" size="small">查看</a-button>
              <a-divider type="vertical" />
              <a-button type="link" size="small">编辑</a-button>
              <a-divider type="vertical" />
              <a-popconfirm
                title="确定要删除此客户吗?"
                ok-text="确定"
                cancel-text="取消"
              >
                <a-button type="link" danger size="small">删除</a-button>
              </a-popconfirm>
            </div>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useAvaliableCustomerStore } from '@/stores/AvaliableCustomerStore';
import {
  PlusOutlined,
  DeleteOutlined,
  SearchOutlined,
  ReloadOutlined,
  DownloadOutlined,
  MailOutlined,
  PhoneOutlined,
  WechatOutlined,
  GlobalOutlined,
  BankOutlined,
  CommentOutlined
} from '@ant-design/icons-vue';

// const avaliableCustomer = useAvaliableCustomerStore();
// const { data, columns } = storeToRefs(avaliableCustomer)

// 初始化store
const customerStore = useAvaliableCustomerStore();
const { data, columns } = storeToRefs(customerStore);

// 表格列定义
// const columns = [
//   {
//     title: '姓名',
//     dataIndex: 'name',
//     key: 'name',
//     fixed: 'left',
//     width: 150,
//     sorter: true,
//   },
//   {
//     title: '公司',
//     dataIndex: 'company',
//     key: 'company',
//     width: 180,
//     ellipsis: true,
//   },
//   {
//     title: '客户类型',
//     dataIndex: 'customer-type',
//     key: 'customer-type',
//     width: 120,
//     filters: [
//       { text: 'VIP客户', value: 'VIP客户' },
//       { text: '普通客户', value: '普通客户' },
//     ],
//   },
//   {
//     title: '产品',
//     dataIndex: 'product',
//     key: 'product',
//     width: 150,
//     ellipsis: true,
//   },
//   {
//     title: '联系时间',
//     dataIndex: 'contact-time',
//     key: 'contact-time',
//     width: 150,
//     sorter: true,
//   },
//   {
//     title: '来源',
//     dataIndex: 'source',
//     key: 'source',
//     width: 100,
//   },
//   {
//     title: '联系类型',
//     dataIndex: 'contact-type',
//     key: 'contact-type',
//     width: 120,
//   },
//   {
//     title: '邮箱',
//     dataIndex: 'email',
//     key: 'email',
//     width: 180,
//     ellipsis: true,
//   },
//   {
//     title: '微信/WhatsApp',
//     dataIndex: 'whatsup/wechat',
//     key: 'whatsup/wechat',
//     width: 150,
//     ellipsis: true,
//   },
//   {
//     title: '电话',
//     dataIndex: 'phone',
//     key: 'phone',
//     width: 150,
//   },
//   {
//     title: '国家/地区',
//     dataIndex: 'county',
//     key: 'county',
//     width: 120,
//   },
//   {
//     title: '网站',
//     dataIndex: 'website',
//     key: 'website',
//     width: 200,
//     ellipsis: true,
//   },
//   {
//     title: '备注',
//     dataIndex: 'remark',
//     key: 'remark',
//     width: 200,
//     ellipsis: true,
//   },
//   {
//     title: '操作',
//     key: 'action',
//     fixed: 'right',
//     width: 150,
//   },
// ];

// 工具函数
const getRandomColor = (str) => {
  const colors = ['#1677ff', '#f56a00', '#7265e6', '#00a2ae', '#faad14', '#722ed1'];
  const index = str.charCodeAt(0) % colors.length;
  return colors[index];
};

const getSourceColor = (source) => {
  const colorMap = {
    '网站': 'geekblue',
    '展会': 'green',
    '推荐': 'purple',
    '社交媒体': 'magenta',
  };
  return colorMap[source] || 'blue';
};

const getCustomerTypeColor = (type) => {
  const colorMap = {
    'VIP客户': 'red',
    '普通客户': 'green',
    '潜在客户': 'orange',
  };
  return colorMap[type] || 'default';
};
</script>

<style scoped>
.customer-management-page {
  padding: 16px;
  background-color: #f0f2f5;
}

.header-card, .search-card, .table-card {
  margin-bottom: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-section h2 {
  font-size: 24px;
  margin-bottom: 4px;
  font-weight: 600;
  color: #262626;
}

.subtitle {
  font-size: 14px;
  color: #8c8c8c;
  margin: 0;
}

.cell-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.name-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.name-text {
  font-weight: 500;
}

.icon-prefix {
  color: #8c8c8c;
}

.truncate-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 180px;
}

.custom-filter-dropdown {
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.action-buttons {
  white-space: nowrap;
}
</style>
