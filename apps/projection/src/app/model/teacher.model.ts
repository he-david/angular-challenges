import { ParentModel } from './parent.model';

export const subject = [
  'Sciences',
  'History',
  'English',
  'Maths',
  'Sport',
] as const;
export type Subject = (typeof subject)[number];

export interface Teacher extends ParentModel {
  lastname: string;
  subject: Subject;
}
