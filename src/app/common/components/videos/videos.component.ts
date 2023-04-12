import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { Restaurant } from '@common/interfaces/restaurant';
import { Video, VideoTag } from '@common/interfaces/video';
import { RestaurantsService } from '@common/services/restaurants.service';
import { VideoTagsService } from '@common/services/video-tags.service';
import { AnyDto, WpxData, XFilter } from '@weplanx/ng';
import { VideosService, WpxMediaComponent, WpxMediaDataSource } from '@weplanx/ng/media';
import { Tag, WpxTagsComponent } from '@weplanx/ng/tags';
import { Transport } from '@weplanx/ng/upload';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent, FormData } from './form/form.component';
import { TagFormComponent, TagFormData } from './tag-form/tag-form.component';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html'
})
export class VideosComponent implements OnInit {
  @ViewChild('uploadRef', { static: true }) uploadRef!: TemplateRef<any>;
  @ViewChild('restaurantSearchRef', { static: true }) restaurantSearchRef!: TemplateRef<any>;
  @ViewChild('tagSearchRef', { static: true }) tagSearchRef!: TemplateRef<any>;
  @ViewChild('searchRef', { static: true }) searchRef!: TemplateRef<any>;
  @ViewChild(WpxMediaComponent, { static: true }) mediaRef!: WpxMediaComponent;
  @ViewChild(WpxTagsComponent, { static: true }) tagsRef!: WpxTagsComponent;

  ds?: WpxMediaDataSource;
  searchText = '';

  restaurantItems: Array<AnyDto<Restaurant>> = [];
  restaurantId = '';

  tagItems: Array<AnyDto<Tag>> = [];
  tagIds: string[] = [];

  constructor(
    private restaurants: RestaurantsService,
    private videos: VideosService,
    public tags: VideoTagsService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.restaurants.getItems().subscribe(data => {
      this.restaurantItems = [...data];
      if (!this.restaurantId) {
        this.restaurantId = this.restaurantItems[0]._id;
      }
      this.getTags();
      this.ds = new WpxMediaDataSource(this.videos);
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
    const docs: Video[] = data.map(v => ({
      restaurant_id: this.restaurantId,
      name: v.name,
      url: Reflect.get(v.file.originFileObj!, 'key')
    }));
    this.videos
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

  tagForm = (doc?: AnyDto<VideoTag>): void => {
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
