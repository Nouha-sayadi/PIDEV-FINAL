import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdeeprojetService {
 private baseUrl = 'http://localhost:8081/api/projects';

  constructor(private http: HttpClient) {}


}
