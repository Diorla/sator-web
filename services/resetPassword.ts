import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from "../../firebaseConfig";

const auth = getAuth(app);

export default function resetPassword(email: string) {
  return sendPasswordResetEmail(auth, email);
}
