import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Entity, Practitioner } from '../models/members.model';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  constructor(private http: HttpClient) {}
  retrieveAllDoctors(): Observable<Practitioner[]> {
    return this.http.get<Practitioner[]>(
      `${environment.BASE_URL_API}/api/v1/practitioner/`
    );
  }
  retrieveSingleDoctor(entityNo: number): Observable<Practitioner> {
    return this.http.get<Practitioner>(
      `${environment.BASE_URL_API}/api/v1/practitioner/${entityNo}`
    );
  }
  searchDoctor(
    firstName?: string,
    lastName?: string
  ): Observable<Practitioner[]> {
    let params = new HttpParams();
    if (firstName) params = params.append('firstName', firstName);
    if (lastName) params = params.append('lastName', lastName);
    return this.http.get<Practitioner[]>(
      `${environment.BASE_URL_API}/api/v1/practitioner/search`,
      { params }
    );
  }
}
