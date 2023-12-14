import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, catchError, finalize, from, map, of, switchMap, throwError } from 'rxjs';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import * as bcrypt from 'bcryptjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

interface UserData {
  uid: string;
  email: string;
  phone: string;
  name: string;
  photoURL: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userId: string = '';
  private inactivityTimeout = 200000; // Tempo limite em milissegundos (10 minutos) 600000
  private inactivityTimer: any;

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private toastr: ToastrService,
    private router: Router
  ) {
    const storedUserSessionData = localStorage.getItem('userSessionData');
    if (storedUserSessionData) {
      const { userId, ...userData } = JSON.parse(storedUserSessionData);
      this.setUserId(userId);
    }
  }

  async register(email: string, password: string, name: string, phone: string, photoURL: File): Promise<any> {
    // Adicione o usuário ao Firestore com a senha criptografada
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.firestore.collection('users').add({
      email: email,
      name: name,
      phone: phone,
      hashedPassword: hashedPassword,
    })
      .then((docRef) => {
        const userId = docRef.id;

        // Realize o upload da foto para o armazenamento (Firebase Storage)
        const filePath = `userPhotos/${userId}`;
        const storageRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, photoURL);

        return uploadTask.snapshotChanges().pipe(
          finalize(() => {
            storageRef.getDownloadURL().subscribe(downloadURL => {
              // Atualizar o documento do usuário no Firestore com a URL da foto
              this.firestore.collection('users').doc(userId).update({
                photoURL: downloadURL,  // Adicionando a URL da foto
              });
            });
          })
        ).toPromise();
      });
  }

  setUserId(userId: string): void {
    this.userId = userId;
  }

  async login(email: string, password: string): Promise<any> {
    return this.firestore.collection('users', ref => ref.where('email', '==', email).limit(1))
      .get()
      .toPromise()
      .then(async querySnapshot => {
        if (querySnapshot && querySnapshot.size === 1) {
          const userDoc = querySnapshot.docs[0];
          const userData: any = userDoc.data();  // Usando any temporariamente

          // Verificar a senha armazenada no Firestore
          const isPasswordValid = await bcrypt.compare(password, userData.hashedPassword);

          if (isPasswordValid) {
            const userId = userDoc.id;

            this.storeUserDataInLocalStorage(userId, userData);

            this.setUserId(userId);

            return { user: { uid: userId, ...userData } };
          } else {
            throw new Error('Senha incorreta');
          }
        } else {
          // Usuário não encontrado
          throw new Error('Usuário não encontrado');
        }
      });
  }

  async changePassword(email: string, newPassword: string, confirmPassword: string): Promise<void> {
    if (newPassword !== confirmPassword) {
      throw new Error('A nova senha e a confirmação de senha não coincidem.');
    }

    return this.firestore.collection('users', ref => ref.where('email', '==', email).limit(1)).get().pipe(
      switchMap((querySnapshot) => {
        if (querySnapshot.size === 1) {
          const userDoc = querySnapshot.docs[0];
          const userId = userDoc.id;

          return from(bcrypt.hash(newPassword, 10)).pipe(
            switchMap((hashedNewPassword) =>
              this.firestore.collection('users').doc(userId).update({
                hashedPassword: hashedNewPassword,
              })
            ),
            catchError(() => throwError('Erro ao alterar a senha.'))
          );
        } else {
          return throwError('Usuário não encontrado.');
        }
      })
    ).toPromise();
  }

  async updateProfileWithoutPhoto(email: string, name: string, phone: string): Promise<void> {
    try {
      const userIdToUse = this.userId || '';
  
      // Atualizar os detalhes no Firestore
      await this.firestore.collection('users').doc(userIdToUse).update({
        name: name,
        phone: phone,
        email: email,
        // Remova a linha relacionada à fotoURL se você não deseja atualizar a foto
      });
  
      console.log('Perfil atualizado com sucesso no Firestore!');
    } catch (error) {
      console.error('Erro ao atualizar o perfil:', error);
      throw new Error('Erro ao atualizar o perfil e o email.');
    }
  }

  async updatePhoto(photoURL: File): Promise<void> {
    try {
      const userIdToUse = this.userId || '';
  
      // Upload da nova foto
      const filePath = `userPhotos/${userIdToUse}`;
      const storageRef = this.storage.ref(filePath);
      const uploadTask: AngularFireUploadTask = this.storage.upload(filePath, photoURL);
  
      // Aguarde a conclusão do upload
      const snapshot = await uploadTask;
      
      // Obtenha a URL da nova foto após o upload
      const downloadURL = await snapshot.ref.getDownloadURL();
  
      // Atualize a fotoURL no Firestore
      await this.firestore.collection('users').doc(userIdToUse).update({
        photoURL: downloadURL,
      });
  
    } catch (error) {}
  }

  getUserData(): Observable<UserData | null> {
    const userIdToUse = this.userId || ''; // Usa o userId dinâmico ou um valor padrão se não houver

    if (userIdToUse) {
      const userDocRef = this.firestore.collection('users').doc(userIdToUse);

      return userDocRef.get().pipe(
        map(userDoc => {
          if (userDoc.exists) {
            const userData: any = userDoc.data();

            // Pode ser necessário verificar se 'userData' não é 'undefined' aqui
            return { uid: userIdToUse, ...userData };
          } else {
            // Usuário não encontrado
            return null;
          }
        })
      );
    } else {
      return of(null); // Retorna um Observable nulo se userIdToUse for inválido
    }
  }

  private storeUserDataInLocalStorage(userId: string, userData: any): void {
    const userSessionData = { userId, ...userData };
    localStorage.setItem('userSessionData', JSON.stringify(userSessionData));
  }


}

