import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrdersContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatNGN } from "@/lib/format";
import { toast } from "sonner";
import { MapPin, Truck, CreditCard } from "lucide-react";

const NIGERIAN_STATES = ["Lagos","Abuja (FCT)","Rivers","Oyo","Kano","Kaduna","Ogun","Enugu","Anambra","Delta","Edo","Plateau","Cross River","Akwa Ibom","Benue","Sokoto","Imo"];

const schema = z.object({
  fullName: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(7).max(20),
  email: z.string().trim().email().max(200),
  street: z.string().trim().min(5).max(200),
  city: z.string().trim().min(2).max(80),
  state: z.string().min(2).max(80),
});

const Checkout = () => {
  const { items, subtotal, clear } = useCart();
  const { user } = useAuth();
  const { place } = useOrders();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
    street: "",
    city: "",
    state: "Lagos",
  });
  const [payment, setPayment] = useState<"pay-on-delivery" | "transfer">("pay-on-delivery");

  const delivery = subtotal > 25000 ? 0 : 2500;
  const total = subtotal + delivery;

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="container py-32 text-center">
          <h1 className="font-display text-3xl">Your basket is empty</h1>
          <Link to="/shop" className="mt-4 inline-block px-6 py-3 rounded-full gradient-leaf text-primary-foreground font-semibold">
            Start shopping
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    const order = place({
      userId: user?.id || null,
      customerEmail: parsed.data.email,
      items,
      address: {
        fullName: parsed.data.fullName,
        phone: parsed.data.phone,
        street: parsed.data.street,
        city: parsed.data.city,
        state: parsed.data.state,
      },
      subtotal,
      delivery,
      total,
      paymentMethod: payment,
    });
    clear();
    navigate(`/order-confirmation/${order.id}`);
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="container py-12">
        <h1 className="font-display text-4xl font-700 text-primary mb-8">Checkout</h1>

        <form onSubmit={submit} className="grid lg:grid-cols-[1fr_400px] gap-8">
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-3xl p-6">
              <div className="flex items-center gap-2 font-display text-xl font-700 mb-5">
                <MapPin className="w-5 h-5 text-primary" /> Delivery address
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Full name</Label>
                  <Input required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="mt-1.5" />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1.5" placeholder="+234..." />
                </div>
                <div className="sm:col-span-2">
                  <Label>Email</Label>
                  <Input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5" />
                </div>
                <div className="sm:col-span-2">
                  <Label>Street address</Label>
                  <Input required value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} className="mt-1.5" placeholder="House number, street, area" />
                </div>
                <div>
                  <Label>City</Label>
                  <Input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="mt-1.5" />
                </div>
                <div>
                  <Label>State</Label>
                  <select
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  >
                    {NIGERIAN_STATES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-3xl p-6">
              <div className="flex items-center gap-2 font-display text-xl font-700 mb-5">
                <CreditCard className="w-5 h-5 text-primary" /> Payment
              </div>
              <RadioGroup value={payment} onValueChange={(v) => setPayment(v as any)}>
                <label className="flex items-center gap-3 p-4 rounded-2xl border border-border cursor-pointer hover:border-primary">
                  <RadioGroupItem value="pay-on-delivery" id="pod" />
                  <div>
                    <div className="font-semibold">Pay on delivery</div>
                    <div className="text-xs text-muted-foreground">Cash or card to our delivery rider</div>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 rounded-2xl border border-border cursor-pointer hover:border-primary">
                  <RadioGroupItem value="transfer" id="tr" />
                  <div>
                    <div className="font-semibold">Bank transfer</div>
                    <div className="text-xs text-muted-foreground">Account details sent after order</div>
                  </div>
                </label>
              </RadioGroup>
            </div>
          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-32 self-start bg-card border border-border rounded-3xl p-6 h-fit">
            <div className="font-display text-xl font-700 mb-5">Order summary</div>
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {items.map((it) => (
                <div key={it.product.id} className="flex gap-3 text-sm">
                  <img src={it.product.img} alt={it.product.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{it.product.name}</div>
                    <div className="text-xs text-muted-foreground">Qty {it.qty} × {formatNGN(it.product.price)}</div>
                  </div>
                  <div className="font-semibold">{formatNGN(it.product.price * it.qty)}</div>
                </div>
              ))}
            </div>
            <div className="my-5 border-t border-border" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatNGN(subtotal)}</span></div>
              <div className="flex justify-between">
                <span className="text-muted-foreground inline-flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> Delivery</span>
                <span>{delivery === 0 ? <span className="text-leaf font-semibold">FREE</span> : formatNGN(delivery)}</span>
              </div>
              <div className="flex justify-between font-display font-700 text-xl pt-3 border-t border-border">
                <span>Total</span><span className="text-primary">{formatNGN(total)}</span>
              </div>
            </div>
            <Button type="submit" className="w-full h-12 mt-5 gradient-leaf text-primary-foreground rounded-full text-base">
              Place order
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-3">
              By placing order you agree to our terms.
            </p>
          </aside>
        </form>
      </section>
      <Footer />
    </main>
  );
};

export default Checkout;
