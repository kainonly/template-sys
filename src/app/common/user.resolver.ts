import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

import { User } from '@common/interfaces/user';
import { UsersService } from '@common/services/users.service';
import { AnyDto } from '@weplanx/ng';

export const userResolver: ResolveFn<AnyDto<User>> = (route: ActivatedRouteSnapshot) => {
  const users = inject(UsersService);
  return users.getUser();
};
