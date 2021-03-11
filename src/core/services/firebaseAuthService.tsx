import { auth } from '../../firebase';
import firebase from 'firebase/app';

export const firebaseAuthService = {
  signin,
  register,
  signout,
};

function signin(email: string, password: string): Promise<firebase.auth.UserCredential> {
  return auth.signInWithEmailAndPassword(email, password);
}

function register(email: string, password: string): Promise<firebase.auth.UserCredential> {
  return auth.createUserWithEmailAndPassword(email, password);
}

function signout(): Promise<void> {
  return auth.signOut();
}
