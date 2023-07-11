import React from "react";
import { User as FBUser } from "firebase/auth";
import userWatcher from "../../services/watchUser";
import User from "../../models/User";
import createUser from "../../services/createUser";

export default function watchUser(
  currentUser: FBUser,
  setUser: React.Dispatch<User>,
  setLoading: React.Dispatch<boolean>
) {
  const id = currentUser.uid;
  userWatcher(id, async (data: User) => {
    const email = data?.email || currentUser.email;
    const name = data?.name || currentUser.displayName;
    if (data?.id)
      setUser({
        id,
        email,
        name,
        ...data,
      });
    else {
      createUser({
        ...data,
        id,
        email,
        name,
      });
    }
    setLoading(false);
  });
}
