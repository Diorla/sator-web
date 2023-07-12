import useUser from "../../context/user/useUser";
import Registration from "./Registration";
import PageRender from "./PageRender";
import Welcome from "./Welcome";

export default function Layout({
  title,
  children,
}: {
  title: string;
  children: any;
}) {
  const { loading, user } = useUser();

  console.log("user", user);
  if (loading) return <div>Loading...</div>;

  if (user?.name) return <PageRender title={title}>{children}</PageRender>;
  if (user) return <Registration />;
  return <Welcome />;
}
