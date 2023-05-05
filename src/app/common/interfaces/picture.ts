import { WpxPicture } from '@weplanx/ng/media';

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

export interface PictureTag {
  /**
   * 所属门店
   */
  shop_id: string;
  name: string;
}
