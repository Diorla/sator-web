import Button from "@mui/material/Button";
import { useState } from "react";
import { Grid, Modal, TextField, Typography } from "@mui/material";
import resetPassword from "../../services/resetPassword";
import { ModalType } from "./Welcome";

export const initial = {
  email: "",
  password: "",
  confirmPassword: "",
};

export function ForgotPasswordModal({
  openModal,
}: {
  openModal: (modal?: ModalType) => void;
}) {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);

  if (isSent)
    return (
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            background: "#fff",
            padding: "20px",
            width: `clamp(320px, 80%, 540px)`,
          }}
        >
          <Typography variant="h2" sx={{ textAlign: "center" }}>
            Check your email
          </Typography>
          <Typography>We sent a password reset link to {email}</Typography>
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography>Didn't receive an email? </Typography>
            <Button
              variant="text"
              onClick={() => openModal("signIn")}
              sx={{
                textTransform: "unset",
              }}
            >
              Click to resend
            </Button>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="text"
              onClick={() => openModal("signIn")}
              sx={{
                textTransform: "unset",
              }}
            >
              Back to login
            </Button>
          </Grid>
        </Grid>
    );
  return (
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          background: "#fff",
          padding: "20px",
          width: `clamp(320px, 80%, 540px)`,
        }}
      >
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          Reset password
        </Typography>
        <Typography>
          No worries, we'll send you an email to reset your password
        </Typography>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          size="small"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginTop: 1 }}
          required
        />

        <Grid
          sx={{
            display: "flex",
          }}
        >
          <Button
            variant="text"
            onClick={() => openModal("signIn")}
            sx={{
              textTransform: "unset",
            }}
          >
            Back to login
          </Button>
        </Grid>
        <Grid sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="text"
            onClick={() => resetPassword(email).then(() => setIsSent(true))}
          >
            Continue
          </Button>
        </Grid>
      </Grid>
  );
}
