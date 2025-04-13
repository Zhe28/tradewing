// 一种产品包括 产品名称、产品图片、产品尺寸、产品数量、产品价格、总价
export interface IProduct {
  // 商品id
  id: string
  // 商品名称
  name: string
  // 商品图片
  image?: string
  // 商品尺寸
  size: {
    // 尺寸id
    id: string;
    // 尺寸名称
    name: string
    // 尺寸图片
    image?: string;
    // 尺寸数量
    quantity: number;
    // 尺寸价格
    price: number;
  }[]
}

export interface IInvoice {
  id: string
  buyer: string
  supplier: string
  invoiceNumber: string
  products: IProduct[]
  createTime: string,
  updateTime: string
}