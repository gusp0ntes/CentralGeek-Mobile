import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movieId: string | null | undefined;
  movie: any;
  videoUrl: string | null = null;
  reviews: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.movieId = params.get('id');
      if (this.movieId) {
        this.getMovieDetails(this.movieId);
        this.getMovieReviews(this.movieId);
      } else {
        console.error('Nenhum ID de filme fornecido.');
      }
    });
  }

  getMovieDetails(id: string) {
    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=77c395485220279379909fa9b12604aa&language=pt-BR`;
    const movieVideosUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=77c395485220279379909fa9b12604aa&language=pt-BR`;
    
    // Solicitar detalhes do filme
    this.http.get(movieDetailsUrl).subscribe((response: any) => {
      console.log('Movie details response:', response); // Log para verificar a resposta
      this.movie = response;
    }, 
    
    error => {
      console.error('Erro ao buscar detalhes do filme:', error);
    });

    // Solicitar vídeos do filme
    this.http.get(movieVideosUrl).subscribe((response: any) => {
      const videos = response.results;
      if (videos.length > 0) {
        const trailer = videos.find((video: any) => video.type === 'Trailer' && video.site === 'YouTube');
        if (trailer) {
          this.videoUrl = `https://www.youtube.com/embed/${trailer.key}`;
        }
      }
    },
  
    error => {
      console.error('Erro ao buscar vídeos do filme:', error);
    });
  }

  getMovieReviews(id: string) {
    const movieReviewsUrl = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=77c395485220279379909fa9b12604aa&language=pt-BR`;

    this.http.get(movieReviewsUrl).subscribe((response: any) => {
      console.log('Reviews response:', response); // Log para verificar a resposta
      this.reviews = response.results;
      this.reviews = response.reviews.results.filter((review: any) => review.iso_639_1 === 'pt');
    }, error => {
      console.error('Erro ao buscar reviews do filme:', error);
    });
  }
}
