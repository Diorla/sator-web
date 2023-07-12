import { useState } from "react";
import useUser from "../../context/user/useUser";
import Button from "../../components/Button";
import signUp from "../../services/signUp";
import useTheme from "../../context/theme/useTheme";
import Welcome from "./Welcome";

export default function Layout() {
  const { loading, user } = useUser();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { palette, main } = useTheme();

  console.log("user", user);
  if (loading) return <div>Loading...</div>;

  if (user?.name) return <div>Hello there: {user?.name}</div>;
  if (user) return <Welcome />;
  return (
    <div>
      <h1>You are not logged in!</h1>
      <input
        value={form.email}
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
      />
      <input
        value={form.password}
        onChange={(e) =>
          setForm({
            ...form,
            password: e.target.value,
          })
        }
      />
      <Button onClick={() => signUp(form.email, form.password)}>Login</Button>
    </div>
  );
}
