export interface Member {
  /**
   * 卡号
   */
  cardno: string;
  /**
   * 手机
   */
  phone: string;
  /**
   * 密码
   */
  password: string;

  /**
   * 个人信息
   */
  profile: {
    /**
     * 昵称
     */
    nickname: string;
    /**
     * 姓名
     */
    name: string;
    /**
     * 性别
     */
    gender: string;
    /**
     * 头像
     */
    avatar: string;
    /**
     * 固定电话
     */
    tel: string;
    /**
     * 出生日期
     */
    birthday: Date;
  };

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
   * 微信
   */
  wechat: {
    /**
     * openid
     */
    openid: string;
    /**
     * unionid
     */
    unionid: string;
    /**
     * 推荐人
     */
    recommender: string;
  };

  /**
   * 等级
   */
  level: {
    /**
     * 代码
     */
    code: string;
    /**
     * 级别来源
     */
    source: string;
  };

  /**
   * 会员积分
   */
  points: number;

  /**
   * 余额
   */
  balance: number;

  /**
   * 收入
   */
  income: number;

  /**
   * 支出
   */
  spending: number;
}
