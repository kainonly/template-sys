import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppService } from '@app';

export const appGuard: CanActivateFn = (): Observable<boolean> => {
  const router = inject(Router);
  const app = inject(AppService);
  return app.verify().pipe(
    map(valid => {
      if (!valid) {
        app.user = undefined;
        router.navigateByUrl('/login').then(_ => {});
      }
      app.refreshToken();
      return true;
    })
  );
};
