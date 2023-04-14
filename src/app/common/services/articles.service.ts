import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';

import { Article, ArticleValue } from '@common/interfaces/article';
import { R, WpxApi } from '@weplanx/ng';

@Injectable({ providedIn: 'root' })
export class ArticlesService extends WpxApi<Article> {
  protected override collection = 'articles';

  get(key: string): Observable<ArticleValue | undefined> {
    return this.exists({ key }).pipe(
      switchMap(v => (!v ? of(undefined) : this.findOne({ key }).pipe(map(v => v.value))))
    );
  }

  set(key: string, value: ArticleValue): Observable<R> {
    return this.exists({ key }).pipe(
      switchMap(v => (!v ? this.create({ key, value }) : this.update({ key }, { $set: { value } })))
    );
  }
}
