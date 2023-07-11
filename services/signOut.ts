import { getAuth, signOut as signOutFB } from "firebase/auth";
import createFirebaseApp from "../firebase/clientApp";

const app = createFirebaseApp();
const auth = getAuth(app);

export default async function signOut() {
  return await signOutFB(auth);
}
