/**
 * 门店
 */
export interface Shop {
  /**
   * 名称
   */
  name: string;
  /**
   * Logo
   */
  logo: string;
  /**
   * 第三方编码
   */
  sn: string;
  /**
   * 负责人
   */
  principal: string;
  /**
   * 联系电话
   */
  tel: string;
  /**
   * 地址
   */
  address: string;
  /**
   * 公告
   */
  bulletin: string;
  /**
   * 宣传、媒体、环境
   */
  pictures?: string[];
  /**
   * 最低限度
   */
  minimum: {
    /**
     * 开销
     */
    spending: number;
    /**
     * 配送
     */
    delivery: number;
  };
  /**
   * 营业状态
   */
  status: boolean;
}
