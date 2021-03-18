import { database } from '../../firebase';

export const firebaseDbService = {
  sendImg,
  onImages,
};

export interface Image {
  email: string | null;
  image: string;
}

async function sendImg(image: string, email: string | null): Promise<void> {
  database.ref().child('images').push({ image, email });
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
