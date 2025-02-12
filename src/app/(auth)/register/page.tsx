import AuthForm from "@/components/auth/AuthForm";

export default function RegisterPage() {
  const handleSubmit = async (values: { email: string; password: string; name: string }) => {
    // Hardcoded registration - replace with actual API call
    console.log("Registration values:", values);
  };

  return <AuthForm type="register" onSubmit={handleSubmit} />;
}