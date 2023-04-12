import { WpxPicture } from '@weplanx/ng/media';
import { Tag } from '@weplanx/ng/tags';

export interface Picture extends WpxPicture {
  /**
   * 所属餐厅
   */
  restaurant_id: string;
  /**
   * 标签
   */
  tags?: string[];
}

export interface PictureTag extends Tag {
  /**
   * 所属餐厅
   */
  restaurant_id: string;
}
