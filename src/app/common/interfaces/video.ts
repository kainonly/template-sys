import { WpxVideo } from '@weplanx/ng/media';
import { WpxQuick } from '@weplanx/ng/quick';

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

export interface VideoTag extends WpxQuick {
  /**
   * 所属餐厅
   */
  shop_id: string;
}
