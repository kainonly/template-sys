export interface Remark {
  /**
   * 所属门店
   */
  shop_id: string;
  /**
   * 编号
   */
  sn: string;
  /**
   * 内容
   */
  content: string;
  /**
   * 影响价格
   */
  offset: number;
  /**
   * 状态
   */
  status: boolean;
}
