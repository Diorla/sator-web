import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "../context/userContext";
import { createFirebaseApp } from "../firebase/clientApp";
import React from "react";

const app = createFirebaseApp();
const auth = getAuth(app);

export default function Home() {
  // Our custom hook to get context values
  const { loadingUser, user } = useUser();
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    if (!loadingUser) {
      // You know that the user is loaded: either logged in or out!
      console.log(user);
    }
    // You also have your firebase app initialized
  }, [loadingUser, user]);

  function signIn() {
    const { email, password } = form;
    return signInWithEmailAndPassword(auth, email, password);
  }

  if (loadingUser) {
    return <div>Loading...</div>;
  }
  if (user) {
    return (
      <main style={{ maxWidth: 480, margin: "auto" }}>
        <div>
          <Link href="/" passHref legacyBehavior>
            <a>Home</a>
          </Link>
          <button onClick={() => signOut(auth)}>Log out</button>
        </div>
        <div style={{ textAlign: "center" }}>
          Logged in as {user.displayName || user.email}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Link href="/delete-account" passHref legacyBehavior>
            <a>Delete profile</a>
          </Link>
          <Link href="/request-account" passHref legacyBehavior>
            <a>Request data</a>
          </Link>
        </div>
      </main>
    );
  }
  return (
    <div className="container">
      <Head>
        <title>Sator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Sator</h1>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="pwd">Password</label>
          <input
            type="password"
            name="pwd"
            id="pwd"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <div>
          <button onClick={signIn}>Login</button>
        </div>
      </main>
    </div>
  );
}
