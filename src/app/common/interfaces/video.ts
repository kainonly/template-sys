import { WpxVideo } from '@weplanx/ng/media';

export interface Video extends WpxVideo {
  /**
   * 所属餐厅
   */
  shop_id: string;
  /**
   * 标签
   */
  tags?: string[];
}

export interface VideoTag {
  /**
   * 所属餐厅
   */
  shop_id: string;
  name: string;
}
