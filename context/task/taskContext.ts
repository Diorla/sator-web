import { createContext } from "react";

const taskContext = createContext({
  tasks: [],
  loading: true,
  error: null,
  completed: [],
  uncompleted: [],
});

export default taskContext;
