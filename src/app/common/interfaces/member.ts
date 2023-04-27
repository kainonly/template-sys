export interface Member {
  /**
   * 所属门店
   */
  shop_id: string;
  /**
   * 等级
   */
  level_id: string;
  /**
   * 卡号
   */
  cardno: string;
  /**
   * 个人信息
   */
  profile: {
    /**
     * 姓名
     */
    name: string;
    /**
     * 手机
     */
    phone: string;
    /**
     * 性别
     */
    gender: string;
    /**
     * 头像
     */
    avatar: string;
    /**
     * 出生日期
     */
    birthday: Date;
  };
  /**
   * 余额
   */
  balance: number;
  /**
   * 会员积分
   */
  points: number;
  /**
   * 支出
   */
  spending: number;
  /**
   * 所在地点
   */
  location: {
    /**
     * 地区 / 地区
     */
    country: string;
    /**
     * 省 / 州
     */
    province: string;
    /**
     * 城市
     */
    city: string;
  };
  /**
   * 来源
   */
  source: string;
  /**
   * 有效期
   */
  valid_time: Date[];
  /**
   * 状态
   */
  status: boolean;
}
