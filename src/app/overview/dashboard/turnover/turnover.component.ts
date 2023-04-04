import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Column } from '@antv/g2plot';

@Component({
  selector: 'app-overview-dashboard-turnover',
  template: `
    <ng-template #titleTpl><b i18n>营业额统计</b></ng-template>
    <nz-card [nzTitle]="titleTpl">
      <div #ref></div>
    </nz-card>
  `
})
export class TurnoverComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ref') ref!: ElementRef;
  private plot?: Column;

  constructor() {}

  ngAfterViewInit(): void {
    this.plot = new Column(this.ref.nativeElement, {
      height: 300,
      data: [
        { time: '2022年4月', value: 7000, restaurant: '唐工中餐厅' },
        { time: '2022年5月', value: 5000, restaurant: '唐工中餐厅' },
        { time: '2022年6月', value: 5000, restaurant: '唐工中餐厅' },
        { time: '2022年7月', value: 9000, restaurant: '唐工中餐厅' },
        { time: '2022年8月', value: 8000, restaurant: '唐工中餐厅' },
        { time: '2022年9月', value: 3000, restaurant: '唐工中餐厅' },
        { time: '2022年10月', value: 4000, restaurant: '唐工中餐厅' },
        { time: '2022年11月', value: 8000, restaurant: '唐工中餐厅' },
        { time: '2022年12月', value: 3000, restaurant: '唐工中餐厅' },
        { time: '2023年1月', value: 6000, restaurant: '唐工中餐厅' },
        { time: '2023年2月', value: 4000, restaurant: '唐工中餐厅' },
        { time: '2023年3月', value: 4500, restaurant: '唐工中餐厅' },

        { time: '2022年4月', value: 800, restaurant: '大堂吧' },
        { time: '2022年5月', value: 900, restaurant: '大堂吧' },
        { time: '2022年6月', value: 400, restaurant: '大堂吧' },
        { time: '2022年7月', value: 500, restaurant: '大堂吧' },
        { time: '2022年8月', value: 800, restaurant: '大堂吧' },
        { time: '2022年9月', value: 300, restaurant: '大堂吧' },
        { time: '2022年10月', value: 400, restaurant: '大堂吧' },
        { time: '2022年11月', value: 800, restaurant: '大堂吧' },
        { time: '2022年12月', value: 300, restaurant: '大堂吧' },
        { time: '2023年1月', value: 600, restaurant: '大堂吧' },
        { time: '2023年2月', value: 400, restaurant: '大堂吧' },
        { time: '2023年3月', value: 450, restaurant: '大堂吧' },

        { time: '2022年4月', value: 2000, restaurant: '海逸阁西餐厅' },
        { time: '2022年5月', value: 9000, restaurant: '海逸阁西餐厅' },
        { time: '2022年6月', value: 4500, restaurant: '海逸阁西餐厅' },
        { time: '2022年7月', value: 3500, restaurant: '海逸阁西餐厅' },
        { time: '2022年8月', value: 6500, restaurant: '海逸阁西餐厅' },
        { time: '2022年9月', value: 3500, restaurant: '海逸阁西餐厅' },
        { time: '2022年10月', value: 4400, restaurant: '海逸阁西餐厅' },
        { time: '2022年11月', value: 6000, restaurant: '海逸阁西餐厅' },
        { time: '2022年12月', value: 3200, restaurant: '海逸阁西餐厅' },
        { time: '2023年1月', value: 6500, restaurant: '海逸阁西餐厅' },
        { time: '2023年2月', value: 4500, restaurant: '海逸阁西餐厅' },
        { time: '2023年3月', value: 5450, restaurant: '海逸阁西餐厅' }
      ],
      xField: 'time',
      yField: 'value',
      seriesField: 'restaurant',
      isGroup: true,
      columnStyle: {
        radius: [20, 20, 0, 0]
      }
    });
    this.plot.render();
  }

  ngOnDestroy(): void {
    this.plot?.destroy();
  }
}
