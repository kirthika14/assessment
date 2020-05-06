import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }
   public get(): Observable<any[]>
   {
 return  this.http.get<any[]>(`http://localhost:3000/student`);
 }
public post(value :any): Observable<any[]>
{
  return this.http.post<any[]>(`http://localhost:3000/student`,value);
}
public put(value:any,id:any): Observable<any[]>{
  return this.http.put<any[]>(`http://localhost:3000/student/${id}`,value);
}
public delete(id:any): Observable<any[]>{
  return this.http.delete<any[]>(`http://localhost:3000/student/${id}`);
}
}
