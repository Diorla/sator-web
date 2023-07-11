import { setDoc } from "firebase/firestore";
import Task from "../models/Task";
import { doc } from "../database/firestore";
import logError from "./logError";
import uuid from "uuid";

type Exclude = "createdAt" | "updatedAt" | "id";
export type CreateTask = Omit<Task, Exclude>;
export default async function createTask(data: CreateTask) {
  const id = String(uuid.v4());
  const formattedData: Task = {
    ...data,
    id,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  try {
    setDoc(doc("tasks", id), formattedData as Record<string, any>);
  } catch (error) {
    logError(data.userId, "creating new task", error);
  }
}
