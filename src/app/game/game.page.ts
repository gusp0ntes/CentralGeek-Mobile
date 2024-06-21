import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RawgService } from '../services/rawg.service';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular'; 
import Swiper from 'swiper';

@Component({
  selector: 'app-game',
  templateUrl: 'game.page.html',
  styleUrls: ['game.page.scss'],
})
export class GamePage implements OnInit {
  @ViewChild('swiper') swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  games: any[] = [];
  query: string = '';
  news: any[] = [];
  isLoading = false;

  constructor(
    private rawgService: RawgService,
    private navCtrl: NavController,
    private loadingController: LoadingController 
  ) { }

  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  swiperSlideChanged(e: any) {
    console.log('changed: ', e);
  }

  ngOnInit(): void {
    this.showLoading();
    this.loadGames(); 
  }

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
      duration: 1500 
    });
    await loading.present();
  }

  async loadGames() {
    if (this.query) {
      this.rawgService.getGames(this.query).subscribe(data => {
        this.games = data.results;
        this.dismissLoading(); 
      });
    }
  }

  async dismissLoading() {
    await this.loadingController.dismiss(); 
    this.isLoading = false; 
  }

  searchGames(): void {
    if (this.query) {
      this.isLoading = true; 
      this.rawgService.getGames(this.query).subscribe(data => {
        this.games = data.results;
        this.isLoading = false; 
      });
    }
  }

  openGameDetails(gameId: string): void {
    this.navCtrl.navigateForward(`/game-details/${gameId}`);
  }

  clearGames() {
    this.games = [];
  }
}
