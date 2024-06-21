import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular'
@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.page.html',
  styleUrls: ['./configuracao.page.scss'],
})
export class ConfiguracaoPage {
  isDetailsVisible = false;
  constructor(private toastController: ToastController) {}

  toggleDetails() {
    this.isDetailsVisible = !this.isDetailsVisible;
  }

  async copyEmail(email: string) {
    try {
      await navigator.clipboard.writeText(email);
      this.presentToast('Email copiado para a área de transferência');
    } catch (error) {
      console.error('Erro ao copiar email:', error);
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // duração em milissegundos
    });
    toast.present();
  }

  isFlipped = false;

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }
}
