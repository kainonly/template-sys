export interface Recharge {
  /**
   * 所属门店
   */
  shop_id: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 充值金额
   */
  pay: number;
  /**
   * 赠送
   */
  gift: {
    /**
     * 金额
     */
    bonus: number;
    /**
     * 积分
     */
    points: number;
  };
  /**
   * 有效期
   */
  valid_time: Date[];
  /**
   * 状态
   */
  status: boolean;
}
