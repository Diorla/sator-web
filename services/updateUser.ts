import { updateDoc } from "firebase/firestore";
import User from "../models/User";
import { doc } from "../database/firestore";
import logError from "./logError";

type Exclude = "updatedAt";
export type UpdateUser = Omit<Partial<User>, Exclude> & { id: string };
export default async function updateUser(data: UpdateUser) {
  const formattedData = {
    ...data,
    updatedAt: Date.now(),
  };
  try {
    updateDoc(doc("users", data.id), formattedData as Record<string, any>);
  } catch (error) {
    logError(data.email, "creating new user", error);
  }
}
