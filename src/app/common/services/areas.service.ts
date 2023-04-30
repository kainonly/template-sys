import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Area, AreaDict } from '@common/interfaces/area';
import { AnyDto, WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class AreasService extends WpxApi<Area> {
  protected override collection = 'areas';
  dict: BehaviorSubject<AreaDict> = new BehaviorSubject({});

  set(v: AreaDict): void {
    this.dict.next(v);
  }

  get(id: string): Observable<AnyDto<Area>> {
    return this.dict.pipe(map(v => v[id]));
  }
}
