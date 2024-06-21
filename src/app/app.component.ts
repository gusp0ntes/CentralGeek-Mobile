import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Storage } from '@ionic/storage-angular';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showMenu = true;
  renderer: any;
  el: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private storage: Storage,
    private menuController: MenuController,
    private navCtrl: NavController
  ) {
    this.initializeApp();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if the current route is 'landing' or 'login' to hide the menu
        this.showMenu = !['/landing', '/login', '/signup', '/reset-password'].includes(event.url);
      }
    });
  }

  async initializeApp() {
    await this.storage.create();
    this.checkLoginStatus();
  }

  async checkLoginStatus() {
    const token = await this.storage.get('userToken');
    if (token) {
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  setActive(event: Event): void {
    // Remove a classe ativa de todos os itens
    document.querySelectorAll('.list-item').forEach(item => {
      item.classList.remove('active');
    });

    // Adiciona a classe ativa ao item clicado
    const target = event.currentTarget as HTMLElement;
    target.classList.add('active');
  }

  closeMenuAndNavigate(route: string) {
    this.menuController.close(); // Fecha o menu
    this.navCtrl.navigateForward(route); // Navega para a rota fornecida
  }

  logout() {
    // Clear the authentication token from local storage
    this.storage.remove('userToken');
    this.router.navigateByUrl('/login');
  }

}
