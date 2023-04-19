import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

export interface IpListData {
  type: 'ip_whitelist' | 'ip_blacklist';
  ip: string[];
}

@Component({
  selector: 'app-settings-system-security-ip-list',
  templateUrl: './ip-list.component.html'
})
export class IpListComponent implements OnInit {
  form!: FormGroup;

  constructor(
    @Inject(NZ_MODAL_DATA)
    public data: IpListData,
    public wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      [this.data.type]: this.fb.array([])
    });
    this.data.ip.forEach(v => {
      this.append(v);
    });
  }

  get list(): FormArray {
    return this.form?.get(this.data.type) as FormArray;
  }

  append(value?: string): void {
    this.list.push(
      this.fb.control(value, [
        Validators.required,
        Validators.pattern(
          /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
        )
      ])
    );
  }

  remove(index: number): void {
    this.list.removeAt(index);
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
