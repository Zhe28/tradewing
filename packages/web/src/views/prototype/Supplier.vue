<template>
  <a-layout>
    <a-layout-content style="padding: 0 24px 24px; min-height: 280px;">
      <a-row>
        <a-col :span="24">
          <h1>供应商管理</h1>
        </a-col>
      </a-row>

      <a-row style="margin-bottom: 16px;">
        <a-col :span="24">
          <a-button type="primary" @click="addSupplier">新增供应商</a-button>
          <a-button>导入/导出</a-button>
          <a-input-search placeholder="搜索供应商" style="width: 200px; margin-left: 16px;" @search="onSearch" />
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="24">
          <a-table :columns="columns" :data-source="data" :pagination="pagination" @change="handleTableChange">
            <template #合作状态="{ record }">
              <a-switch
                :checked="record.status === '启用'"
                checked-children="启用"
                un-checked-children="禁用"
                @change="changeStatus(record)"
              />
            </template>
            <template #操作="{ record }">
              <a-space size="middle">
                <a-button type="link" @click="viewDetail(record)">查看详情</a-button>
                <a-button type="link" @click="editSupplier(record)">编辑</a-button>
              </a-space>
            </template>
          </a-table>
        </a-col>
      </a-row>

      <a-modal v-model:visible="visible" :title="modalTitle" @ok="handleOk" @cancel="handleCancel">
        <a-form :model="formState" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
          <a-form-item label="供应商名称">
            <a-input v-model:value="formState.name" />
          </a-form-item>
          <a-form-item label="联系人">
            <a-input v-model:value="formState.contact" />
          </a-form-item>
          <a-form-item label="联系电话">
            <a-input v-model:value="formState.phone" />
          </a-form-item>
          <a-form-item label="所在地区">
            <a-cascader :options="regionOptions" v-model:value="formState.region" />
          </a-form-item>
          <a-form-item label="主要产品">
            <a-input v-model:value="formState.products" />
          </a-form-item>
          <a-form-item label="公司网站">
            <a-input v-model:value="formState.website" />
          </a-form-item>
          <a-form-item label="店铺地址">
            <a-input v-model:value="formState.shopAddress" />
          </a-form-item>
          <a-form-item label="公司地址">
            <a-input v-model:value="formState.address" />
          </a-form-item>
          <a-form-item label="备注">
            <a-textarea v-model:value="formState.remarks" :rows="4" />
          </a-form-item>
        </a-form>
      </a-modal>

      <a-modal v-model:visible="detailVisible" title="供应商详情" @cancel="handleDetailCancel" :footer="null" width="800px">
        <a-descriptions title="供应商信息" bordered>
          <a-descriptions-item label="供应商名称">{{ detailData.name }}</a-descriptions-item>
          <a-descriptions-item label="联系人">{{ detailData.contact }}</a-descriptions-item>
          <a-descriptions-item label="联系电话">{{ detailData.phone }}</a-descriptions-item>
          <a-descriptions-item label="所在地区">{{ detailData.region }}</a-descriptions-item>
          <a-descriptions-item label="主要产品">{{ detailData.products }}</a-descriptions-item>
          <a-descriptions-item label="公司网站">
            <a :href="detailData.website" target="_blank">{{ detailData.website }}</a>
          </a-descriptions-item>
          <a-descriptions-item label="店铺地址">
            <a :href="detailData.shopAddress" target="_blank">{{ detailData.shopAddress }}</a>
          </a-descriptions-item>
          <a-descriptions-item label="公司地址">{{ detailData.address }}</a-descriptions-item>
          <a-descriptions-item label="备注">{{ detailData.remarks }}</a-descriptions-item>
        </a-descriptions>

        <a-divider orientation="left">商品列表</a-divider>

        <a-collapse>
          <a-collapse-panel header="点击展开商品列表" key="1">
            <a-table :columns="goodsColumns" :data-source="detailData.goods" :pagination="false">
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'attributes'">
                  <div v-for="(value, key) in record.attributes" :key="key">
                    {{ key }}: {{ value }}
                  </div>
                </template>
              </template>
            </a-table>
          </a-collapse-panel>
        </a-collapse>
      </a-modal>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import { regionData } from 'element-china-area-data';

const columns = [
  { title: '供应商名称', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
  { title: '联系人', dataIndex: 'contact', key: 'contact' },
  { title: '联系电话', dataIndex: 'phone', key: 'phone' },
  { title: '所在地区', dataIndex: 'region', key: 'region' },
  { title: '主要产品', dataIndex: 'products', key: 'products' },
  { title: '合作状态', key: 'status', slots: { customRender: '合作状态' } },
  { title: '操作', key: '操作', slots: { customRender: '操作' } },
];

const goodsColumns = [
  { title: '商品ID', dataIndex: 'id', key: 'id' },
  { title: '商品名称', dataIndex: 'name', key: 'name' },
  { title: '价格', dataIndex: 'price', key: 'price' },
  { title: '属性', dataIndex: 'attributes', key: 'attributes' },
];

const data = ref([]);
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
});
const visible = ref(false);
const detailVisible = ref(false);
const modalTitle = ref('');
const formState = reactive({
  name: '',
  contact: '',
  phone: '',
  region: [],
  products: '',
  website: '',
  shopAddress: '',
  address: '',
  remarks: '',
});
const detailData = ref({
  name: '',
  contact: '',
  phone: '',
  region: [],
  products: '',
  website: '',
  shopAddress: '',
  address: '',
  remarks: '',
  goods: [], // 新增：商品列表
});

const regionOptions = ref(regionData);

const fetchData = () => {
  // 模拟API请求
  setTimeout(() => {
    const mockData = [
      { key: '1', name: '供应商A', contact: '张三', phone: '13800000000', region: ['浙江省', '杭州市', '西湖区'], products: '服装', status: '启用', website: 'http://www.example.com', shopAddress: 'http://shop.example.com', address: '某某街道1号', remarks: '合作良好',
        goods: [ // 商品列表
          { id: '101', name: 'T恤', price: 59.9, attributes: { color: '白色', size: 'L', material: '纯棉' } },
          { id: '102', name: '牛仔裤', price: 129, attributes: { color: '蓝色', size: '32', material: '牛仔布' } },
        ]
      },
      { key: '2', name: '供应商B', contact: '李四', phone: '13900000000', region: ['江苏省', '南京市', '玄武区'], products: '电子产品', status: '禁用', website: 'http://www.example.com', shopAddress: 'http://shop.example.com', address: '某某街道2号', remarks: '待考察',
        goods: [ // 商品列表
          { id: '201', name: '手机', price: 2999, attributes: { brand: '华为', model: 'P50', memory: '8GB' } },
          { id: '202', name: '耳机', price: 199, attributes: { brand: '小米', type: '蓝牙耳机', color: '黑色' } },
        ]
      },
    ];
    data.value = mockData;
    pagination.total = mockData.length;
  }, 500);
};

onMounted(() => {
  fetchData();
});

const addSupplier = () => {
  visible.value = true;
  modalTitle.value = '新增供应商';
  // 重置表单
  Object.assign(formState, {
    name: '',
    contact: '',
    phone: '',
    region: [],
    products: '',
    website: '',
    shopAddress: '',
    address: '',
    remarks: '',
  });
};

const editSupplier = (record) => {
  visible.value = true;
  modalTitle.value = '编辑供应商';
  Object.assign(formState, record); // 将record的值赋值给formState
};

const viewDetail = (record) => {
  detailVisible.value = true;
  detailData.value = record;
};

const changeStatus = (record) => {
  message.success(`已更改 ${record.name} 的状态`);
};

const handleTableChange = (paginationInfo) => {
  pagination.current = paginationInfo.current;
  fetchData(); // 重新获取数据
};

const handleOk = () => {
  message.success('保存成功');
  visible.value = false;
  fetchData(); // 重新获取数据
};

const handleCancel = () => {
  visible.value = false;
};

const handleDetailCancel = () => {
  detailVisible.value = false;
};

const onSearch = (value) => {
  console.log('搜索:', value);
  // 在实际项目中，你需要根据搜索关键词过滤数据
};

defineExpose({
  columns,
  goodsColumns,
  data,
  pagination,
  visible,
  detailVisible,
  modalTitle,
  formState,
  detailData,
  regionOptions,
  addSupplier,
  editSupplier,
  viewDetail,
  changeStatus,
  handleTableChange,
  handleOk,
  handleCancel,
  handleDetailCancel,
  onSearch,
});
</script>

<style scoped>
/* 可以添加一些样式，例如： */
.ant-table-cell {
  padding: 8px;
}
</style>
