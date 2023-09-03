import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ParentModel } from '../../model/parent.model';
import { NgFor, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgFor, NgTemplateOutlet],
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent<T extends ParentModel> {
  @Input() list: T[] | null = null;
  @Output() addNewItem: EventEmitter<void> = new EventEmitter<void>();

  @ContentChild('rowRef') rowTemplate!: TemplateRef<{ item: T }>;

  onAddNewItem() {
    this.addNewItem.emit();
  }
}
