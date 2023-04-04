/**
 * 会员等级
 */
export interface MemberLevel {
  /**
   * 名称
   */
  name: string;
  /**
   * 等级
   */
  level: number;
  /**
   * 折扣
   */
  discount: {
    /**
     * 订房折扣
     */
    room: number;
    /**
     * 餐饮折扣
     */
    dining: number;
    /**
     * 其他折扣
     */
    other: number;
  };
  /**
   * 升级
   */
  upgrade: {
    /**
     * 自动升级
     * 0：不启用 1：支付成功后 2：酒店核实后
     */
    mode: 0 | 1 | 2;
    /**
     * 升级金额
     */
    amount: number;
  };
  /**
   * 包含权益
   */
  benefits: string[];
  /**
   * 状态
   */
  status: boolean;
}
