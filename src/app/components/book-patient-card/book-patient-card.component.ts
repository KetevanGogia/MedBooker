import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Entity } from 'src/app/models/members.model';

@Component({
  selector: 'app-book-patient-card',
  templateUrl: './book-patient-card.component.html',
  styleUrls: ['./book-patient-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookPatientCardComponent {
  @Input() patient: Entity | undefined;
  @Output() onEnableBooking = new EventEmitter();
  static Default: ChangeDetectionStrategy | undefined;
  enableBooking(patient: Entity) {
    this.onEnableBooking.emit({ patient });
  }
}
