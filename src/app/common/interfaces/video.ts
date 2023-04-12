import { WpxVideo } from '@weplanx/ng/media';
import { Tag } from '@weplanx/ng/tags';

export interface Video extends WpxVideo {
  /**
   * 所属餐厅
   */
  restaurant_id: string;
  /**
   * 标签
   */
  tags?: string[];
}

export interface VideoTag extends Tag {
  /**
   * 所属餐厅
   */
  restaurant_id: string;
}
