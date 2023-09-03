import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { Subscription } from 'rxjs';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-teacher-card',
  template: `<app-card
    [list]="teachers$ | async"
    (addNewItem)="addNewTeacher()"
    class="bg-light-red"
    ><img src="assets/img/teacher.png" width="200px" />
    <ng-template #rowRef let-teacher="item">
      <app-list-item (delete)="deleteTeacher(teacher.id)">
        {{ teacher.name }}
      </app-list-item>
    </ng-template>
  </app-card>`,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherCardComponent implements OnInit, OnDestroy {
  teachers$ = this.store.teachers$;
  httpSubscription?: Subscription;

  constructor(private http: FakeHttpService, private store: TeacherStore) {}

  ngOnInit(): void {
    this.httpSubscription = this.http.fetchTeachers$.subscribe((t) =>
      this.store.addAll(t)
    );
  }

  addNewTeacher(): void {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number): void {
    this.store.deleteOne(id);
  }

  ngOnDestroy(): void {
    this.httpSubscription?.unsubscribe();
  }
}
