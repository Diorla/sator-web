import {
  collection as col,
  getFirestore,
  doc as firebaseDoc,
  WhereFilterOp,
  where as whereFilter,
} from "firebase/firestore";
import Task from "../models/Task";
import createFirebaseApp from "../firebase/clientApp";

const app = createFirebaseApp();
const db = getFirestore(app);

export type Collection = "users" | "tasks" | "errors";

export const collection = (collectionName: Collection) => {
  return col(db, collectionName);
};

export function where(
  fieldPath: keyof Task,
  opStr: WhereFilterOp,
  value: string | number | boolean | null | string[]
) {
  return whereFilter(fieldPath, opStr, value);
}

export const doc = (collectionName: Collection, ...pathSegments: string[]) => {
  return firebaseDoc(db, collectionName, ...pathSegments);
};
