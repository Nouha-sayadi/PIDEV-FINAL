import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Discussion, Idea, IdeaStatus } from '../models/idea.model';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {
  private baseUrl = 'http://localhost:8081/api/ideas';
 

  constructor(private http: HttpClient) {}

  getAll(): Observable<Idea[]> {
    return this.http.get<Idea[]>(this.baseUrl);
  }

  getById(id: number): Observable<Idea> {
    return this.http.get<Idea>(`${this.baseUrl}/${id}`);
  }

  create(idea: Idea): Observable<Idea> {
    return this.http.post<Idea>(this.baseUrl, idea);
  }

  update(id: number, idea: Idea): Observable<Idea> {
    return this.http.put<Idea>(`${this.baseUrl}/${id}`, idea);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getByStatus(status: string): Observable<Idea[]> {
    return this.http.get<Idea[]>(`${this.baseUrl}/status/${status}`);
  }

  search(keyword: string): Observable<Idea[]> {
  return this.http.get<Idea[]>(`${this.baseUrl}/search?keyword=${keyword}`);
}

likeIdea(id: number) {
  return this.http.post<Idea>(`${this.baseUrl}/${id}/like`, {});
}
uploadReport(id: number, file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return this.http.post(`${this.baseUrl}/${id}/uploadReport`, formData);
}

downloadReport(id: number) {
  return this.http.get(`${this.baseUrl}/${id}/downloadReport`, { responseType: 'blob' });
}

updateStatus(id: number, status: IdeaStatus): Observable<Idea> {
  return this.http.patch<Idea>(`${this.baseUrl}/${id}/status`, { status: status });
}
getDiscussions(ideaId: number): Observable<Discussion[]> {
  return this.http.get<Discussion[]>(`http://localhost:8081/api/ideas/${ideaId}/discussions`);
}


  addDiscussion(id: number, message: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`http://localhost:8081/api/ideas/${id}/discussions`, { message }, { headers });
  }

  getStatistics() {
  return this.http.get<any>('http://localhost:8081/api/ideas/statistics');
}


}
