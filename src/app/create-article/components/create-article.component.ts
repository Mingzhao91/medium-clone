import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleFormValuesInterface } from '../../shared/components/article-form/types/article-form-values.interface';
import { ArticleFormComponent } from '../../shared/components/article-form/article-form.component';

@Component({
  selector: 'mc-create-article',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent],
  templateUrl: './create-article.component.html',
})
export class CreateArticleComponent {
  initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

  onSubmit(articleFormValues: ArticleFormValuesInterface): void {
    console.log('onSubmit in create article', articleFormValues);
  }
}
