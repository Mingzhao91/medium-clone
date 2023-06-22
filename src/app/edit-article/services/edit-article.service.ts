import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ArticleRequestInterface } from '../../shared/types/article-request';
import { ArticleInterface } from '../../shared/types/article.interface';

@Injectable()
export class EditArticleService {
  http = inject(HttpClient);

  updateArticle(
    slug: string,
    articleRequest: ArticleRequestInterface
  ): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`;
    return this.http
      .put<ArticleRequestInterface>(fullUrl, articleRequest)
      .pipe(map((response) => response.article));
  }
}
