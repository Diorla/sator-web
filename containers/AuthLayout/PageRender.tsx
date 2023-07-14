import Head from "next/head";
import TaskProvider from "../../context/task";
import Nav from "./Nav";

export default function PageRender({
  title,
  children,
}: {
  title: string;
  children: any;
}) {
  return (
    <TaskProvider>
      <Head>
        <title>{title}</title>
      </Head>
      <Nav>{children}</Nav>
    </TaskProvider>
  );
}
