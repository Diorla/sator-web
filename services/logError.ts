/* eslint-disable no-console */
import { setDoc, Timestamp } from "firebase/firestore";
import { v4 } from "uuid";
import { doc } from "../database/firestore";

/**
 * It will be used to save errors to database
 * @param identifier This will be used to identify the user that generated the error
 * @param event the activity that generated the error
 * @param err the error that was generated
 */
export default function logError(
  identifier: string,
  event: string,
  err: Error
) {
  try {
    if (process.env.NODE_ENV === "development")
      console.log({
        identifier: identifier || "Anonymous",
        event: event || "Unidentified error",
        name: err?.name,
        message: err?.message,
        stack: err?.stack,
        time: Date.now(),
        err: err,
      });
    else
      setDoc(doc("errors", v4()), {
        err: JSON.stringify(err),
        identifier: identifier || "Anonymous",
        event: event || "Unidentified error",
        name: JSON.stringify(err?.name),
        message: JSON.stringify(err?.message),
        stack: JSON.stringify(err?.stack),
        time: Timestamp.now(),
      });
  } catch (error) {
    console.log(error);
    console.log("hopefully the developer caught this error");
  }
}
