import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { FormComponent, FormData } from '@common/components/pictures/form/form.component';
import { TagFormComponent, TagFormData } from '@common/components/pictures/tag-form/tag-form.component';
import { Picture, PictureTag } from '@common/interfaces/picture';
import { Restaurant } from '@common/interfaces/restaurant';
import { Video, VideoTag } from '@common/interfaces/video';
import { PictureTagsService } from '@common/services/picture-tags.service';
import { RestaurantsService } from '@common/services/restaurants.service';
import { AnyDto, WpxData, XFilter } from '@weplanx/ng';
import { PicturesService, WpxMediaComponent, WpxMediaDataSource } from '@weplanx/ng/media';
import { WpxQuickComponent } from '@weplanx/ng/quick';
import { Transport } from '@weplanx/ng/upload';
import { NzModalService } from 'ng-zorro-antd/modal';

export interface PicturesData {
  height?: string;
}

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html'
})
export class PicturesComponent implements OnInit {
  @ViewChild('uploadRef', { static: true }) uploadRef!: TemplateRef<any>;
  @ViewChild('restaurantSearchRef', { static: true }) restaurantSearchRef!: TemplateRef<any>;
  @ViewChild('tagSearchRef', { static: true }) tagSearchRef!: TemplateRef<any>;
  @ViewChild('searchRef', { static: true }) searchRef!: TemplateRef<any>;
  @ViewChild(WpxMediaComponent, { static: true }) mediaRef!: WpxMediaComponent;
  @ViewChild(WpxQuickComponent, { static: true }) tagsRef!: WpxQuickComponent;

  ds?: WpxMediaDataSource;
  searchText = '';

  restaurantItems: Array<AnyDto<Restaurant>> = [];
  restaurantId = '';

  tagItems: Array<AnyDto<PictureTag>> = [];
  tagIds: string[] = [];

  constructor(
    private restaurants: RestaurantsService,
    private pictures: PicturesService,
    public tags: PictureTagsService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.restaurants.getItems().subscribe(data => {
      this.restaurantItems = [...data];
      if (!this.restaurantId) {
        this.restaurantId = this.restaurantItems[0]._id;
      }
      this.getTags();
      this.ds = new WpxMediaDataSource(this.pictures);
      this.ds.filter = { restaurant_id: this.restaurantId };
      this.ds.xfilter = { 'tags.$in': 'oids', restaurant_id: 'oid' };
    });
  }

  restaurantChange(): void {
    this.getData(true);
    this.getTags();
  }

  getData(refresh = false): void {
    if (!this.ds) {
      return;
    }
    this.ds.filter = { restaurant_id: this.restaurantId };
    if (this.searchText) {
      this.ds.filter['name'] = { $regex: this.searchText };
    }
    if (this.tagIds.length !== 0) {
      this.ds.filter['tags'] = { $in: this.tagIds };
    }
    this.ds.fetch(refresh);
  }

  getTags(name?: string): void {
    const filter: Record<string, any> = { restaurant_id: this.restaurantId };
    const xfilter: Record<string, XFilter> = { restaurant_id: 'oid' };
    if (name) {
      filter['name'] = { $regex: name };
    }
    this.tags.find(filter, { pagesize: 1000, xfilter }).subscribe(data => {
      this.tagItems = [...data];
    });
  }

  clear(): void {
    this.searchText = '';
    this.getData(true);
  }

  upload(data: Transport[]): void {
    const docs: Picture[] = data.map(v => ({
      restaurant_id: this.restaurantId,
      name: v.name,
      url: Reflect.get(v.file.originFileObj!, 'key')
    }));
    this.pictures
      .bulkCreate(docs, {
        xdata: { restaurant_id: 'oid' }
      })
      .subscribe(v => {
        this.getData(true);
      });
  }

  tagFilter = (ds: WpxData<AnyDto<VideoTag>>): void => {
    ds.xfilter = { restaurant_id: 'oid' };
    ds.filter.restaurant_id = this.restaurantId;
  };

  tagForm = (doc?: AnyDto<Picture>): void => {
    this.modal.create<TagFormComponent, TagFormData>({
      nzTitle: !doc ? $localize`新增` : $localize`编辑`,
      nzContent: TagFormComponent,
      nzData: {
        restaurant_id: this.restaurantId,
        doc: doc,
        api: this.tags
      },
      nzOnOk: () => {
        this.tagsRef.getData(true);
        this.getTags();
      }
    });
  };

  form = (doc: AnyDto<Video>): void => {
    this.modal.create<FormComponent, FormData>({
      nzTitle: $localize`编辑`,
      nzContent: FormComponent,
      nzData: {
        restaurant_id: this.restaurantId,
        doc
      }
    });
  };
}
