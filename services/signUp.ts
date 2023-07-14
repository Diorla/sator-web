import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import createFirebaseApp from "../firebase/clientApp";

const app = createFirebaseApp();
const auth = getAuth(app);

export default async function signUp(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}
