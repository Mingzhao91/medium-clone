import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ArticleRequestInterface } from '../../shared/types/article-request';
import { ArticleInterface } from '../../shared/types/article.interface';

@Injectable()
export class CreateArticleService {
  http = inject(HttpClient);

  createArticle(
    articleRequest: ArticleRequestInterface
  ): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiUrl}/articles`;
    return this.http
      .post<ArticleRequestInterface>(fullUrl, articleRequest)
      .pipe(map((response) => response.article));
  }
}
