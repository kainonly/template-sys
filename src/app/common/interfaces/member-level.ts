/**
 * 会员等级
 */
export interface MemberLevel {
  /**
   * 所属门店
   */
  shop_id: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 积分
   */
  points: {
    /**
     * 初始积分
     */
    initial: number;
    /**
     * 等级积分
     */
    upgrade: number;
    /**
     * 消费积分
     */
    earn: number;
  };
  /**
   * 默认折扣
   */
  discount: number;
  /**
   * 权重
   */
  weights: number;
}
