import Button from "@mui/material/Button";
import { useState } from "react";
import signUp from "../../services/signUp";
import { Grid, TextField, Typography } from "@mui/material";
import logError from "../../services/logError";
import { ModalType } from "./Welcome";

export const initial = {
  email: "",
  password: "",
  confirmPassword: "",
};

export function SignUpModal({
  openModal,
}: {
  openModal: (modal?: ModalType) => void;
}) {
  const [form, setForm] = useState(initial);

  const [error, setError] = useState(initial);
  const onSignUp = () => {
    const { email, password, confirmPassword } = form;
    if (email && password) {
      signUp(email, password)
        .then(() => console.log("sign in confirmed"))
        .catch((err) => {
          const message = err.message;
          if (message.includes("auth/email-already-in-use"))
            setError({ ...initial, email: "Email already in use" });
          else if (message.includes("auth/invalid-email"))
            setError({ ...initial, email: "Invalid email" });
          else logError(email, "signing up", err);
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
    else if (!confirmPassword)
      setError({ ...initial, confirmPassword: "Confirm password" });
    else if (password !== confirmPassword)
      setError({ ...initial, confirmPassword: "Password does not match" });
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
        Sign up
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
      <TextField
        label="Confirm Password"
        type="password"
        variant="outlined"
        size="small"
        placeholder="********"
        value={form.confirmPassword}
        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
        sx={{ marginTop: 1 }}
        helperText={error.confirmPassword}
        error={!!error.confirmPassword}
        required
      />
      <Grid
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="text"
          onClick={() => openModal("signIn")}
          sx={{
            textTransform: "unset",
          }}
        >
          Already a member
        </Button>
      </Grid>
      <Grid sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="text" onClick={onSignUp}>
          Continue
        </Button>
      </Grid>
    </Grid>
  );
}
