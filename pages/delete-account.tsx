import {
  deleteUser,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  deleteDoc,
  doc,
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { createFirebaseApp } from "../firebase/clientApp";
import Link from "next/link";
import { useUser } from "../context/userContext";
import { useState } from "react";

const app = createFirebaseApp();
const auth = getAuth(app);

export default function DeleteAccount() {
  const { loadingUser, user } = useUser();
  const [password, setPassword] = useState("");

  const deleteAccount = async () => {
    const authUser = auth.currentUser;
    const db = getFirestore(app);
    const batch = writeBatch(db);

    await signInWithEmailAndPassword(auth, authUser.email, password);

    deleteDoc(doc(db, "users", authUser.uid));
    const q = query(
      collection(db, "tasks"),
      where("userId", "==", authUser.uid)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => batch.delete(doc.ref));
    batch.commit();

    // const snapshot =
    deleteUser(authUser)
      .then(() => {
        alert("Account deleted");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  if (loadingUser) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return (
      <main>
        <div>Not logged in</div>
        <Link href="/" passHref legacyBehavior>
          <a>Home</a>
        </Link>
      </main>
    );
  }
  return (
    <main>
      <div>
        <Link href="/" passHref legacyBehavior>
          <a>Home</a>
        </Link>
        <button onClick={() => signOut(auth)}>Log out</button>
      </div>
      <div>Deleting account</div>
      <div>
        <label htmlFor="pwd">Password</label>
        <input
          type="password"
          name="pwd"
          id="pwd"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={deleteAccount}>Delete Account</button>
    </main>
  );
}
