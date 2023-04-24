/**
 * 会员等级
 */
export interface MemberLevel {
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
  };
  /**
   * 默认折扣
   */
  discount: number;
  /**
   * 状态
   */
  status: boolean;
}
