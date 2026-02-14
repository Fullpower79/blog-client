import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../models/blog.model';
import { environment } from '../../enviroments/enviroment';

@Injectable({ providedIn: 'root' })
export class BlogService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBlogs(tag?: string): Observable<Blog[]> {
    if (tag) {
      return this.http.get<Blog[]>(`${this.apiUrl}?tag=${tag}`);
    }
    return this.http.get<Blog[]>(this.apiUrl);
  }

  getLatest(): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/latest`);
  }

  createBlog(formData: FormData) {
    return this.http.post(this.apiUrl, formData);
  }
}
