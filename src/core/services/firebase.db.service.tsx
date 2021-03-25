import { database } from '../../firebase';
import { User } from '../actions/auth.actions';

export const firebaseDbService = {
  sendImg,
  onImages,
  setUserEmail,
};

export interface Image {
  email: string;
  image: string;
}

async function sendImg(image: string, uid: string): Promise<void> {
  database.ref().child('images').push({ image, uid });
}

async function onImages(): Promise<Record<string, Image>> {
  return new Promise((resolve) => {
    database
      .ref()
      .child('images')
      .on('value', (snapshot) => {
        const data = snapshot.val();
        resolve(data || {});
      });
  });
}

function setUserEmail(user: User): void {
  database.ref(`users/${user.uid}`).set({ email: user.email });
}
