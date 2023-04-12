import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Video } from '@common/interfaces/video';
import { PictureTagsService } from '@common/services/picture-tags.service';
import { VideoTagsService } from '@common/services/video-tags.service';
import { AnyDto } from '@weplanx/ng';
import { PicturesService, VideosService } from '@weplanx/ng/media';
import { Tag } from '@weplanx/ng/tags';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

export interface FormData {
  restaurant_id: string;
  doc: AnyDto<Video>;
}

@Component({
  selector: 'app-pictures-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  tips: any = {
    name: {
      default: {
        required: $localize`名称不能为空`
      }
    }
  };
  tagItems: Array<AnyDto<Tag>> = [];

  constructor(
    @Inject(NZ_MODAL_DATA) public data: FormData,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private pictures: PicturesService,
    private tags: PictureTagsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      tags: [[]]
    });
    this.getTags();
    this.form.patchValue(this.data.doc);
  }

  getTags(name?: string): void {
    const filter: Record<string, any> = { restaurant_id: this.data.restaurant_id };
    if (name) {
      filter['name'] = { $regex: name };
    }
    this.tags
      .find(filter, {
        pagesize: 1000,
        xfilter: { restaurant_id: 'oid' }
      })
      .subscribe(data => {
        this.tagItems = [...data];
      });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    this.pictures
      .updateById(
        this.data.doc._id,
        {
          $set: data
        },
        {
          xdata: { '$set.tags': 'oids' }
        }
      )
      .subscribe(_ => {
        this.data.doc.name = data.name;
        this.data.doc.tags = data.tags;
        this.message.success($localize`数据更新完成`);
        this.modalRef.triggerOk();
      });
  }
}
