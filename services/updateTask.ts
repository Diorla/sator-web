import { updateDoc } from "firebase/firestore";
import Task from "../models/Task";
import { doc } from "../database/firestore";
import logError from "./logError";
// TODO: Use firebase-functions
/**
 * Whenever a user updates the time on their task, I should update the cumulative
 * time on the user record as well
 */
type Exclude = "updatedAt";
export type UpdateTask = Omit<Partial<Task>, Exclude> & { id: string };
export default async function updateTask(data: UpdateTask) {
  const formattedData = {
    ...data,
    updatedAt: Date.now(),
  };
  try {
    updateDoc(doc("tasks", data.id), formattedData as Record<string, any>);
  } catch (error) {
    logError(data.userId, "creating new task", error);
  }
}
