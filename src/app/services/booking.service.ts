import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Booking,
  BookingRequest,
  BookingResponse,
  BookingStatusUpdateRequest,
} from '../models/booking.model';
@Injectable({
  providedIn: 'root',
})
export class BookingService {
  getBookings() {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}
  createBooking(bookingRequest: BookingRequest): Observable<Booking> {
    return this.http.post<Booking>(
      `${environment.BASE_URL_API}/api/v1/booking/`,
      bookingRequest
    );
  }
  retriveBooking(
    entityNo: number,
    fromDate?: string,
    toDate?: string
  ): Observable<BookingResponse> {
    let params = new HttpParams();
    if (fromDate) params = params.append('fromDate', fromDate);
    if (toDate) params = params.append('toDate', toDate);
    return this.http.get<BookingResponse>(
      `${environment.BASE_URL_API}/api/v1/booking/attendee/${entityNo}`,
      { params }
    );
  }
  updateBooking(
    bookingId: number,
    booking: BookingStatusUpdateRequest
  ): Observable<Booking> {
    return this.http.put<Booking>(
      `${environment.BASE_URL_API}/api/v1/booking/${bookingId}/status`,
      booking
    );
  }
}
