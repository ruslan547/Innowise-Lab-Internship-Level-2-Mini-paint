import { auth } from '../../firebase';
import firebase from 'firebase/app';

export const firebaseAuthService = {
  signin,
  register,
  signout,
};

export type UserCredential = firebase.auth.UserCredential;

function signin(email: string, password: string): Promise<UserCredential> {
  return auth.signInWithEmailAndPassword(email, password);
}

function register(email: string, password: string): Promise<UserCredential> {
  return auth.createUserWithEmailAndPassword(email, password);
}

function signout(): Promise<void> {
  return auth.signOut();
}
