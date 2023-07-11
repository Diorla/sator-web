import { useState } from "react";
import useUser from "../context/user/useUser";
import signIn from "../services/signIn";

export default function Home() {
  const { loading, user } = useUser();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  if (loading) return <div>Loading...</div>;

  if (user) return <div>Hello there: {user?.name}</div>;
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
      <button onClick={() => signIn(form.email, form.password)}>Login</button>
    </div>
  );
}
