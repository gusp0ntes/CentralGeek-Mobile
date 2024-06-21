import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private afAuth: AngularFireAuth) { }

  async resetPassword(email: string): Promise<void> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
      console.log("Email de redefinição de senha enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar o email de redefinição de senha:", error);
      throw error;
    }
  }
}
