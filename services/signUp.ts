import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../../firebaseConfig";
import logError from "./logError";
import storeCredential from "../utils/storeCredential";

const auth = getAuth(app);

export default async function signUp(email: string, password: string) {
  try {
    storeCredential(email, password);
    return createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    logError(email, "signing in", err);
  }
}
