import {
  Directive,
  DoCheck,
  EmbeddedViewRef,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: '[ngFor]', standalone: true })
export class NgForEmptyDirective<T> implements DoCheck {
  private viewRef?: EmbeddedViewRef<unknown>;

  @Input() ngForOf?: T[] = undefined;
  @Input() ngForEmpty!: TemplateRef<unknown>;

  constructor(private viewContainer: ViewContainerRef) {}

  ngDoCheck(): void {
    this.viewRef?.destroy();

    if (this.ngForOf === undefined || this.ngForOf.length === 0) {
      this.viewRef = this.viewContainer.createEmbeddedView(this.ngForEmpty);
    }
  }
}
