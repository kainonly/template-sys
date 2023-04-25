export interface Dish {
  /**
   * 所属门店
   */
  shop_id: string;
  /**
   * 所属分类
   */
  type_id: string;
  /**
   * 菜品名称
   */
  name: string;
  /**
   * 编号
   */
  sn: string;
  /**
   * 简码
   */
  code: string;
  /**
   * 招牌菜
   */
  signature: boolean;
  /**
   * 推荐菜
   */
  recommend: boolean;
  /**
   * 价格
   */
  price: number;
  /**
   * 会员
   */
  vip: {
    /**
     * 启用
     */
    enabled: boolean;
    /**
     * 价格
     */
    price: number;
  };
  /**
   * 需称重
   */
  weigh: boolean;
  /**
   * 时价菜
   */
  by_time: boolean;
  /**
   * 成本
   */
  cost: number;
  /**
   * 提成
   */
  commission: number;
  /**
   * 折扣
   */
  discount: boolean;
  /**
   * 起购数量
   */
  minimum_quantity: number;
  /**
   * 堂食
   */
  dine: {
    /**
     * 启用
     */
    enabled: boolean;
    /**
     * 服务费率
     */
    service: number;
    /**
     * 税率
     */
    tax: number;
  };
  /**
   * 外卖
   */
  takeout: {
    /**
     * 启用
     */
    enabled: boolean;
    /**
     * 服务费率
     */
    service: number;
    /**
     * 税率
     */
    tax: number;
  };
  /**
   * 规格
   */
  specification?: {
    /**
     * 单位
     */
    unit: string;
    /**
     * 规格项目
     */
    items: DishSpecificationItem[];
  };
  /**
   * 预点餐
   */
  preorder: {
    /**
     * 启用
     */
    enabled: boolean;
    /**
     * 方式 1：按顾客人数 2：固定数量
     */
    way: number;
    /**
     * 数量，方式 2 （必须）
     */
    quantity?: number;
  };
  /**
   * 标识图
   */
  logo: string;
  /**
   * 图片组
   */
  pictures?: string[];
  /**
   * 介绍
   */
  introduction: string;
  /**
   * 售罄
   */
  sold_out: boolean;
  /**
   * 销量
   */
  sales: number;
  /**
   * 排序
   */
  sort: number;
  /**
   * 状态
   */
  status: boolean;
}

export interface DishSpecificationItem {
  /**
   * 规格名称
   */
  name: string;
  /**
   * 原价
   */
  original: number;
  /**
   * 价格
   */
  price: number;
  /**
   * 成本价
   */
  cost: number;
  /**
   * 会员价
   */
  vip: number;
  /**
   * 默认的
   */
  default: boolean;
  /**
   * 启用的
   */
  enabled: boolean;
}
