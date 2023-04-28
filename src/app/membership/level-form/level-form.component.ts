import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MemberLevel } from '@common/interfaces/member-level';
import { MemberLevelsService } from '@common/services/member-levels.service';
import { AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

export interface LevelInputData {
  shopId: string;
  doc?: AnyDto<MemberLevel>;
}

@Component({
  selector: 'app-membership-level-form',
  templateUrl: './level-form.component.html'
})
export class LevelFormComponent implements OnInit {
  form!: FormGroup;
  tips = {
    name: {
      default: {
        required: $localize`等级名称不能为空`
      }
    },
    weights: {
      default: {
        required: $localize`权重不能为空`
      }
    },
    initial: {
      default: {
        required: $localize`初始积分不能为空`
      }
    },
    upgrade: {
      default: {
        required: $localize`等级积分不能为空`
      }
    },
    earn: {
      default: {
        required: $localize`消费积分不能为空`
      }
    },
    discount: {
      default: {
        required: $localize`折扣不能为空`
      }
    }
  };

  constructor(
    @Inject(NZ_MODAL_DATA) public data: LevelInputData,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private levels: MemberLevelsService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      weights: [0, [Validators.required]],
      points: this.fb.group({
        initial: [0, [Validators.required]],
        upgrade: [0, [Validators.required]],
        earn: [0, [Validators.required]]
      }),
      discount: [0, [Validators.required]]
    });
    if (this.data.doc) {
      this.form.patchValue(this.data.doc);
    }
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    if (!this.data.doc) {
      data.shop_id = this.data.shopId;
      this.levels
        .create(data, {
          xdata: {
            shop_id: 'oid'
          }
        })
        .subscribe(() => {
          this.message.success($localize`数据更新成功`);
          this.modalRef.triggerOk();
        });
    } else {
      this.levels
        .updateById(
          this.data.doc._id,
          {
            $set: data
          },
          {
            xdata: {
              '$set.shop_id': 'oid'
            }
          }
        )
        .subscribe(() => {
          this.message.success($localize`数据更新成功`);
          this.modalRef.triggerOk();
        });
    }
  }
}
