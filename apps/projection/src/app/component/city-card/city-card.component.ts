import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CardComponent } from '../../ui/card/card.component';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { Observable, Subscription } from 'rxjs';
import { CityStore } from '../../data-access/city.store';
import { City } from '../../model/city.model';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-city-card',
  template: `<app-card
    [list]="cities$ | async"
    (addNewItem)="addNewCity()"
    class="bg-light-blue"
    ><img src="assets/img/city.jpeg" width="200px" />
    <ng-template #rowRef let-city="item">
      <app-list-item (delete)="deleteCity(city.id)">
        {{ city.name }}
      </app-list-item>
    </ng-template>
  </app-card> `,
  standalone: true,
  styles: [
    `
      .bg-light-blue {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit, OnDestroy {
  cities$: Observable<City[]> = this.store.cities$;

  httpSubscription?: Subscription;

  constructor(private http: FakeHttpService, private store: CityStore) {}

  ngOnInit(): void {
    this.httpSubscription = this.http.fetchCities$.subscribe((cities) =>
      this.store.addAll(cities)
    );
  }

  deleteCity(id: number): void {
    this.store.deleteOne(id);
  }

  addNewCity(): void {
    this.store.addOne(randomCity());
  }

  ngOnDestroy(): void {
    this.httpSubscription?.unsubscribe();
  }
}
