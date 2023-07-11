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
      querySnapshot.forEach((doc) => {
        tasks.push(doc.data());
      });
      callback(tasks);
    });
    return unsubscribe;
  } catch (error) {
    logError(userId, "error fetching tasks", error);
  }
}
