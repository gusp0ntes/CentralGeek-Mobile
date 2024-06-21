import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';
import { FireserviceService } from '../services/fireservice.service';
import { NavController } from '@ionic/angular';
import { HttpClient, HttpParams } from '@angular/common/http'; // Adicionar HttpClient e HttpParams
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private clientId = '85b1dae5e4a0cc7e850ff94ae0fe01c2';
  private redirectUri = 'http://localhost:8100/callback'; // Altere para o URL de callback registrado no MyAnimeList
  private authUrl = 'https://myanimelist.net/v1/oauth2/authorize';
  private tokenUrl = 'https://myanimelist.net/v1/oauth2/token';
  private clientSecret = 'YOUR_CLIENT_SECRET'; // Adicionar o client secret da sua aplicação MyAnimeList

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private storage: Storage,
    private toastController: ToastController,
    private fireService: FireserviceService,
    private navCtrl: NavController,
    private http: HttpClient // Adicionar HttpClient no construtor
  ) {}

  async login(email: string, password: string) {
    try {
      const res = await this.afAuth.signInWithEmailAndPassword(email, password);
      if (res.user?.uid) {
        await this.storage.set('userToken', res.user?.uid);
        this.presentToast('Login realizado com sucesso.', 'success');
        this.router.navigateByUrl('/configuracao');
      }
    } catch (error: any) {
      if (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found') {
        this.presentToast('Email inválido ou usuário não encontrado. Por favor, verifique o email fornecido.', 'danger');
      } else if (error.code === 'auth/wrong-password') {
        this.presentToast('Senha incorreta. Por favor, tente novamente.', 'danger');
      } else {
        this.presentToast('Erro ao fazer login. Por favor, tente novamente mais tarde.', 'danger');
      }
    }
  }

  async signup(email: string, password: string, name: string, file: string) {
    try {
      const res = await this.afAuth.createUserWithEmailAndPassword(email, password);
      if (res.user?.uid) {
        let data = {
          email: email,
          password: password,
          name: name,
          file: file,
          uid: res.user.uid
        };
        await this.fireService.saveDetails(data);
        this.presentToast('Conta criada com sucesso!', 'success');
        this.router.navigate(['/login']);
      }
    } catch (error: any) {
      this.presentToast(error.message, 'danger');
      console.log(error);
    }
  }

  async checkLoginStatus() {
    const token = await this.storage.get('userToken');
    if (token) {
      this.router.navigateByUrl('/home');
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      await this.storage.remove('userToken');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }

  isAuthenticated(): boolean {
    return true; // Substitua isso com a lógica real de verificação de autenticação
  }

  getAuthorizationUrl(): string {
    const params = new HttpParams()
      .set('response_type', 'code')
      .set('client_id', this.clientId)
      .set('redirect_uri', this.redirectUri)
      .set('code_challenge', 'challenge')
      .set('code_challenge_method', 'plain');

    return `${this.authUrl}?${params.toString()}`;
  }

  getAccessToken(code: string): Observable<any> {
    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret)
      .set('code', code)
      .set('redirect_uri', this.redirectUri)
      .set('code_verifier', 'challenge');

    return this.http.post(this.tokenUrl, body);
  }
}
