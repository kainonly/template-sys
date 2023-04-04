import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Area, AreaDict } from '@common/interfaces/area';
import { AnyDto, WpxApi } from '@weplanx/ng';

@Injectable()
export class AreasService extends WpxApi<Area> {
  protected override collection = 'areas';
  private dict: BehaviorSubject<AreaDict> = new BehaviorSubject({});

  set(v: AreaDict): void {
    this.dict.next(v);
  }

  get(id: string): Observable<AnyDto<Area>> {
    return this.dict.pipe(map(v => v[id]));
  }

  values(): Observable<Array<AnyDto<Area>>> {
    return this.dict.pipe(map(v => Object.values(v)));
  }
}
