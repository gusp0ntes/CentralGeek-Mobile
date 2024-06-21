import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email: string = '';
  public password: string = '';
  public passwordType: string = 'password'; // Estado inicial como 'password'
  public passwordIcon: string = 'eye-off'; // Ícone inicial

  constructor(
    public router: Router,
    private authService: AuthService,
    private toastr: ToastrService // Injeção do ToastrService
  ) { }

  async ngOnInit() {
    await this.authService.checkLoginStatus();
  }

  login() {
    this.authService.login(this.email, this.password)
      .then(() => {
        this.toastr.success('Bem-vindo!'); // Exibe o toast de sucesso
      })
      .catch((error) => {
        this.toastr.error('Erro ao fazer login'); // Exibe o toast de erro
        console.error('Erro ao fazer login:', error);
      });
  }

  signup() {
    this.router.navigateByUrl('signup');
  }

  togglePasswordVisibility() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-off';
    }
  }
}
