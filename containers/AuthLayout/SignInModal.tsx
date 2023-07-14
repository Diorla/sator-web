import Button from "@mui/material/Button";
import { useState } from "react";
import { Grid, Modal, TextField, Typography } from "@mui/material";
import signIn from "../../services/signIn";
import logError from "../../services/logError";
import { ModalType } from "./Welcome";

export const initial = {
  email: "",
  password: "",
  confirmPassword: "",
};

export function SignInModal({
  openModal,
}: {
  openModal: (modal?: ModalType) => void;
}) {
  const [form, setForm] = useState(initial);

  const [error, setError] = useState(initial);

  const onSignIn = () => {
    const { email, password } = form;
    if (email && password) {
      signIn(email, password)
        .then(() => console.log("sign in confirmed"))
        .catch((err) => {
          const message = err.message;
          if (message.includes("auth/user-not-found"))
            setError({ ...initial, email: "Email not found" });
          else if (message.includes("auth/wrong-password"))
            setError({ ...initial, password: "Wrong password" });
          else logError(email, "signing in", err);
        });
    }
    if (!email && !password)
      setError({
        ...initial,
        email: "Email required",
        password: "Password required",
      });
    else if (!email) setError({ ...initial, email: "Email required" });
    else if (!password) setError({ ...initial, password: "Password required" });
  };

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
        Sign in
      </Typography>

      <TextField
        label="Email"
        type="email"
        variant="outlined"
        size="small"
        placeholder="example@email.com"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        sx={{ marginTop: 1 }}
        helperText={error.email}
        error={!!error.email}
        required
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        size="small"
        placeholder="********"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        sx={{ marginTop: 1 }}
        helperText={error.password}
        error={!!error.password}
        required
      />
      <Grid
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="text"
          onClick={() => openModal("forgotPassword")}
          sx={{
            textTransform: "unset",
          }}
        >
          Forgot password?
        </Button>
        <Button
          variant="text"
          onClick={() => openModal("signUp")}
          sx={{
            textTransform: "unset",
          }}
        >
          New account
        </Button>
      </Grid>
      <Grid sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="text" onClick={onSignIn}>
          Continue
        </Button>
      </Grid>
    </Grid>
  );
}
