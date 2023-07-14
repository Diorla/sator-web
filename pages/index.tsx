import Home from "../containers/Home";
import AuthLayout from "../containers/AuthLayout";

export default function HomePage() {
  return (
    <AuthLayout title="Sator - home">
      <Home />
    </AuthLayout>
  );
}
