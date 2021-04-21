import { Model, model, property } from '@loopback/repository';

@model()
export class GenericError extends Model {
  @property({
    type: 'string',
    jsonSchema: {
      example: 'Error',
    },
  })
  message?: string;

  constructor(data?: Partial<GenericError>) {
    super(data);
  }
}
