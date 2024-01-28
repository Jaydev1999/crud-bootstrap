import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: string = 'http://localhost:3000/employee';
  constructor(private http: HttpClient) { }

  addEmp(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  getEmp(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  deleteEmp(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  editEmp(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }
}
