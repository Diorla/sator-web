import useUser from "../../context/user/useUser";
import Registration from "./Registration";
import PageRender from "./PageRender";
import Welcome from "./Welcome";
import { Box, CircularProgress } from "@mui/material";

/**
 * This wraps the whole application in a layout.
 * This only applies to pages that are protected by authentication.
 * @param param0
 * @returns
 */
export default function AuthLayout({
  title,
  children,
}: {
  title: string;
  children: any;
}) {
  const { loading, user } = useUser();

  if (loading)
    return (
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
    );

  if (user?.name) return <PageRender title={title}>{children}</PageRender>;
  if (user) return <Registration />;
  return <Welcome />;
}
