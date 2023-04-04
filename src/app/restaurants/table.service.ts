import { Injectable } from '@angular/core';

import { Table } from '@common/interfaces/table';
import { WpxApi } from '@weplanx/ng';

@Injectable()
export class TableService extends WpxApi<Table> {
  protected override collection = 'tables';
}
