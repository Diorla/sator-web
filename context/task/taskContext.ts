import { createContext } from "react";

const taskContext = createContext({
  tasks: [],
  loading: true,
  error: null,
});

export default taskContext;
