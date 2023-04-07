import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-integrated-cloud-tencent',
  templateUrl: './tencent.component.html'
})
export class TencentComponent implements OnInit {
  form!: FormGroup;
  tips: any = {
    tencent_secret_id: {
      default: {
        required: $localize`SecretId 不能为空`
      }
    },
    tencent_secret_key: {
      default: {
        required: $localize`SecretKey 不能为空`
      }
    }
  };

  constructor(
    @Inject(NZ_MODAL_DATA)
    public values: Record<string, any>,
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      tencent_secret_id: [null, [Validators.required]],
      tencent_secret_key: [null, [Validators.required]]
    });

    this.form.patchValue({
      tencent_secret_id: this.values['tencent_secret_id']
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    this.wpx.setValues(data).subscribe(() => {
      this.message.success($localize`数据更新成功`);
      this.modalRef.triggerOk();
    });
  }
}
