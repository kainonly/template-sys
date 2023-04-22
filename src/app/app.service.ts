import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Observable, Subject, Subscription, switchMap, timer } from 'rxjs';
import { map } from 'rxjs/operators';

import { KeyValue } from '@common/interfaces/type';
import { SetUserDto, User } from '@common/interfaces/user';
import { AnyDto, UploadOption, WpxService } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class AppService {
  user?: AnyDto<User>;
  shopId?: string;

  readonly changes: Subject<KeyValue> = new Subject();
  private refreshTokenSubscription?: Subscription;

  constructor(@Inject(LOCALE_ID) private locale: string, private http: HttpClient, private wpx: WpxService) {}

  emit(v: KeyValue): void {
    this.changes.next(v);
  }

  ping(): Observable<any> {
    return this.http.get('');
  }

  login(data: { identity: string; password: string }): Observable<any> {
    return this.http.post('login', data);
  }

  verify(): Observable<boolean> {
    return this.http.get('verify', { observe: 'response' }).pipe(map(v => v.status === 200));
  }

  autoRefreshToken(): void {
    this.stopRefreshToken();
    this.refreshTokenSubscription = timer(0, 3200 * 1000)
      .pipe(
        switchMap(() => this.http.get<any>('code')),
        switchMap(v =>
          this.http.post('refresh_token', {
            code: v.code
          })
        )
      )
      .subscribe(() => {
        console.debug('refresh_token');
      });
  }

  stopRefreshToken(): void {
    this.refreshTokenSubscription?.unsubscribe();
  }

  logout(): Observable<any> {
    this.stopRefreshToken();
    return this.http.post('logout', {});
  }

  getUpload(): Observable<UploadOption> {
    return this.http
      .get<UploadOption>('options', {
        params: { type: 'upload' }
      })
      .pipe(
        map(v => {
          this.wpx.upload.next(v);
          this.wpx.upload.complete();
          return v;
        })
      );
  }

  getUser(): Observable<AnyDto<User>> {
    return this.http.get<AnyDto<User>>('user').pipe(
      map(v => {
        this.user = v;
        return v;
      })
    );
  }

  setUser(data: SetUserDto): Observable<any> {
    return this.http.post('user', data);
  }

  // unsetUser(data: UnsetUserDto): Observable<any> {
  //   return this.http.delete(`user/${data}`);
  // }

  resetUser(data: any): Observable<any> {
    return this.http.post('user/reset', data);
  }

  getValues(keys?: string[]): Observable<any> {
    const params = new HttpParams();
    if (keys) {
      params.set('keys', keys.join(','));
    }
    return this.http.get('values', { params });
  }

  setValues(data: Record<string, any>): Observable<any> {
    return this.http.post('values', data);
  }

  deleteValue(key: string): Observable<any> {
    return this.http.delete(`values/${key}`);
  }
}
