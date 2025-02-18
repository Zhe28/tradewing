import { getAvaliableCustomer } from '@/utils/http/avaliableCustomer'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAvaliableCustomerStore = defineStore('AvaliableCustomer', () => {
  // 定义的数据集
  const data = ref<dataList[]>([])
  // 定义的 columns
  const columns = ref([
    { 
      title: '客户名称', 
      width: 150, 
      dataIndex: 'name',
       key: 'name', 
       fixed: 'left' ,
       filters: [],
       filterSearch: true,
       filterMode: 'menu',
       filterMultiple: true,
       onFilter: (value: any, record: any) => record.name.indexOf(value) === 0,
       sorter: (a: dataList, b: dataList) => {
         // console.log("sort data -->", a, b);
         return a.name.length - b.name.length
       },
      //  sortDirections: ['descend', 'ascend'],
      },
    {
      title: '国家',
      width: 150,
      dataIndex: 'county',
      key: 'county',
      // fixed: 'left',
      align: 'left',
      filters: [],
      filterSearch: true,
      filterMultiple: true,
      onFilter: (value: any, record: any) => record.county.indexOf(value) === 0,
      sorter: (a: dataList, b: dataList) => {
        // console.log("sort data -->", a, b);
        return a.county.length - b.county.length
      },
      sortDirections: ['descend', 'ascend'],
    },
    { title: '询价产品',width: 150, dataIndex: 'product', key: 'product' },
    { title: '开始联系时间',width: 150, dataIndex: 'contact-time', key: 'contact-time' },
    { title: '客户来源',width: 100, dataIndex: 'source', key: 'source' },
    { title: '跟进方式',width: 100, dataIndex: 'contact-type', key: 'contact-type' },
    { title: '客户邮箱',width: 200, dataIndex: 'email', key: 'email' },
    { title: 'whatsup/wechat',width: 200, dataIndex: 'whatsup/wechat', key: 'whatsup/wechat' },
    { title: '客户电话',width: 150, dataIndex: 'phone', key: 'phone' },
    { title: '客户类型',width: 80, dataIndex: 'customer-type', key: 'customer-type' },
    { title: '公司名称', dataIndex: 'company', key: 'company' },
    { title: '公司官网', dataIndex: 'website', key: 'website' },
    { title: '备注', dataIndex: 'remark', key: 'remark', width: 200 },
    {
      title: '处理进度',
      dataIndex: 'status',
      key: 'status',
      fixed: 'right',
      width: 100,
      filters: [],
      filterMode: 'tree',
      onFilter: function (value: any, record: dataList) {
        // console.log("status filter", value, record);
        return record.status === value
      },
    },
  ])

  // 更新 filters
  function updateFilters(_dataList: keyof dataList) {
    const column = columns.value.filter((colunmItem) => {
      return <keyof dataList>colunmItem.dataIndex === _dataList
    })[0]
    // // 没有获取到数值时，直接返回
    // if (column.length < 1) return

    // 获取所有的 data， 并筛选重复的
    const list = new Set<string>()
    const filterList: record[] = []
    data.value.forEach(function (item: dataList) {
      const record = { text: item[_dataList], value: item[_dataList] }
      if (list.has(item[_dataList])) return
      list.add(item[_dataList])
      filterList.push(record)
    })
    // console.log(list)

    column.filters = filterList as any
    return filterList
  }

  // 从http请求 更新data数据
  function updateData() {
    getAvaliableCustomer().then((res) => {
      // console.log(res)
      data.value = res
    })
  }
  return { data, columns, updateFilters, updateData }
})
