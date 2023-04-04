import { AnyDto } from '@weplanx/ng';

/**
 * 餐厅
 */
export interface Restaurant {
  /**
   * 餐厅名称
   */
  name: string;
  /**
   * 编码
   */
  code: string;
  /**
   * 服务电话
   */
  tel: string;
  /**
   * 位置
   */
  location: string;
  /**
   * 描述
   */
  description: string;
  /**
   * 品牌 Logo
   */
  logo: string;
  /**
   * 宣传、媒体、环境
   */
  pictures?: string[];
  /**
   * 口味
   */
  flavors?: string[];
  /**
   * 启用
   */
  enabled: {
    /**
     * 最低限额消费
     */
    minimum_spending: boolean;
    /**
     * 小程序端微信支付
     */
    mini_wechatpay: boolean;
    /**
     * 茶位费
     */
    tea: boolean;
  };
  /**
   * 状态
   */
  status: boolean;
}

export type RestaurantDict = Record<string, AnyDto<Restaurant>>;
