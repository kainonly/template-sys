import { WpxPicture } from '@weplanx/ng/media';
import { WpxQuick } from '@weplanx/ng/quick';

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

export interface PictureTag extends WpxQuick {
  /**
   * 所属餐厅
   */
  restaurant_id: string;
}
