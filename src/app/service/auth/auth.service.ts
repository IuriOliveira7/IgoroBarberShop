import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, finalize, of, switchMap } from 'rxjs';
import { UserService } from '../user/user.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private usuarioService: UserService,
    private storage: AngularFireStorage
  ) {}
  
  // Método para registrar um novo usuário com a opção de cadastrar foto
  register(email: string, password: string, name: string, phone: string, photoURL: File): Promise<any> {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Verificar se o usuário não é nulo antes de acessar propriedades
        if (user) {
          // Realizar o upload da foto para o armazenamento (Firebase Storage)
          const filePath = `userPhotos/${user.uid}`;
          const storageRef = this.storage.ref(filePath);
          const uploadTask = this.storage.upload(filePath, photoURL);
  
          // Obter a URL da foto após o upload ser concluído
          return uploadTask.snapshotChanges().pipe(
            finalize(() => {
              storageRef.getDownloadURL().subscribe(downloadURL => {
                // Atualizar os dados do usuário no Firestore com a URL da foto
                this.firestore.collection('users').doc(user.uid).set({
                  name: name,
                  phone: phone,
                  photoURL: downloadURL,  // Adicionando a URL da foto
                });
              });
            })
          ).toPromise();
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

  // Novo método para redefinir a senha
  resetPassword(email: string): Promise<void> {
    return this.auth.sendPasswordResetEmail(email);
  }
  
  // Método para deslogar um usuário
  logout(): Promise<void> {
    return this.auth.signOut();
  }

  // Método para obter o estado de autenticação atual
  getAuthState(): Observable<any> {
    return this.auth.authState;
  }

  // DADOS DO USUARIO
  getUserData(): Observable<any> {
    return this.auth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.collection('users').doc(user.uid).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

}
