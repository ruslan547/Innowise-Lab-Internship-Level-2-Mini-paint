import { database } from '../../firebase';

export const firebaseDbService = {
  sendImg,
};

async function sendImg(image: string, email: string | null): Promise<void> {
  database.ref().child('images').push({ image, email });
}
