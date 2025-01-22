import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Practitioner } from 'src/app/models/members.model';

@Component({
  selector: 'app-book-entity-card',
  templateUrl: './book-entity-card.component.html',
  styleUrls: ['./book-entity-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookEntityCardComponent {
  @Input() doctor: Practitioner | undefined;
  @Output() onBook = new EventEmitter();
  static Default: ChangeDetectionStrategy | undefined;

  book(entityNo: number | undefined) {
    if (entityNo) this.onBook.emit({ entityNo });
  }
}
