import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import logError from "./logError";
import createFirebaseApp from "../firebase/clientApp";

const app = createFirebaseApp();
const auth = getAuth(app);

export default async function signIn(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    logError(email, "signing in", err);
  }
}
