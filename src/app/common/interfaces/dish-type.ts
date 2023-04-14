export interface DishType {
  /**
   * 所属餐厅
   */
  restaurant_id: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 编码
   */
  sn: string;

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
