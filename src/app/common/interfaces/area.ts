import { AnyDto } from '@weplanx/ng';

/**
 * 区位
 */
export interface Area {
  /**
   * 所属门店
   */
  shop_id: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 茶水设置
   */
  tea?: {
    /**
     * 费用
     */
    fee: number;
    /**
     * 服务费率
     */
    service: number;
    /**
     * 税率
     */
    tax: number;
  };
  /**
   * 排序
   */
  sort: number;
  /**
   * 状态
   */
  status: boolean;
}

export type AreaDict = Record<string, AnyDto<Area>>;
