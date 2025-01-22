import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entity } from '../models/members.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MembersService {
  constructor(private http: HttpClient) {}
  retrieveAllPatients(): Observable<Entity[]> {
    return this.http.get<Entity[]>(
      `${environment.BASE_URL_API}/api/v1/member/`
    );
  }
  retrieveSinglePatient(entityNo: number): Observable<Entity> {
    return this.http.get<Entity>(
      `${environment.BASE_URL_API}/api/v1/member/${entityNo}`
    );
  }
  searchPatients(firstName?: string, lastName?: string): Observable<Entity[]> {
    let params = new HttpParams();
    if (firstName) params = params.append('firstName', firstName);
    if (lastName) params = params.append('lastName', lastName);
    return this.http.get<Entity[]>(
      `${environment.BASE_URL_API}/api/v1/member/search`,
      { params }
    );
  }
}
