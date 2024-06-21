import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class FireserviceService {
  constructor(
    public firestore: AngularFirestore,
    public auth: AngularFireAuth
  ) {}

  // Método para login com email e senha
  loginWithEmail(data: { email: string, password: string }) {
    return this.auth.signInWithEmailAndPassword(data.email, data.password);
  }

  // Método para registro com email e senha
  signup(data: { email: string, password: string }) {
    return this.auth.createUserWithEmailAndPassword(data.email, data.password);
  }

  // Método para salvar detalhes do usuário no Firestore
  saveDetails(data: any) {
    return this.firestore.collection("users").doc(data.uid).set({
      name: data.name,
      email: data.email,
      password: data.password,
      file: data.file // Suponho que 'file' seja um campo que você queira salvar
    });
  }

  // Método para recuperar detalhes do usuário do Firestore
  getDetails(data: { uid: string }): Observable<any> {
    return this.firestore.collection("users").doc(data.uid).valueChanges();
  }

  // Exemplo de método para recuperar alguns dados de uma coleção genérica no Firestore
  getSomeData(): Observable<any[]> {
    return this.firestore.collection('suaColecao').valueChanges();
  }

  // Método para recuperar o usuário atualmente autenticado
  getCurrentUser(): Observable<any> {
    return this.auth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.collection("users").doc(user.uid).valueChanges();
        } else {
          return of(null); // Retorna um Observable nulo se não houver usuário autenticado
        }
      })
    );
  }
}
