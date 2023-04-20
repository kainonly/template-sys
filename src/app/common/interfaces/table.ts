/**
 * 餐桌
 */
export interface Table {
  /**
   * 所属门店
   */
  shop_id: string;
  /**
   * 所属区位
   */
  area_id: string;
  /**
   * 编号
   */
  sn: string;
  /**
   * 别名
   */
  alias?: string;
  /**
   * 餐位
   */
  seats: number;
  /**
   * 最低消费
   */
  minimum_spending: number;
  /**
   * 运行情况 -2：停用 -1：空闲 1：就餐 2：不清台 3：预结账
   */
  runtime: TableRuntime;
  /**
   * 排序
   */
  sort: number;
}

export type TableRuntime = -2 | -1 | 1 | 2 | 3;
