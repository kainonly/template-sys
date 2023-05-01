import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-settings-system-integrated-security-pwd-strategy',
  templateUrl: './pwd-strategy.component.html',
  styleUrls: ['./pwd-strategy.component.scss']
})
export class PwdStrategyComponent implements OnInit {
  form!: FormGroup;

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
      pwd_strategy: [0, [Validators.required]]
    });
    this.form.patchValue(this.values);
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
