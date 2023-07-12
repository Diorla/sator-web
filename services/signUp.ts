import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import logError from "./logError";
import createFirebaseApp from "../firebase/clientApp";

const app = createFirebaseApp();
const auth = getAuth(app);

export default async function signUp(email: string, password: string) {
  try {
    return createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    logError(email, "signing in", err);
  }
}
