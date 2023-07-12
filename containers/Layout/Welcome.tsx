import Button from "@mui/material/Button";
import { useState } from "react";
import signUp from "../../services/signUp";
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
import signIn from "../../services/signIn";
import logError from "../../services/logError";

const Landing = styled(Grid)`
  background-image: url(alarm.jpg);
  width: 100%;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
`;

const initial = {
  email: "",
  password: "",
  confirmPassword: "",
};
export default function Welcome() {
  const [form, setForm] = useState(initial);

  const [error, setError] = useState(initial);
  const [open, setOpen] = useState("");

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
    else setError({ ...initial, password: "Password required" });
  };

  // TODO: Add more checks
  /**
   * This includes weak passwords
   */
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
  // TODO: Add toggle visibility to input
  return (
    <Landing>
      <AppBar
        component="nav"
        sx={{ backgroundColor: "#fff" }}
        position="static"
      >
        <Toolbar>
          <Typography
            variant="h1"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Sator
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button onClick={() => setOpen("signIn")}>Sign in</Button>
            <Button variant="contained" onClick={() => setOpen("signUp")}>
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
        <Box>
          <Typography>Scheduling done the right way</Typography>
          <Button variant="contained" color="secondary">
            Learn more
          </Button>
        </Box>
      </Box>
      <Modal
        open={!!open}
        onClose={() => setOpen("")}
        sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}
      >
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
            {open === "signIn" ? "Sign in" : "Sign up"}
          </Typography>

          <TextField
            label="Email"
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
          {open === "signUp" && (
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              size="small"
              placeholder="********"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              sx={{ marginTop: 1 }}
              helperText={error.confirmPassword}
              error={!!error.confirmPassword}
              required
            />
          )}
          <Grid
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {open === "signIn" ? (
              <Button
                variant="text"
                onClick={() => setOpen("signUp")}
                sx={{
                  textTransform: "unset",
                }}
              >
                New account
              </Button>
            ) : (
              <Button
                variant="text"
                onClick={() => setOpen("signIn")}
                sx={{
                  textTransform: "unset",
                }}
              >
                Already a member
              </Button>
            )}
          </Grid>
          <Grid sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="text"
              onClick={open === "signIn" ? onSignIn : onSignUp}
            >
              Continue
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </Landing>
  );
}
