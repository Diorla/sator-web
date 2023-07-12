import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import createFirebaseApp from "../firebase/clientApp";

const app = createFirebaseApp();
const auth = getAuth(app);

export default async function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}
