import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-root',
  styles: `
    section {
      @apply flex flex-1 flex-col gap-5;
    }

    .list-item {
      @apply flex flex-row border-b px-5 pb-2;

      span {
        @apply flex-1;
      }
    }
  `,
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('1000ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
    ]),
    trigger('listStagger', [
      transition(':enter', [
        query('.list-item', [
          style({ opacity: 0, transform: 'translateX(-100px)' }),
          stagger(500, [
            animate(
              '1000ms cubic-bezier(0.3, 0.8, 0.3, 2.3)',
              style({ opacity: 1, transform: 'translateX(0px)' }),
            ),
          ]),
        ]),
      ]),
    ]),
  ],
  template: `
    <div class="mx-20 my-40 flex gap-5">
      <section @slideIn>
        <div>
          <h3>2008</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            mollitia sequi accusantium, distinctio similique laudantium eveniet
            quidem sit placeat possimus tempore dolorum inventore corporis atque
            quae ad, nobis explicabo delectus.
          </p>
        </div>

        <div>
          <h3>2010</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            mollitia sequi accusantium, distinctio similique laudantium eveniet
            quidem sit placeat possimus tempore dolorum inventore corporis atque
            quae ad, nobis explicabo delectus.
          </p>
        </div>

        <div>
          <h4>2012</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            mollitia sequi accusantium, distinctio similique laudantium eveniet
            quidem sit placeat possimus tempore dolorum inventore corporis atque
            quae ad, nobis explicabo delectus.
          </p>
        </div>
      </section>

      <section @listStagger>
        <div class="list-item">
          <span>Name:</span>
          <span>Samuel</span>
        </div>

        <div class="list-item">
          <span>Age:</span>
          <span>28</span>
        </div>

        <div class="list-item">
          <span>Birthdate:</span>
          <span>02.11.1995</span>
        </div>

        <div class="list-item">
          <span>City:</span>
          <span>Berlin</span>
        </div>

        <div class="list-item">
          <span>Language:</span>
          <span>English</span>
        </div>

        <div class="list-item">
          <span>Like Pizza:</span>
          <span>Hell yeah</span>
        </div>
      </section>
    </div>
  `,
})
export class AppComponent {}
