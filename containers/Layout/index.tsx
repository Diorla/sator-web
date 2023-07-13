import useUser from "../../context/user/useUser";
import Registration from "./Registration";
import PageRender from "./PageRender";
import Welcome from "./Welcome";
import { Box, CircularProgress } from "@mui/material";

export default function Layout({
  title,
  children,
}: {
  title: string;
  children: any;
}) {
  const { loading, user } = useUser();

  console.log("user", user);
  if (loading)
    return (
      <PageRender title={title}>
        <Box
          style={{
            height: "calc(100vh - 64px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </PageRender>
    );

  if (user?.name) return <PageRender title={title}>{children}</PageRender>;
  if (user) return <Registration />;
  return <Welcome />;
}
