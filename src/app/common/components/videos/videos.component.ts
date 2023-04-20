import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { AppService } from '@app';
import { Video, VideoTag } from '@common/interfaces/video';
import { VideoTagsService } from '@common/services/video-tags.service';
import { AnyDto, WpxData, XFilter } from '@weplanx/ng';
import { VideosService, WpxMediaComponent, WpxMediaDataSource } from '@weplanx/ng/media';
import { WpxQuickComponent } from '@weplanx/ng/quick';
import { Transport } from '@weplanx/ng/upload';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent, InputData } from './form/form.component';
import { TagFormComponent, TagInputData } from './tag-form/tag-form.component';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html'
})
export class VideosComponent implements OnInit {
  @ViewChild('uploadRef', { static: true }) uploadRef!: TemplateRef<any>;
  @ViewChild('tagSearchRef', { static: true }) tagSearchRef!: TemplateRef<any>;
  @ViewChild('searchRef', { static: true }) searchRef!: TemplateRef<any>;
  @ViewChild(WpxMediaComponent, { static: true }) mediaRef!: WpxMediaComponent;
  @ViewChild(WpxQuickComponent, { static: true }) tagsRef!: WpxQuickComponent;

  ds?: WpxMediaDataSource;
  searchText = '';

  tagItems: Array<AnyDto<VideoTag>> = [];
  tagIds: string[] = [];

  constructor(
    public app: AppService,
    private videos: VideosService,
    public tags: VideoTagsService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.getTags();
    this.ds = new WpxMediaDataSource(this.videos);
    this.ds.filter = { shop_id: this.app.shopId };
    this.ds.xfilter = { 'tags.$in': 'oids', shop_id: 'oid' };
  }

  getData(refresh = false): void {
    if (!this.ds) {
      return;
    }
    this.ds.filter = { shop_id: this.app.shopId };
    if (this.searchText) {
      this.ds.filter['name'] = { $regex: this.searchText };
    }
    if (this.tagIds.length !== 0) {
      this.ds.filter['tags'] = { $in: this.tagIds };
    }
    this.ds.fetch(refresh);
  }

  getTags(name?: string): void {
    const filter: Record<string, any> = { shop_id: this.app.shopId };
    const xfilter: Record<string, XFilter> = { shop_id: 'oid' };
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
      shop_id: this.app.shopId,
      name: v.name,
      url: Reflect.get(v.file.originFileObj!, 'key')
    }));
    this.videos
      .bulkCreate(docs, {
        xdata: { shop_id: 'oid' }
      })
      .subscribe(v => {
        this.getData(true);
      });
  }

  tagFilter = (ds: WpxData<AnyDto<VideoTag>>): void => {
    ds.xfilter = { shop_id: 'oid' };
    ds.filter.shop_id = this.app.shopId;
  };

  tagForm = (doc?: AnyDto<VideoTag>): void => {
    this.modal.create<TagFormComponent, TagInputData>({
      nzTitle: !doc ? $localize`新增` : $localize`编辑`,
      nzContent: TagFormComponent,
      nzData: {
        shopId: this.app.shopId,
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
    this.modal.create<FormComponent, InputData>({
      nzTitle: $localize`编辑`,
      nzContent: FormComponent,
      nzData: {
        shopId: this.app.shopId,
        doc
      }
    });
  };
}
