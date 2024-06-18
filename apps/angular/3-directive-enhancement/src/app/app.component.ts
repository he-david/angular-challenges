import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForEmptyDirective } from './ng-for-empty.directive';

interface Person {
  name: string;
}

@Component({
  standalone: true,
  imports: [NgFor, NgForEmptyDirective],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; empty: emptyList">
      {{ person.name }}
    </div>
    <ng-template #emptyList>The list is empty !!</ng-template>
    <button (click)="onAddPerson()">Add person</button>
    <button (click)="onClear()">Clear</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  // Key learning, I can easily overload build in directive selectors, and if both imported, then both runs
  persons: Person[] = [];

  onAddPerson(): void {
    this.persons.push({ name: 'David' });
  }

  onClear(): void {
    this.persons = [];
  }
}
