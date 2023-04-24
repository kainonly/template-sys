import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Member } from '@common/interfaces/member';
import { MembersService } from '@common/services/members.service';
import { AnyDto, WpxData } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-membership-members',
  templateUrl: './members.component.html'
})
export class MembersComponent implements OnInit {
  ds: WpxData<AnyDto<Member>> = new WpxData<AnyDto<Member>>();
  searchText = '';
  levelId?: string;

  constructor(
    private members: MembersService,
    private modal: NzModalService,
    private message: NzMessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ds.xfilter = { level_id: 'oid' };
    this.route.params.subscribe(data => {
      this.levelId = data['id'];
      this.getData(true);
    });
  }

  getData(refresh = false): void {
    if (this.levelId) {
      this.ds.filter = { level_id: this.levelId };
    }
    this.members.pages(this.ds, refresh).subscribe(() => {});
  }

  submitSearch(): void {
    if (!this.searchText) {
      this.ds.filter = { level_id: this.levelId };
    } else {
      this.ds.filter = {
        name: { $regex: this.searchText }
      };
    }
    this.getData(true);
  }

  clearSearch(): void {
    this.searchText = '';
    this.getData(true);
  }
}
