import { ParentModel } from './parent.model';

export interface City extends ParentModel {
  country: string;
}
