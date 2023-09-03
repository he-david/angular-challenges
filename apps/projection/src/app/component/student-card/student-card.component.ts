import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { Observable, Subscription } from 'rxjs';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-student-card',
  template: ` <app-card
    [list]="students$ | async"
    (addNewItem)="addNewStudent()"
    class="bg-light-green"
    ><img src="assets/img/student.webp" width="200px" />
    <ng-template #rowRef let-student="item">
      <app-list-item (delete)="deleteStudent(student.id)">
        {{ student.name }}
      </app-list-item>
    </ng-template>
  </app-card>`,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit, OnDestroy {
  students$: Observable<Student[]> = this.store.students$;

  httpSubscription?: Subscription;

  constructor(private http: FakeHttpService, private store: StudentStore) {}

  ngOnInit(): void {
    this.httpSubscription = this.http.fetchStudents$.subscribe((s) =>
      this.store.addAll(s)
    );
  }

  deleteStudent(id: number): void {
    this.store.deleteOne(id);
  }

  addNewStudent(): void {
    this.store.addOne(randStudent());
  }

  ngOnDestroy(): void {
    this.httpSubscription?.unsubscribe();
  }
}
