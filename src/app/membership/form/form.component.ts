import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Member } from '@common/interfaces/member';
import { MemberLevel } from '@common/interfaces/member-level';
import { MemberLevelsService } from '@common/services/member-levels.service';
import { MembersService } from '@common/services/members.service';
import { AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

export interface InputData {
  shopId: string;
  levelId?: string;
  doc?: AnyDto<Member>;
}

@Component({
  selector: 'app-membership-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  tips: any = {
    cardno: {
      default: {
        required: $localize`会员卡号不能为空`
      }
    }
  };
  levelItems: Array<AnyDto<MemberLevel>> = [];

  constructor(
    @Inject(NZ_MODAL_DATA) public data: InputData,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private members: MembersService,
    private levels: MemberLevelsService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      level_id: [this.data.levelId, [Validators.required]],
      cardno: [null, [Validators.required]],
      profile: this.fb.group({
        name: ['', []],
        phone: ['', []],
        gender: [0, []],
        avatar: [''],
        birthday: [null]
      }),
      valid_time: [[]],
      status: [true, [Validators.required]]
    });
    this.getLevels();
    if (this.data.doc) {
      this.form.patchValue(this.data.doc);
    }
  }

  getLevels(): void {
    this.levels
      .find(
        {
          shop_id: this.data.shopId
        },
        {
          pagesize: 1000,
          xfilter: { shop_id: 'oid' },
          sort: new Map([['weights', -1]])
        }
      )
      .subscribe(data => {
        this.levelItems = [...data];
      });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    if (!this.data.doc) {
      data.shop_id = this.data.shopId;
      data.balance = 0;
      data.points = 0;
      data.spending = 0;
      data.source = '运营端';
      this.members
        .create(data, {
          xdata: {
            shop_id: 'oid',
            level_id: 'oid'
          }
        })
        .subscribe(() => {
          this.message.success($localize`数据更新成功`);
          this.modalRef.triggerOk();
        });
    } else {
      this.members
        .updateById(
          this.data.doc._id,
          { $set: data },
          {
            xdata: {
              '$set.shop_id': 'oid',
              '$set.level_id': 'oid'
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
