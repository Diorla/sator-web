import React, { useState, useEffect } from "react";
import { onAuthStateChanged, getAuth, Unsubscribe } from "firebase/auth";
import logError from "../../services/logError";
import signOutFn from "../../services/signOut";
import UserContext from "./userContext";
import watchUser from "./watchUser";
import createFirebaseApp from "../../firebase/clientApp";

const app = createFirebaseApp();
const auth = getAuth(app);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const signOut = () => {
    signOutFn();
    setUser(null);
  };

  useEffect(() => {
    let unsubscribe: Unsubscribe;
    try {
      unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) watchUser(currentUser, setUser, setLoading);
        else setLoading(false);
      });
    } catch (error) {
      setError(error);
      logError(user?.id, "auth user context", error);
      setLoading(false);
    }
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [user?.id]);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        signOut,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
