import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { ArticleInterface } from '../../../../shared/types/article.interface';
import { ArticleRequestInterface } from '../../../../shared/types/article-request';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddToFavoritesService {
  http = inject(HttpClient);

  getUrl(slug: string): string {
    return `${environment.apiUrl}/articles/${slug}/favorite`;
  }

  getArticle(response: ArticleRequestInterface): ArticleInterface {
    return response.article;
  }

  addToFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug);
    return this.http
      .post<ArticleRequestInterface>(url, {})
      .pipe(map(this.getArticle));
  }

  removeFromFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug);
    return this.http
      .delete<ArticleRequestInterface>(url)
      .pipe(map(this.getArticle));
  }
}
