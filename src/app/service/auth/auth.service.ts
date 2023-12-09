import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore, private usuarioService: UserService) { }

  // Método para registrar um novo usuário
  register(email: string, password: string, name: string, phone: string): Promise<any> {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Verificar se o usuário não é nulo antes de acessar propriedades
        if (user) {
          return this.firestore.collection('users').doc(user.uid).set({
            name: name,
            phone: phone,
          });
        } else {
          // Lida com o caso em que o usuário é nulo
          throw new Error('Usuário nulo após criação');
        }
      });
  }

  // Método para autenticar um usuário existente
  login(email: string, password: string): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  
  // Método para deslogar um usuário
  logout(): Promise<void> {
    return this.auth.signOut();
  }

  // Método para obter o estado de autenticação atual
  getAuthState(): Observable<any> {
    return this.auth.authState;
  }
}
