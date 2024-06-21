import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  public favoritos: any[] = [];

  public chave: string = '77c395485220279379909fa9b12604aa';
  public caminhoBase: string = 'https://api.themoviedb.org/3/';
  public servico1: string = 'movie/popular?';
  public servico2: string = 'movie/reviews?';
  public searchService: string = 'search/movie?';

  constructor(public http: HttpClient) { }

  public getPopularMovies(page = 1, language = 'pt-BR'): Observable<any> {
    let endpoint: string = `${this.caminhoBase}${this.servico1}api_key=${this.chave}&page=${page}&language=${language}`;
    return this.http.get(endpoint);
  }

  public getMovieReviews(page = 1, language = 'pt-BR'): Observable<any> {
    let endpoint: string = `${this.caminhoBase}${this.servico2}api_key=${this.chave}&page=${page}&language=${language}`;
    return this.http.get(endpoint);
  }

  public searchMovies(query: string, language = 'pt-BR'): Observable<any> {
    let endpoint: string = `${this.caminhoBase}${this.searchService}api_key=${this.chave}&query=${query}&language=${language}`;
    return this.http.get(endpoint);
  }

  public getDetalhesFilme(id: number): Observable<any> {
    let endpoint: string = `${this.caminhoBase}movie/${id}?api_key=${this.chave}&language=pt-BR`;
    return this.http.get(endpoint);
  }
}
