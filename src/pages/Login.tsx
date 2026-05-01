import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = login(email, password);
    setLoading(false);
    if (res.ok) {
      toast.success("Welcome back!");
      navigate("/");
    } else {
      toast.error(res.error || "Login failed");
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 grid place-items-center py-12">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="bg-card border border-border rounded-3xl p-8 shadow-soft">
            <h1 className="font-display text-3xl font-700 text-primary">Welcome back</h1>
            <p className="text-sm text-muted-foreground mt-1">Sign in to your account to continue.</p>

            <form onSubmit={submit} className="mt-6 space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" placeholder="you@example.com" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5" />
              </div>
              <Button type="submit" disabled={loading} className="w-full h-11 gradient-leaf text-primary-foreground rounded-full">
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <p className="text-sm text-muted-foreground mt-6 text-center">
              No account? <Link to="/signup" className="text-primary font-semibold hover:underline">Create one</Link>
            </p>

            <div className="mt-6 p-3 rounded-xl bg-muted text-xs text-muted-foreground">
              <strong className="text-foreground">Demo admin:</strong> admin@okeigbofoods.ng / admin123
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Login;
