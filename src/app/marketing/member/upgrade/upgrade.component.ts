import { Component, OnInit } from '@angular/core';

import { ArticleValue } from '@common/interfaces/article';
import { ArticlesService } from '@common/services/articles.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-marketing-member-upgrade',
  templateUrl: './upgrade.component.html'
})
export class UpgradeComponent implements OnInit {
  private key = 'member.upgrade';
  value?: ArticleValue;

  constructor(private articles: ArticlesService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.articles.get(this.key).subscribe(value => {
      this.value = value;
    });
  }

  update(): void {
    this.articles.set(this.key, this.value!).subscribe(() => {
      this.message.success($localize`数据更新成功`);
    });
  }
}
