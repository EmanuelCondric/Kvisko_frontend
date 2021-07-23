import { ErrorModel } from './error.model';

export class RestResponse {
    message!: string;
    uniqueId!: string;
    createdDatetime!: Date;
    error!: ErrorModel;
}