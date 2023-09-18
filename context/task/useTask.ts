import { useContext } from "react";
import taskContext from "./taskContext";
import Schedule from "../../types/Schedule";

export default function useTask() {
  interface TaskContext {
    /**
     * All the tasks of the user
     */
    tasks: Schedule[];
    /**
     * If there is an error
     */
    error: Error;
    /**
     * Still retrieving the tasks
     */
    loading: boolean;
  }

  return useContext<TaskContext>(taskContext);
}
