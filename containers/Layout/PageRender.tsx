import Head from "next/head";
import Link from "next/link";
import TaskProvider from "../../context/task";
import Button from "@mui/material/Button";
import signOut from "../../services/signOut";

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
      <div className="app-bar">
        <Link href="/">Home</Link>
        <div className="links">
          <Link href="/profile">Profile</Link>
          <Link href="/tasks">Tasks</Link>
          <Link href="/stats">Stats</Link>
          <Link href="/help">Help</Link>
          <Link href="/credits">Credits</Link>
          <Button onClick={() => signOut()}>Logout</Button>
        </div>
      </div>
      <div className="page-container">{children}</div>
      <style jsx>{`
        .app-bar {
          height: 40px;
          margin: 0;
          position: sticky;
          top: 0;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 0 10px;
        }
        .links {
          flex: 1;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          max-width: 400px;
          align-items: center;
        }

        .page-container {
          min-height: calc(100vh - 40px);
        }
      `}</style>
    </TaskProvider>
  );
}
