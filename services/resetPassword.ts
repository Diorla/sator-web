import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import createFirebaseApp from "../firebase/clientApp";

const app = createFirebaseApp();

const auth = getAuth(app);

export default function resetPassword(email: string) {
  return sendPasswordResetEmail(auth, email);
}
