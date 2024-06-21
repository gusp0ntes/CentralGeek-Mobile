import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../theMovieDB/movies.service';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {
  public listaFilmes = new Array<any>();
  public loading: boolean = false;
  public error: boolean = false;

  constructor(
    public movieService: MoviesService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    // Código de inicialização, se necessário
  }

  ionViewDidEnter() {
    this.showLoading();
    this.carregarFilmes();
  }

  carregarFilmes() {
    this.loading = true; // Indica que o carregamento está em andamento
    this.movieService.getPopularMovies(this.sortearNumero(), 'pt-BR').subscribe(
      data => {
        let resposta = data as any;
        this.listaFilmes = resposta.results;
        this.loading = false; // Indica que o carregamento foi concluído com sucesso
        this.error = false; // Reseta o estado de erro
        console.log(this.listaFilmes);
      },
      error => {
        console.log(error);
        this.loading = false; // Indica que o carregamento falhou
        this.error = true; // Define o estado de erro como verdadeiro
      }
    );
  }

  sortearNumero(): number {
    const random = Math.random();
    const sorteio = Math.floor(random * 8) + 1;
    return sorteio;
  }

  openMovieDetails(id: string) {
    this.navCtrl.navigateForward(`/movie-details/${id}`);
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando Filmes...',
      duration: 1000,
      spinner: 'lines'
    });

    loading.present();
  }

  doRefresh(event: any) {
    console.log('Iniciando atualização');

    // Recarregar os filmes chamando a API novamente
    this.movieService.getPopularMovies(this.sortearNumero(), 'pt-BR').subscribe(
      data => {
        let resposta = data as any;
        this.listaFilmes = resposta.results; // Atualizar a lista com os novos filmes
        console.log('Atualização completa');
        event.target.complete(); // Completa a ação de refrescar
      },
      error => {
        console.log(error);
        event.target.complete(); // Completa a ação de refrescar mesmo em caso de erro
      }
    );
  }

  search(event: any) {
    const query = event.target.value.toLowerCase();

    if (query && query.trim() !== '') {
      this.movieService.searchMovies(query, 'pt-BR').subscribe(
        data => {
          let resposta = data as any;
          this.listaFilmes = resposta.results;
          this.error = false;
        },
        error => {
          console.log(error);
          this.error = true;
        }
      );
    } else {
      this.carregarFilmes(); // Carrega filmes populares se a busca estiver vazia
    }
  }
}
