import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

import { Shop } from '@common/interfaces/shop';
import { ShopsService } from '@common/services/shops.service';
import { AnyDto } from '@weplanx/ng';

export const shopResolver: ResolveFn<AnyDto<Shop>> = (route: ActivatedRouteSnapshot) => {
  const shops = inject(ShopsService);
  const id = route.paramMap.get('id')!;
  return shops.findById(id);
};
