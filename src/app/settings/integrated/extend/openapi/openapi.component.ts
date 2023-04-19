import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-settings-integrated-extend-openapi',
  templateUrl: './openapi.component.html'
})
export class OpenapiComponent implements OnInit {
  form!: FormGroup;
  tips: any = {
    openapi_url: {
      default: {
        required: $localize`地址不能为空`
      }
    },
    openapi_key: {
      default: {
        required: $localize`应用 Key 不能为空`
      }
    },
    openapi_secret: {
      default: {
        required: $localize`应用密钥不能为空`
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
      openapi_url: [null, [Validators.required]],
      openapi_key: [null, [Validators.required]],
      openapi_secret: [null, [Validators.required]]
    });
    this.form.patchValue({
      openapi_url: this.values['openapi_url'],
      openapi_key: this.values['openapi_key']
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
