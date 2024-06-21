import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage implements OnInit {
  currentUser: any = {};
  public loading: boolean = false;
  public error: boolean = false;

  constructor(
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private appComponent: AppComponent,
    private router: Router
  ) { }

  public ionViewDidEnter() {
    // this.showLoading();
  }

  

  // async showLoading() {
  //   const loading = await this.loadingCtrl.create({
  //     message: 'Carregando...',
  //     duration: 1000,
  //     spinner: 'lines'
  //   });

  //   loading.present();
  // }

  ngOnInit() {
    // Código de inicialização, se necessário
  }
}
