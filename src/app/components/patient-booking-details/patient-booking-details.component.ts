import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Entity } from 'src/app/models/members.model';

@Component({
  selector: 'app-patient-booking-details',
  templateUrl: './patient-booking-details.component.html',
  styleUrls: ['./patient-booking-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientBookingDetailsComponent {
  @Input() chosenPatient: Entity | undefined;
  @Output() newBooking = new EventEmitter();
  form = this.fb.group({
    startDate: this.fb.control('', [Validators.required]),
  });
  static Default: ChangeDetectionStrategy | undefined;
  constructor(private fb: FormBuilder) {}
  bookPatient(chosenPatient: Entity) {
    this.newBooking.emit({
      chosenPatient,
      date: this.form.value.startDate,
    });
  }
}
