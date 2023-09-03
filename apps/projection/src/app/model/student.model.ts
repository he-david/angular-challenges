import { ParentModel } from './parent.model';
import { Teacher } from './teacher.model';

export interface Student extends ParentModel {
  lastname: string;
  mainTeacher: Teacher;
  school: string;
}
