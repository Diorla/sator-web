import { query, onSnapshot } from "firebase/firestore";
import logError from "./logError";
import { collection, where } from "../database/firestore";
import Task from "../models/Task";

export default function watchTasks(
  userId: string,
  callback: (tasks: Task[]) => void
) {
  try {
    const q = query(collection("tasks"), where("userId", "==", userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasks = [];
      const pendingTasks = [];
      querySnapshot.forEach((doc) => {
        if (doc.metadata.hasPendingWrites) pendingTasks.push(doc.data());
        else tasks.push(doc.data());
      });
      if (tasks.length) callback([...tasks, ...pendingTasks]);
    });
    return unsubscribe;
  } catch (error) {
    logError(userId, "error fetching tasks", error);
  }
}
