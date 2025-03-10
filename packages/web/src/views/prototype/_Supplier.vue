<template>
  <div class="supplier-detail-container">
    <a-page-header
      class="page-header"
      :title="supplier.name"
      :subtitle="`供应商ID: ${supplier.id}`"
      @back="goBack"
    >
      <template #tags>
        <a-tag v-if="supplier.level === 'A'" color="green">战略供应商</a-tag>
        <a-tag v-else-if="supplier.level === 'B'" color="blue">重要供应商</a-tag>
        <a-tag v-else-if="supplier.level === 'C'" color="orange">一般供应商</a-tag>
        <a-tag v-else color="default">临时供应商</a-tag>

        <a-tag v-if="supplier.verified" color="green">已认证</a-tag>
        <a-tag v-else color="red">未认证</a-tag>
      </template>

      <template #extra>
        <a-space>
          <a-button type="primary">
            <template #icon><mail-outlined /></template>
            发送邮件
          </a-button>
          <a-button>
            <template #icon><phone-outlined /></template>
            拨打电话
          </a-button>
          <a-dropdown>
            <template #overlay>
              <a-menu>
                <a-menu-item key="1">导出供应商信息</a-menu-item>
                <a-menu-item key="2">添加到收藏</a-menu-item>
                <a-menu-item key="3">发起采购申请</a-menu-item>
                <a-menu-item key="4" danger>停用供应商</a-menu-item>
              </a-menu>
            </template>
            <a-button>
              <more-outlined />
            </a-button>
          </a-dropdown>
        </a-space>
      </template>
    </a-page-header>

    <div class="content-container">
      <a-row :gutter="[16, 16]">
        <!-- 左侧信息区域 -->
        <a-col :xs="24" :lg="16">
          <!-- 基本信息 -->
          <a-card title="基本信息" class="info-card">
            <template #extra>
              <a-button type="link">
                <edit-outlined /> 编辑
              </a-button>
            </template>

            <a-descriptions :column="{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }">
              <a-descriptions-item label="供应商名称">{{ supplier.name }}</a-descriptions-item>
              <a-descriptions-item label="供应商类型">{{ supplier.type }}</a-descriptions-item>
              <a-descriptions-item label="成立时间">{{ supplier.establishDate }}</a-descriptions-item>
              <a-descriptions-item label="注册资本">{{ supplier.registeredCapital }}</a-descriptions-item>
              <a-descriptions-item label="经营范围">{{ supplier.businessScope }}</a-descriptions-item>
              <a-descriptions-item label="企业规模">{{ supplier.scale }}</a-descriptions-item>
              <a-descriptions-item label="合作开始日期">{{ supplier.cooperationStartDate }}</a-descriptions-item>
              <a-descriptions-item label="结算方式">{{ supplier.paymentMethod }}</a-descriptions-item>
              <a-descriptions-item label="账期">{{ supplier.creditPeriod }}</a-descriptions-item>
              <a-descriptions-item label="信用评级">
                <a-rate :value="supplier.creditRating" disabled allow-half />
              </a-descriptions-item>
              <a-descriptions-item label="年采购额">{{ supplier.annualPurchase }}</a-descriptions-item>
              <a-descriptions-item label="法定代表人">{{ supplier.legalRepresentative }}</a-descriptions-item>
            </a-descriptions>

            <a-divider />

            <h3>企业证照</h3>
            <a-row :gutter="[16, 16]">
              <a-col :span="8" v-for="(cert, index) in supplier.certificates" :key="index">
                <a-card hoverable class="cert-card">
                  <template #cover>
                    <img :alt="cert.name" :src="cert.image" />
                  </template>
                  <a-card-meta :title="cert.name">
                    <template #description>
                      <div>
                        <div>证书编号: {{ cert.number }}</div>
                        <div>有效期至: {{ cert.expireDate }}</div>
                      </div>
                    </template>
                  </a-card-meta>
                </a-card>
              </a-col>
              <a-col :span="8">
                <a-button class="add-cert-btn" block>
                  <plus-outlined /> 添加证照
                </a-button>
              </a-col>
            </a-row>
          </a-card>

          <!-- 联系信息 -->
          <a-card title="联系信息" class="info-card">
            <template #extra>
              <a-button type="link">
                <edit-outlined /> 编辑
              </a-button>
            </template>

            <a-tabs default-active-key="1">
              <a-tab-pane key="1" tab="企业联系方式">
                <a-descriptions :column="{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }">
                  <a-descriptions-item label="总机电话">
                    <phone-outlined /> {{ supplier.contact.phone }}
                  </a-descriptions-item>
                  <a-descriptions-item label="企业邮箱">
                    <mail-outlined /> {{ supplier.contact.email }}
                  </a-descriptions-item>
                  <a-descriptions-item label="官方网站">
                    <global-outlined />
                    <a :href="supplier.contact.website" target="_blank">{{ supplier.contact.website }}</a>
                  </a-descriptions-item>
                  <a-descriptions-item label="传真">
                    <printer-outlined /> {{ supplier.contact.fax }}
                  </a-descriptions-item>
                  <a-descriptions-item label="注册地址" :span="2">
                    <environment-outlined /> {{ supplier.contact.registeredAddress }}
                  </a-descriptions-item>
                  <a-descriptions-item label="办公地址" :span="2">
                    <home-outlined /> {{ supplier.contact.officeAddress }}
                  </a-descriptions-item>
                  <a-descriptions-item label="工厂地址" :span="2">
                    <shop-outlined /> {{ supplier.contact.factoryAddress }}
                  </a-descriptions-item>
                </a-descriptions>

                <div class="map-container">
                  <h4>地理位置</h4>
                  <div ref="locationMap" style="height: 300px; width: 100%;"></div>
                </div>
              </a-tab-pane>

              <a-tab-pane key="2" tab="联系人">
                <a-list item-layout="horizontal" :data-source="supplier.contactPersons">
                  <template #renderItem="{ item }">
                    <a-list-item>
                      <a-list-item-meta
                        :description="`职位: ${item.position}`"
                      >
                        <template #title>
                          <a>{{ item.name }}</a>
                          <a-tag v-if="item.isPrimary" color="blue">主要联系人</a-tag>
                        </template>
                        <template #avatar>
                          <a-avatar :src="item.avatar" />
                        </template>
                      </a-list-item-meta>

                      <a-space>
                        <a-button size="small" type="primary">
                          <phone-outlined /> {{ item.phone }}
                        </a-button>
                        <a-button size="small">
                          <mail-outlined /> {{ item.email }}
                        </a-button>
                        <a-button size="small" v-if="item.wechat">
                          <wechat-outlined /> 微信
                        </a-button>
                      </a-space>
                    </a-list-item>
                  </template>
                </a-list>

                <div style="margin-top: 16px; text-align: center;">
                  <a-button type="dashed">
                    <plus-outlined /> 添加联系人
                  </a-button>
                </div>
              </a-tab-pane>

              <a-tab-pane key="3" tab="社交账号">
                <a-list>
                  <a-list-item>
                    <template #actions>
                      <a href="#" target="_blank">访问</a>
                    </template>
                    <a-list-item-meta title="LinkedIn" description="linkedin.com/company/example-supplier">
                      <template #avatar>
                        <a-avatar style="background-color: #0077B5;">
                          <template #icon><linkedin-outlined /></template>
                        </a-avatar>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>

                  <a-list-item>
                    <template #actions>
                      <a href="#" target="_blank">访问</a>
                    </template>
                    <a-list-item-meta title="微信公众号" description="examplesupplier">
                      <template #avatar>
                        <a-avatar style="background-color: #07C160;">
                          <template #icon><wechat-outlined /></template>
                        </a-avatar>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                </a-list>
              </a-tab-pane>

              <a-tab-pane key="4" tab="线上店铺">
                <a-list>
                  <a-list-item>
                    <template #actions>
                      <a href="#" target="_blank">访问店铺</a>
                    </template>
                    <a-list-item-meta title="阿里巴巴国际站" description="alibaba.com/examplesupplier">
                      <template #avatar>
                        <a-avatar src="https://via.placeholder.com/40" />
                      </template>
                    </a-list-item-meta>
                  </a-list-item>

                  <a-list-item>
                    <template #actions>
                      <a href="#" target="_blank">访问店铺</a>
                    </template>
                    <a-list-item-meta title="1688" description="1688.com/examplesupplier">
                      <template #avatar>
                        <a-avatar src="https://via.placeholder.com/40" />
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                </a-list>

                <div style="margin-top: 16px; text-align: center;">
                  <a-button type="dashed">
                    <plus-outlined /> 添加店铺
                  </a-button>
                </div>
              </a-tab-pane>
            </a-tabs>
          </a-card>

          <!-- 产品信息 -->
          <a-card title="供应产品" class="info-card">
            <template #extra>
              <a-button type="primary">
                <plus-outlined /> 添加产品
              </a-button>
            </template>

            <a-tabs default-active-key="1">
              <a-tab-pane key="1" tab="产品列表">
                <a-table :dataSource="supplier.products" :columns="productColumns" :pagination="{ pageSize: 5 }">
                  <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'image'">
                      <img :src="record.image" alt="产品图片" class="product-image" />
                    </template>
                    <template v-if="column.key === 'status'">
                      <a-tag :color="record.status === '在售' ? 'green' : (record.status === '待上架' ? 'orange' : 'red')">
                        {{ record.status }}
                      </a-tag>
                    </template>
                    <template v-if="column.key === 'action'">
                      <a-space>
                        <a>详情</a>
                        <a-divider type="vertical" />
                        <a>编辑</a>
                        <a-divider type="vertical" />
                        <a>下架</a>
                      </a-space>
                    </template>
                  </template>
                </a-table>
              </a-tab-pane>

              <a-tab-pane key="2" tab="产品分类">
                <div ref="productCategoryChart" style="height: 350px; width: 100%;"></div>
              </a-tab-pane>

              <a-tab-pane key="3" tab="产品画廊">
                <a-row :gutter="[16, 16]">
                  <a-col :xs="24" :sm="12" :md="8" :lg="6" v-for="(product, index) in supplier.products" :key="index">
                    <a-card hoverable class="product-card">
                      <template #cover>
                        <img alt="产品图片" :src="product.image" />
                      </template>
                      <a-card-meta :title="product.name">
                        <template #description>
                          <div>
                            <div>型号: {{ product.model }}</div>
                            <div>价格: {{ product.price }}</div>
                          </div>
                        </template>
                      </a-card-meta>
                    </a-card>
                  </a-col>
                </a-row>
              </a-tab-pane>
            </a-tabs>
          </a-card>

          <!-- 采购记录 -->
          <a-card title="采购历史" class="info-card">
            <template #extra>
              <a-range-picker />
            </template>

            <div ref="purchaseHistoryChart" style="height: 300px; width: 100%;"></div>

            <a-divider />

            <a-table :dataSource="supplier.purchaseHistory" :columns="purchaseColumns" :pagination="{ pageSize: 5 }">
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'status'">
                  <a-tag :color="getOrderStatusColor(record.status)">
                    {{ record.status }}
                  </a-tag>
                </template>
                <template v-if="column.key === 'action'">
                  <a>查看详情</a>
                </template>
              </template>
            </a-table>
          </a-card>
        </a-col>

        <!-- 右侧信息区域 -->
        <a-col :xs="24" :lg="8">
          <!-- 评分卡片 -->
          <a-card title="供应商评分" class="info-card">
            <div class="score-container">
              <div class="overall-score">
                <a-progress
                  type="circle"
                  :percent="supplier.overallScore"
                  :format="percent => `${percent}`"
                  :width="120"
                />
                <div class="score-label">综合评分</div>
              </div>

              <div class="score-breakdown">
                <div class="score-item">
                  <span class="score-name">产品质量</span>
                  <a-progress :percent="supplier.qualityScore" status="active" :show-info="false" />
                  <span class="score-value">{{ supplier.qualityScore }}</span>
                </div>
                <div class="score-item">
                  <span class="score-name">交付准时率</span>
                  <a-progress :percent="supplier.deliveryScore" status="active" :show-info="false" />
                  <span class="score-value">{{ supplier.deliveryScore }}</span>
                </div>
                <div class="score-item">
                  <span class="score-name">价格竞争力</span>
                  <a-progress :percent="supplier.priceScore" status="active" :show-info="false" />
                  <span class="score-value">{{ supplier.priceScore }}</span>
                </div>
                <div class="score-item">
                  <span class="score-name">服务响应</span>
                  <a-progress :percent="supplier.serviceScore" status="active" :show-info="false" />
                  <span class="score-value">{{ supplier.serviceScore }}</span>
                </div>
              </div>
            </div>
          </a-card>

          <!-- 财务信息 -->
          <a-card title="财务信息" class="info-card">
            <a-collapse>
              <a-collapse-panel key="1" header="付款信息">
                <a-descriptions :column="1">
                  <a-descriptions-item label="结算方式">{{ supplier.financeInfo.paymentMethod }}</a-descriptions-item>
                  <a-descriptions-item label="付款条件">{{ supplier.financeInfo.paymentTerms }}</a-descriptions-item>
                  <a-descriptions-item label="预付款比例">{{ supplier.financeInfo.advanceRate }}</a-descriptions-item>
                  <a-descriptions-item label="账期">{{ supplier.financeInfo.creditPeriod }}</a-descriptions-item>
                </a-descriptions>
              </a-collapse-panel>

              <a-collapse-panel key="2" header="银行账号">
                <a-descriptions :column="1">
                  <a-descriptions-item label="开户行">{{ supplier.financeInfo.bankName }}</a-descriptions-item>
                  <a-descriptions-item label="账户名">{{ supplier.financeInfo.accountName }}</a-descriptions-item>
                  <a-descriptions-item label="账号">{{ supplier.financeInfo.accountNumber }}</a-descriptions-item>
                  <a-descriptions-item label="Swift代码">{{ supplier.financeInfo.swiftCode }}</a-descriptions-item>
                </a-descriptions>
              </a-collapse-panel>

              <a-collapse-panel key="3" header="税务信息">
                <a-descriptions :column="1">
                  <a-descriptions-item label="税号">{{ supplier.financeInfo.taxNumber }}</a-descriptions-item>
                  <a-descriptions-item label="税务登记类型">{{ supplier.financeInfo.taxRegistrationType }}</a-descriptions-item>
                </a-descriptions>
              </a-collapse-panel>
            </a-collapse>
          </a-card>

          <!-- 供应商资质 -->
          <a-card title="资质与认证" class="info-card">
            <a-timeline mode="left">
              <a-timeline-item v-for="(cert, index) in supplier.certifications" :key="index">
                <template #dot>
                  <check-circle-outlined :style="{ fontSize: '16px', color: certExpiryStatus(cert.expireDate) }" />
                </template>
                <div class="cert-timeline-item">
                  <div class="cert-name">{{ cert.name }}</div>
                  <div class="cert-info">
                    <span>证书编号: {{ cert.number }}</span>
                    <a-tag :color="certExpiryStatus(cert.expireDate) === '#52c41a' ? 'green' : (certExpiryStatus(cert.expireDate) === '#faad14' ? 'orange' : 'red')">
                      {{ certExpiryText(cert.expireDate) }}
                    </a-tag>
                  </div>
                  <div class="cert-date">
                    <span>发证日期: {{ cert.issueDate }}</span>
                    <span>有效期至: {{ cert.expireDate }}</span>
                  </div>
                </div>
              </a-timeline-item>
            </a-timeline>

            <div style="margin-top: 16px; text-align: center;">
              <a-button type="dashed">
                <plus-outlined /> 添加认证
              </a-button>
            </div>
          </a-card>

          <!-- 文档管理 -->
          <a-card title="文档管理" class="info-card">
            <a-list size="small">
              <a-list-item v-for="(doc, index) in supplier.documents" :key="index">
                <template #actions>
                  <a-dropdown>
                    <template #overlay>
                      <a-menu>
                        <a-menu-item key="1">查看</a-menu-item>
                        <a-menu-item key="2">下载</a-menu-item>
                        <a-menu-item key="3">分享</a-menu-item>
                        <a-menu-item key="4" danger>删除</a-menu-item>
                      </a-menu>
                    </template>
                    <a-button type="text">
                      <ellipsis-outlined />
                    </a-button>
                  </a-dropdown>
                </template>
                <a-list-item-meta>
                  <template #title>
                    <div class="doc-title">
                      <file-outlined style="margin-right: 8px;" />
                      <a>{{ doc.name }}</a>
                    </div>
                  </template>
                  <template #description>
                    <div class="doc-info">
                      <span>{{ doc.type }}</span>
                      <span>{{ doc.size }}</span>
                      <span>上传: {{ doc.uploadDate }}</span>
                    </div>
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </a-list>

            <div style="margin-top: 16px; text-align: center;">
              <a-button type="dashed">
                <upload-outlined /> 上传文档
              </a-button>
            </div>
          </a-card>

          <!-- 备注和笔记 -->
          <a-card title="备注和笔记" class="info-card">
            <a-list
              class="comment-list"
              :header="`${supplier.notes.length}条记录`"
              item-layout="horizontal"
              :data-source="supplier.notes"
            >
              <template #renderItem="{ item }">
                <a-list-item>
                  <a-comment
                    :author="item.author"
                    :avatar="item.avatar"
                    :content="item.content"
                    :datetime="item.datetime"
                  />
                </a-list-item>
              </template>
            </a-list>

            <a-divider />

            <a-form layout="vertical">
              <a-form-item>
                <a-textarea rows="4" placeholder="添加备注..." />
              </a-form-item>
              <a-form-item>
                <a-button type="primary">
                  添加备注
                </a-button>
              </a-form-item>
            </a-form>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, createVNode } from 'vue';
import { useRouter } from 'vue-router';
import {
  MailOutlined,
  PhoneOutlined,
  EditOutlined,
  MoreOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons-vue';
import { message, Modal } from 'ant-design-vue';

const router = useRouter();

// 供应商数据
const supplier = reactive({
  id: 'SUP20240501',
  name: '上海科技有限公司',
  type: '生产制造商',
  level: 'A',
  verified: true,
  establishDate: '2010-05-15',
  registeredCapital: '1000万元',
  businessScope: '电子产品、半导体、集成电路',
  scale: '500-1000人',
  cooperationStartDate: '2018-03-10',
  paymentMethod: '电汇/银行转账',
  creditPeriod: '45天',
  creditRating: 4.5,
  annualPurchase: '¥ 3,500,000',
  legalRepresentative: '张明',
  address: '上海市浦东新区张江高科技园区科苑路88号',
  website: 'https://www.example-tech.com',
  contacts: [
    {
      name: '李军',
      position: '销售经理',
      phone: '13812345678',
      email: 'lijun@example-tech.com',
      primary: true
    },
    {
      name: '王芳',
      position: '客户代表',
      phone: '13987654321',
      email: 'wangfang@example-tech.com',
      primary: false
    }
  ],
  certificates: [
    {
      name: '营业执照',
      number: '9131011607X3257',
      image: 'https://via.placeholder.com/300x200?text=营业执照',
      expireDate: '长期'
    },
    {
      name: 'ISO9001认证',
      number: 'ISO9001-2022-54321',
      image: 'https://via.placeholder.com/300x200?text=ISO9001认证',
      expireDate: '2025-10-15'
    },
    {
      name: 'ISO14001认证',
      number: 'ISO14001-2021-12345',
      image: 'https://via.placeholder.com/300x200?text=ISO14001认证',
      expireDate: '2024-08-30'
    }
  ],
  products: [
    {
      name: '半导体芯片A系列',
      category: '电子元器件',
      certification: 'CE, ROHS',
      price: '¥ 120.00'
    },
    {
      name: '集成电路板B2000',
      category: '电子元器件',
      certification: 'CE, FCC',
      price: '¥ 450.00'
    },
    {
      name: '电源模块PS500',
      category: '电源设备',
      certification: 'CE, UL',
      price: '¥ 320.00'
    }
  ],
  performanceStats: {
    onTimeDeliveryRate: 96.5,
    qualityPassRate: 99.2,
    returnRate: 0.8,
    responseTime: 4.5
  },
  history: [
    {
      date: '2023-12-15',
      type: '审核',
      content: '通过年度供应商审核'
    },
    {
      date: '2023-09-05',
      type: '合同',
      content: '续签年度采购协议'
    },
    {
      date: '2023-06-20',
      type: '评估',
      content: '季度供应商评估: A级'
    },
    {
      date: '2023-03-10',
      type: '认证',
      content: '更新ISO9001认证'
    }
  ]
});

// 采购订单数据
const purchaseOrders = ref([
  {
    id: 'PO2023120001',
    date: '2023-12-10',
    amount: '¥ 458,000',
    status: 'completed',
    items: 12
  },
  {
    id: 'PO2023100002',
    date: '2023-10-05',
    amount: '¥ 285,600',
    status: 'completed',
    items: 8
  },
  {
    id: 'PO2023080003',
    date: '2023-08-15',
    amount: '¥ 362,400',
    status: 'completed',
    items: 10
  },
  {
    id: 'PO2024020004',
    date: '2024-02-20',
    amount: '¥ 529,800',
    status: 'processing',
    items: 15
  }
]);

// 审核日志数据
const auditLogs = ref([
  {
    date: '2023-12-05',
    type: '资质审核',
    result: '通过',
    auditor: '张静',
    comments: '所有资质证书有效，符合要求'
  },
  {
    date: '2023-09-15',
    type: '现场考察',
    result: '通过',
    auditor: '王刚',
    comments: '工厂环境良好，生产能力符合预期'
  },
  {
    date: '2023-06-10',
    type: '质量审核',
    result: '通过',
    auditor: '李明',
    comments: '质量管理体系完善，缺陷率低于行业平均水平'
  },
  {
    date: '2023-03-20',
    type: '财务状况',
    result: '通过',
    auditor: '赵敏',
    comments: '财务状况稳健，无重大负债风险'
  }
]);

// 页面交互方法
const goBack = () => {
  router.back();
};

const handleAddCertificate = () => {
  message.info('上传新证书功能开发中...');
};

const handleEditContact = (contact: any) => {
  message.info(`编辑联系人: ${contact.name}`);
};

const handleDeleteContact = (contact: any) => {
  Modal.confirm({
    title: '确认删除',
    icon: createVNode(ExclamationCircleOutlined),
    content: `确定要删除联系人 ${contact.name} 吗？`,
    okText: '确认',
    cancelText: '取消',
    onOk() {
      message.success(`已删除联系人: ${contact.name}`);
    }
  });
};

const handleViewOrder = (order: any) => {
  message.info(`查看订单详情: ${order.id}`);
};

const handleExportSupplierInfo = () => {
  message.success('供应商信息导出成功');
};

const activeTab = ref('1');
</script>

<style scoped>
.supplier-detail-container {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.page-header {
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  margin-bottom: 16px;
  padding: 16px 24px;
}

.content-container {
  padding: 0 16px 24px;
}

.info-card {
  margin-bottom: 16px;
}

.cert-card {
  height: 100%;
}

.cert-card img {
  height: 150px;
  object-fit: cover;
}

.add-cert-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 250px;
  border: 1px dashed #d9d9d9;
  border-radius: 2px;
  background-color: #fafafa;
  cursor: pointer;
  transition: all 0.3s;
}

.add-cert-btn:hover {
  border-color: #1890ff;
}

.add-cert-btn .anticon {
  font-size: 24px;
  margin-bottom: 8px;
}

.contact-card {
  margin-bottom: 16px;
}

.contact-avatar {
  background-color: #1890ff;
  color: #fff;
}

.primary-contact {
  border-left: 3px solid #52c41a;
  padding-left: 12px;
}

.performance-card {
  margin-bottom: 16px;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
}

.stat-label {
  color: rgba(0, 0, 0, 0.45);
}

.status-completed {
  color: #52c41a;
}

.status-processing {
  color: #1890ff;
}

.status-cancelled {
  color: #ff4d4f;
}

.history-item-audit {
  color: #1890ff;
}

.history-item-contract {
  color: #52c41a;
}

.history-item-evaluation {
  color: #fa8c16;
}

.history-item-certification {
  color: #722ed1;
}

.product-item {
  border-bottom: 1px solid #f0f0f0;
  padding: 12px 0;
}

.product-item:last-child {
  border-bottom: none;
}

.product-category {
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
}

.product-price {
  font-weight: 600;
  color: #fa8c16;
}

.product-cert {
  font-size: 12px;
  background-color: #f5f5f5;
  padding: 2px 6px;
  border-radius: 2px;
}

.audit-result-pass {
  color: #52c41a;
}

.audit-result-fail {
  color: #ff4d4f;
}

.audit-result-warning {
  color: #faad14;
}

.tab-container {
  background: #fff;
  padding: 16px;
  border-radius: 2px;
}

.order-table {
  margin-top: 16px;
}

.address-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
}

.address-icon {
  margin-right: 8px;
  margin-top: 4px;
}

@media (max-width: 768px) {
  .content-container {
    padding: 0 8px 16px;
  }

  .page-header {
    padding: 12px 16px;
  }
}
</style>
