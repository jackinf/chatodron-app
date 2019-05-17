export interface ServiceResult<T> {
  payload: T;
  isSuccessful: boolean;
}

export class ErrorWrapper {
  title: string;
  description: string;

  constructor(title: string, description?: string) {
    this.title = title;
    this.description = description || '';
  }
}
