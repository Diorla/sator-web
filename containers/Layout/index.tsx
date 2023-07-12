import { useState } from "react";
import useUser from "../../context/user/useUser";
import Button from "../../components/Button";
import signUp from "../../services/signUp";
import Welcome from "./Welcome";
import PageRender from "./PageRender";

export default function Layout({
  title,
  children,
}: {
  title: string;
  children: any;
}) {
  const { loading, user } = useUser();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  console.log("user", user);
  if (loading) return <div>Loading...</div>;

  if (user?.name) return <PageRender title={title}>{children}</PageRender>;
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
