import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RawgService {
  private apiKey = '116716e64f0249abbb35c3696e7a017b'; 
  private apiUrl = 'https://api.rawg.io/api';

  constructor(private http: HttpClient) { }

  getGames(query: string): Observable<any> {
    const url = `${this.apiUrl}/games?key=${this.apiKey}&search=${query}`;
    return this.http.get(url);
  }

  getGameDetails(id: string): Observable<any> {
    const url = `${this.apiUrl}/games/${id}?key=${this.apiKey}`;
    return this.http.get(url);
  }
}
