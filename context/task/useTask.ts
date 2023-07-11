import { useContext } from "react";
import taskContext from "./taskContext";
import { Schedule } from "../../utils/getSchedule";
import Task from "../../models/Task";

export default function useTask() {
  interface TaskContext {
    /**
     * All the tasks of the user
     */
    tasks: Task[];
    /**
     * If there is an error
     */
    error: Error;
    /**
     * Still retrieving the tasks
     */
    loading: boolean;
    /**
     * The tasks that are completed, and the tasks that are not.
     * All shows the ones that are due
     */
    completed: Schedule[];
    uncompleted: Schedule[];
  }

  return useContext<TaskContext>(taskContext);
}
