import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="h-screen bg-gray-500">
      @defer (on interaction(load)) {
        <app-top />
      } @placeholder {
        <app-placeholder />
      }
      <button #load class="rounded-sm border border-blue-500 bg-blue-300 p-2">
        Load Top
      </button>
    </div>
  `,
  standalone: false,
})
export class AppComponent {}
