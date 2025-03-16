<template>
  <div class="vendor-management">
    <el-card class="page-header">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold">供应商管理</h2>
        <el-button type="primary" @click="handleAddVendor">
          <el-icon class="mr-1"><Plus /></el-icon>新增供应商
        </el-button>
      </div>
    </el-card>

    <el-card class="mt-4 search-area">
      <el-form :inline="true" :model="searchForm" class="flex flex-wrap gap-2">
        <el-form-item label="供应商名称">
          <el-input v-model="searchForm.name" placeholder="请输入供应商名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="searchForm.contact" placeholder="请输入联系人姓名" clearable></el-input>
        </el-form-item>
        <el-form-item label="供应商类型">
          <el-select v-model="searchForm.type" placeholder="请选择类型" clearable>
            <el-option v-for="item in vendorTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            <el-icon class="mr-1"><Search /></el-icon>搜索
          </el-button>
          <el-button @click="resetSearch">
            <el-icon class="mr-1"><Refresh /></el-icon>重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="mt-4">
      <el-table
        v-loading="tableLoading"
        :data="vendorList"
        border
        style="width: 100%"
        row-key="id"
      >
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="供应商名称" min-width="180" show-overflow-tooltip />
        <el-table-column prop="contact" label="联系人" width="120" />
        <el-table-column prop="phone" label="联系电话" width="150" />
        <el-table-column prop="email" label="电子邮箱" width="180" show-overflow-tooltip />
        <el-table-column prop="typeName" label="供应商类型" width="120" />
        <el-table-column prop="address" label="地址" min-width="200" show-overflow-tooltip />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'">
              {{ row.status === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
            <el-button type="primary" link @click="handleViewDetails(row)">详情</el-button>
            <el-button
              type="primary"
              link
              :type="row.status === 1 ? 'danger' : 'success'"
              @click="handleToggleStatus(row)"
            >
              {{ row.status === 1 ? '禁用' : '启用' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="flex justify-end mt-4">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 新增/编辑供应商对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="formMode === 'add' ? '新增供应商' : '编辑供应商'"
      width="650px"
      destroy-on-close
    >
      <el-form
        ref="vendorFormRef"
        :model="vendorForm"
        :rules="formRules"
        label-width="100px"
        class="vendor-form"
      >
        <el-form-item label="供应商名称" prop="name">
          <el-input v-model="vendorForm.name" placeholder="请输入供应商名称" />
        </el-form-item>
        <el-form-item label="供应商类型" prop="type">
          <el-select v-model="vendorForm.type" placeholder="请选择供应商类型" class="w-full">
            <el-option
              v-for="item in vendorTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="联系人" prop="contact">
              <el-input v-model="vendorForm.contact" placeholder="请输入联系人姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="vendorForm.phone" placeholder="请输入联系电话" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="vendorForm.email" placeholder="请输入电子邮箱" />
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input
            v-model="vendorForm.address"
            type="textarea"
            :rows="2"
            placeholder="请输入详细地址"
          />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="vendorForm.remark"
            type="textarea"
            :rows="3"
            placeholder="请输入备注信息（选填）"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="vendorForm.status"
            :active-value="1"
            :inactive-value="0"
            active-text="启用"
            inactive-text="禁用"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm">确认</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 供应商详情对话框 -->
    <el-dialog v-model="detailsVisible" title="供应商详情" width="700px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="供应商名称">{{ currentVendor.name }}</el-descriptions-item>
        <el-descriptions-item label="供应商类型">{{ currentVendor.typeName }}</el-descriptions-item>
        <el-descriptions-item label="联系人">{{ currentVendor.contact }}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{ currentVendor.phone }}</el-descriptions-item>
        <el-descriptions-item label="电子邮箱">{{ currentVendor.email }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="currentVendor.status === 1 ? 'success' : 'danger'">
            {{ currentVendor.status === 1 ? '启用' : '禁用' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="详细地址" :span="2">
          {{ currentVendor.address }}
        </el-descriptions-item>
        <el-descriptions-item label="备注" :span="2">
          {{ currentVendor.remark || '暂无备注' }}
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ currentVendor.createTime }}</el-descriptions-item>
        <el-descriptions-item label="最后更新时间">{{ currentVendor.updateTime }}</el-descriptions-item>
      </el-descriptions>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="detailsVisible = false">关闭</el-button>
          <el-button type="primary" @click="handleEdit(currentVendor)">编辑</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import {
  ElMessageBox,
  ElMessage,
  type FormInstance,
  type FormRules
} from 'element-plus'
import {
  Plus,
  Search,
  Refresh
} from '@element-plus/icons-vue'

interface VendorType {
  value: number
  label: string
}

interface StatusOption {
  value: number
  label: string
}

interface VendorItem {
  id: number
  name: string
  type: number
  typeName: string
  contact: string
  phone: string
  email: string
  address: string
  status: number
  remark?: string
  createTime: string
  updateTime: string
}

// 供应商类型选项
const vendorTypes = ref<VendorType[]>([
  { value: 1, label: '原料供应商' },
  { value: 2, label: '设备供应商' },
  { value: 3, label: '服务供应商' },
  { value: 4, label: '物流供应商' },
  { value: 5, label: '其他' }
])

// 状态选项
const statusOptions = ref<StatusOption[]>([
  { value: 1, label: '启用' },
  { value: 0, label: '禁用' }
])

// 搜索表单
const searchForm = reactive({
  name: '',
  contact: '',
  type: '',
  status: ''
})

// 供应商表单
const vendorForm = reactive({
  id: 0,
  name: '',
  type: 1,
  contact: '',
  phone: '',
  email: '',
  address: '',
  status: 1,
  remark: ''
})

// 表单验证规则
const formRules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入供应商名称', trigger: 'blur' },
    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  type: [{ required: true, message: '请选择供应商类型', trigger: 'change' }],
  contact: [{ required: true, message: '请输入联系人姓名', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入联系电话', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入电子邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  address: [{ required: true, message: '请输入详细地址', trigger: 'blur' }]
})

// 表格数据
const vendorList = ref<VendorItem[]>([])
const tableLoading = ref(false)
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)

// 对话框控制
const dialogVisible = ref(false)
const detailsVisible = ref(false)
const formMode = ref<'add' | 'edit'>('add')
const vendorFormRef = ref<FormInstance>()
const currentVendor = ref<VendorItem>({} as VendorItem)

// 模拟数据获取
const fetchVendorList = () => {
  tableLoading.value = true
  // 这里应该是实际的 API 调用
  setTimeout(() => {
    // 模拟数据
    vendorList.value = [
      {
        id: 1,
        name: '优质原料供应有限公司',
        type: 1,
        typeName: '原料供应商',
        contact: '张三',
        phone: '13800138000',
        email: 'zhangsan@example.com',
        address: '上海市浦东新区张江高科技园区科苑路88号',
        status: 1,
        remark: '提供高品质原材料，合作5年以上',
        createTime: '2023-05-18 14:30:00',
        updateTime: '2024-03-22 09:15:30'
      },
      {
        id: 2,
        name: '精良设备制造厂',
        type: 2,
        typeName: '设备供应商',
        contact: '李四',
        phone: '13900139000',
        email: 'lisi@example.com',
        address: '北京市海淀区中关村南大街5号',
        status: 1,
        remark: '专业工业设备制造商',
        createTime: '2023-07-10 11:20:00',
        updateTime: '2024-01-15 16:45:20'
      },
      {
        id: 3,
        name: '全球物流运输有限公司',
        type: 4,
        typeName: '物流供应商',
        contact: '王五',
        phone: '13700137000',
        email: 'wangwu@example.com',
        address: '广州市白云区机场路1288号',
        status: 0,
        remark: '',
        createTime: '2023-09-05 10:00:00',
        updateTime: '2024-02-28 14:30:00'
      }
    ]
    total.value = 3
    tableLoading.value = false
  }, 600)
}

// 初始化
onMounted(() => {
  fetchVendorList()
})

// 处理搜索
const handleSearch = () => {
  currentPage.value = 1
  fetchVendorList()
}

// 重置搜索
const resetSearch = () => {
  Object.keys(searchForm).forEach(key => {
    searchForm[key as keyof typeof searchForm] = ''
  })
  handleSearch()
}

// 分页处理
const handleSizeChange = (val: number) => {
  pageSize.value = val
  fetchVendorList()
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  fetchVendorList()
}

// 新增供应商
const handleAddVendor = () => {
  formMode.value = 'add'
  Object.keys(vendorForm).forEach(key => {
    if (key === 'status') {
      vendorForm[key as keyof typeof vendorForm] = 1
    } else if (key === 'type') {
      vendorForm[key as keyof typeof vendorForm] = 1
    } else {
      // @ts-ignore
      vendorForm[key] = ''
    }
  })
  vendorForm.id = 0
  dialogVisible.value = true
}

// 编辑供应商
const handleEdit = (row: VendorItem) => {
  formMode.value = 'edit'
  Object.assign(vendorForm, row)
  dialogVisible.value = true
  detailsVisible.value = false
}

// 提交表单
const submitForm = async () => {
  if (!vendorFormRef.value) return

  await vendorFormRef.value.validate((valid) => {
    if (valid) {
      // 这里应该是实际的 API 调用
      const message = formMode.value === 'add' ? '新增供应商成功！' : '更新供应商信息成功！'

      ElMessage({
        type: 'success',
        message
      })

      dialogVisible.value = false
      fetchVendorList()
    } else {
      return false
    }
  })
}

// 查看详情
const handleViewDetails = (row: VendorItem) => {
  currentVendor.value = { ...row }
  detailsVisible.value = true
}

// 切换状态
const handleToggleStatus = (row: VendorItem) => {
  const statusText = row.status === 1 ? '禁用' : '启用'

  ElMessageBox.confirm(
    `确认要${statusText}供应商"${row.name}"吗？`,
    `${statusText}确认`,
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      // 这里应该是实际的 API 调用
      ElMessage({
        type: 'success',
        message: `${statusText}成功！`
      })

      // 模拟更新
      row.status = row.status === 1 ? 0 : 1
    })
    .catch(() => {
      // 取消操作
    })
}
</script>

<style scoped>
.vendor-management {
  padding: 16px;
}

.page-header {
  margin-bottom: 16px;
}

.search-area {
  margin-bottom: 16px;
}

.vendor-form {
  max-height: 60vh;
  overflow-y: auto;
  padding-right: 16px;
}
</style>
