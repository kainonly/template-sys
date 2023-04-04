import { AnyDto } from '@weplanx/ng';

/**
 * 区位
 */
export interface Area {
  /**
   * 所属餐厅
   */
  restaurant_id: string;
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
   * 状态
   */
  status: boolean;
}

export type RestaurantAreas = Record<string, Array<AnyDto<Area>>>;
export type AreaDict = Record<string, AnyDto<Area>>;
