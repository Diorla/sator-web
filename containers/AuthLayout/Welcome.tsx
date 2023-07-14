import Button from "@mui/material/Button";
import { useState } from "react";
import {
  AppBar,
  Box,
  Grid,
  Modal,
  TextField,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import { SignInModal } from "./SignInModal";
import { SignUpModal } from "./SignUpModal";
import { ForgotPasswordModal } from "./ForgotPasswordModal";

export const initial = {
  email: "",
  password: "",
  confirmPassword: "",
};

const Landing = styled(Grid)`
  background-image: url(alarm.jpg);
  width: 100%;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
`;

export type ModalType =
  | "signIn"
  | "signUp"
  | "forgotPassword"
  | "resetConfirmed";

const FormModal = ({
  modal,
  openModal,
}: {
  modal: ModalType;
  openModal: (modal?: ModalType) => void;
}) => {
  // const [form, setForm] = useState(initial);

  if (modal === "signIn") return <SignInModal openModal={openModal} />;
  if (modal === "signUp") return <SignUpModal openModal={openModal} />;
  if (modal === "forgotPassword")
    return <ForgotPasswordModal openModal={openModal} />;

  return null;
};

export default function Welcome() {
  const [modal, setModal] = useState<ModalType>();

  console.log("modal", modal);

  // TODO: Add toggle visibility to input
  return (
    <Landing>
      <AppBar
        component="nav"
        sx={{ backgroundColor: "#fff" }}
        position="static"
      >
        <Toolbar>
          <Typography variant="h1" sx={{ flexGrow: 1 }}>
            Sator
          </Typography>
          <Box>
            <Button onClick={() => setModal("signIn")}>Sign in</Button>
            <Button variant="contained" onClick={() => setModal("signUp")}>
              Sign up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: {
            xs: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            minHeight: "calc(100vh - 64px)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ textShadow: "0 0 white" }}>
            Scheduling done the right way
          </Typography>
          <Button variant="contained" color="secondary">
            Learn more
          </Button>
        </Box>
      </Box>

      <Modal
        open={!!modal}
        onClose={() => setModal(undefined)}
        sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}
      >
        <FormModal modal={modal} openModal={setModal} />
      </Modal>
    </Landing>
  );
}
