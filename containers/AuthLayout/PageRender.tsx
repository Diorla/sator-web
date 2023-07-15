import Head from "next/head";
import TaskProvider from "../../context/task";
import Nav from "./Nav";
import { Fab, Modal } from "@mui/material";
import Add from "@mui/icons-material/Add";
import { TaskModal } from "./TaskModal";
import { useState } from "react";

export default function PageRender({
  title,
  children,
}: {
  title: string;
  children: any;
}) {
  const [open, setOpen] = useState(false);
  return (
    <TaskProvider>
      <Head>
        <title>{title}</title>
      </Head>
      <Nav>{children}</Nav>
      <Fab
        variant="extended"
        color="secondary"
        aria-label="add"
        style={{ right: "1rem", bottom: "1rem", position: "fixed" }}
        onClick={() => setOpen(!open)}
      >
        <Add /> New Task
      </Fab>
      <Modal
        open={open}
        onClose={() => setOpen(!open)}
        sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}
      >
        <TaskModal openModal={() => setOpen(!open)} />
      </Modal>
    </TaskProvider>
  );
}
