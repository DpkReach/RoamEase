import { auth } from '@/lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  type User,
} from 'firebase/auth';

export async function signUp(email: string, password: string): Promise<User> {
  if (!auth) {
    throw new Error('Firebase is not configured. Please add your Firebase credentials to the .env file.');
  }
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export async function signIn(email: string, password: string): Promise<User> {
  if (!auth) {
    throw new Error('Firebase is not configured. Please add your Firebase credentials to the .env file.');
  }
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export async function signOut(): Promise<void> {
  if (!auth) {
    return Promise.resolve();
  }
  return firebaseSignOut(auth);
}

export function onAuthStateChanged(callback: (user: User | null) => void) {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return firebaseOnAuthStateChanged(auth, callback);
}
