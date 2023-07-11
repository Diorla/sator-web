import { setDoc } from "firebase/firestore";
import User from "../models/User";
import { doc } from "../database/firestore";
import logError from "./logError";

type Exclude = "createdAt" | "updatedAt";
export type CreateUser = Omit<User, Exclude>;
export default async function createUser(data: CreateUser) {
  const formattedData: User = {
    ...data,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  try {
    setDoc(doc("users", data.id), formattedData);
  } catch (error) {
    logError(data.email, "creating new user", error);
  }
}
