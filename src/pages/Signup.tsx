import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  email: z.string().trim().email("Invalid email").max(200),
  phone: z.string().trim().min(7, "Enter a valid phone").max(20).optional().or(z.literal("")),
  password: z.string().min(6, "At least 6 characters").max(100),
});

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    const res = signup(parsed.data);
    setLoading(false);
    if (res.ok) {
      toast.success("Account created — welcome!");
      navigate("/");
    } else {
      toast.error(res.error || "Signup failed");
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 grid place-items-center py-12">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="bg-card border border-border rounded-3xl p-8 shadow-soft">
            <h1 className="font-display text-3xl font-700 text-primary">Create your account</h1>
            <p className="text-sm text-muted-foreground mt-1">Save addresses, track orders, and earn rewards.</p>

            <form onSubmit={submit} className="mt-6 space-y-4">
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1.5" placeholder="+234..." />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="mt-1.5" />
              </div>
              <Button type="submit" disabled={loading} className="w-full h-11 gradient-leaf text-primary-foreground rounded-full">
                {loading ? "Creating..." : "Create account"}
              </Button>
            </form>

            <p className="text-sm text-muted-foreground mt-6 text-center">
              Already a customer? <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Signup;
