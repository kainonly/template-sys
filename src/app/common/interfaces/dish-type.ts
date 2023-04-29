import { AnyDto } from '@weplanx/ng';

export interface DishType {
  /**
   * 所属餐厅
   */
  shop_id: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 编码
   */
  sn: string;
  /**
   * 使用范围
   */
  scopes: number[];
  /**
   * 时段
   */
  period: {
    /**
     * 启用
     */
    enabled: boolean;
    /**
     * 规则
     */
    rules: DishTypePeriodRule[];
  };
  /**
   * 排序
   */
  sort: number;
}

export interface DishTypePeriodRule {
  /**
   * 时段名称
   */
  name: string;
  /**
   * 开始日期-结束日期
   */
  value: Date[];
}

export type DishTypeDict = Record<string, AnyDto<DishType>>;
