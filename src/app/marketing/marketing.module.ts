import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { IndexComponent } from './index/index.component';
import { MarketingComponent } from './marketing.component';

const routes: Routes = [
  {
    path: '',
    component: MarketingComponent,
    children: [
      {
        path: 'all',
        component: IndexComponent,
        data: {
          breadcrumb: $localize`全部方案`
        }
      },
      {
        path: ':id',
        component: IndexComponent,
        data: {
          breadcrumb: $localize`折扣方案`
        }
      },
      { path: '', redirectTo: 'all', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [MarketingComponent, IndexComponent]
})
export class MarketingModule {}
