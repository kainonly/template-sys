import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

import { Area } from '@common/interfaces/area';
import { AreasService } from '@common/services/areas.service';
import { AnyDto } from '@weplanx/ng';

export const areaResolver: ResolveFn<AnyDto<Area>> = (route: ActivatedRouteSnapshot) => {
  const areas = inject(AreasService);
  const id = route.paramMap.get('areaId')!;
  return areas.findById(id);
};
