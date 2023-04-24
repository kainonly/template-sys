import { Component, OnInit, ViewChild } from '@angular/core';

import { AppService } from '@app';
import { DishType } from '@common/interfaces/dish-type';
import { MemberLevel } from '@common/interfaces/member-level';
import { MemberLevelsService } from '@common/services/member-levels.service';
import { AnyDto } from '@weplanx/ng';
import { WpxQuickComponent, WpxQuickFormData } from '@weplanx/ng/quick';
import { NzModalService } from 'ng-zorro-antd/modal';

import { LevelFormComponent } from './level-form/level-form.component';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html'
})
export class MembershipComponent implements OnInit {
  @ViewChild(WpxQuickComponent, { static: true }) levelsRef!: WpxQuickComponent;
  searchText = '';
  levelItems: Array<AnyDto<MemberLevel>> = [];

  constructor(public app: AppService, public levels: MemberLevelsService, private modal: NzModalService) {}

  ngOnInit(): void {
    this.getLevels();
  }

  getLevels(): void {
    this.levels.find({}).subscribe(data => {
      this.levelItems = [...data];
    });
  }

  levelForm = (doc?: AnyDto<DishType>): void => {
    this.modal.create<LevelFormComponent, WpxQuickFormData>({
      nzTitle: !doc ? $localize`新增` : $localize`编辑`,
      nzContent: LevelFormComponent,
      nzData: {
        doc: doc,
        api: this.levels
      },
      nzOnOk: () => {
        this.levelsRef.getData(true);
        this.getLevels();
      }
    });
  };
}
