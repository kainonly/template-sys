import { Injectable } from '@angular/core';

import { Table } from '@common/interfaces/table';
import { WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class TablesService extends WpxApi<Table> {
  protected override collection = 'tables';
}
