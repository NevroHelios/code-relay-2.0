import AuthForm from "@/components/auth/AuthForm";

export default function LoginPage() {
  const handleSubmit = async (values: { email: string; password: string }) => {
    // Hardcoded authentication - replace with actual API call
    console.log("Login values:", values);
  };

  return <AuthForm type="login" onSubmit={handleSubmit} />;
}