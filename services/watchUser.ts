import { onSnapshot } from "firebase/firestore";
import logError from "./logError";
import User from "../models/User";
import { doc } from "../database/firestore";

export default function userWatcher(
  userId: string,
  callback: (data: User) => void
) {
  const unsubscribe = onSnapshot(
    doc("users", userId),
    (doc) => {
      callback(doc.data() as User);
    },
    (error) => {
      logError(userId, "user watcher", error);
    }
  );
  return unsubscribe;
}
