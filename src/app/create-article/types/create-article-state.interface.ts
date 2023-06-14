import { BackendErrorsInterface } from '../../shared/types/backend-errors.interface';

export interface CreateArticleStateInface {
  isSubmitting: boolean;
  validationErrors: BackendErrorsInterface | null;
}
