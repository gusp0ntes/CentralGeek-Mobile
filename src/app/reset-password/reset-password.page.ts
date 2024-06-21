import { Component } from '@angular/core';
import { ResetPasswordService } from './reset-password.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  email: string = '';

  constructor(
    private resetPasswordService: ResetPasswordService,
    private toastController: ToastController
  ) { }

  async resetPassword() {
    // Verificar se o email é válido
    if (!this.isValidEmail(this.email)) {
      this.presentToast('Por favor, insira um email válido.');
      return;
    }

    try {
      await this.resetPasswordService.resetPassword(this.email);
      // Limpar o campo de email após o envio bem-sucedido
      this.email = '';
      // Exibir uma mensagem de sucesso ao usuário
      this.presentToast('Email de redefinição de senha enviado com sucesso.');
    } catch (error) {
      // Lidar com erros de redefinição de senha
      this.presentToast('Erro ao enviar o email de redefinição de senha. Por favor, tente novamente mais tarde.');
    }
  }

  isValidEmail(email: string): boolean {
    // Implemente sua lógica de validação de email aqui
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
