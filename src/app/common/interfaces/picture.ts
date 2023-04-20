import { WpxPicture } from '@weplanx/ng/media';
import { WpxQuick } from '@weplanx/ng/quick';

export interface Picture extends WpxPicture {
  /**
   * 所属门店
   */
  shop_id: string;
  /**
   * 标签
   */
  tags?: string[];
}

export interface PictureTag extends WpxQuick {
  /**
   * 所属门店
   */
  shop_id: string;
}
