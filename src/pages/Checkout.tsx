import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrdersContext";
import { useAddresses, SavedAddress } from "@/context/AddressesContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { formatNGN } from "@/lib/format";
import { toast } from "sonner";
import { MapPin, Truck, CreditCard, Tag, Trash2, Pencil, Plus, X } from "lucide-react";
import { applyPromo, PromoResult, PROMOS } from "@/lib/promos";

const NIGERIAN_STATES = ["Lagos","Abuja (FCT)","Rivers","Oyo","Kano","Kaduna","Ogun","Enugu","Anambra","Delta","Edo","Plateau","Cross River","Akwa Ibom","Benue","Sokoto","Imo"];

const schema = z.object({
  fullName: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(7).max(20),
  email: z.string().trim().email().max(200),
  street: z.string().trim().min(5).max(200),
  city: z.string().trim().min(2).max(80),
  state: z.string().min(2).max(80),
});

const emptyForm = {
  label: "",
  fullName: "",
  phone: "",
  street: "",
  city: "",
  state: "Lagos",
};

const Checkout = () => {
  const { items, subtotal, clear } = useCart();
  const { user } = useAuth();
  const { place } = useOrders();
  const { addresses, add: addAddress, update: updateAddress, remove: removeAddress } = useAddresses();
  const navigate = useNavigate();

  const [selectedId, setSelectedId] = useState<string | null>(addresses[0]?.id ?? null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(addresses.length === 0);
  const [saveOnPlace, setSaveOnPlace] = useState(true);
  const [form, setForm] = useState({ ...emptyForm, fullName: user?.name || "", phone: user?.phone || "" });
  const [email, setEmail] = useState(user?.email || "");
  const [payment, setPayment] = useState<"pay-on-delivery" | "transfer">("pay-on-delivery");
  const [promoInput, setPromoInput] = useState("");
  const [promo, setPromo] = useState<PromoResult | null>(null);

  const baseDelivery = subtotal > 25000 ? 0 : 2500;
  const delivery = promo?.freeDelivery ? 0 : baseDelivery;
  const discount = promo?.discount || 0;
  const total = Math.max(0, subtotal - discount + delivery);

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

  const startEdit = (a: SavedAddress) => {
    setEditingId(a.id);
    setShowForm(true);
    setForm({ label: a.label || "", fullName: a.fullName, phone: a.phone, street: a.street, city: a.city, state: a.state });
  };

  const cancelForm = () => {
    setEditingId(null);
    setShowForm(false);
    setForm({ ...emptyForm, fullName: user?.name || "", phone: user?.phone || "" });
  };

  const tryApplyPromo = () => {
    const r = applyPromo(promoInput, subtotal, baseDelivery);
    if (!r.ok) { toast.error(r.error); return; }
    setPromo(r.result);
    toast.success(`Applied ${r.result.code} — ${r.result.label}`);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    let address: { fullName: string; phone: string; street: string; city: string; state: string };

    if (showForm || addresses.length === 0) {
      const parsed = schema.safeParse({ ...form, email });
      if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
      address = { fullName: parsed.data.fullName, phone: parsed.data.phone, street: parsed.data.street, city: parsed.data.city, state: parsed.data.state };
      if (editingId) updateAddress(editingId, { ...address, label: form.label });
      else if (saveOnPlace) addAddress({ ...address, label: form.label });
    } else {
      const sel = addresses.find((a) => a.id === selectedId);
      if (!sel) { toast.error("Select a delivery address"); return; }
      if (!email.trim()) { toast.error("Enter your email"); return; }
      address = { fullName: sel.fullName, phone: sel.phone, street: sel.street, city: sel.city, state: sel.state };
    }

    const order = place({
      userId: user?.id || null,
      customerEmail: email.trim(),
      items,
      address,
      subtotal,
      delivery,
      discount,
      promoCode: promo?.code,
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
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2 font-display text-xl font-700">
                  <MapPin className="w-5 h-5 text-primary" /> Delivery address
                </div>
                {addresses.length > 0 && !showForm && (
                  <Button type="button" variant="outline" size="sm" onClick={() => setShowForm(true)}>
                    <Plus className="w-4 h-4 mr-1" /> Add new
                  </Button>
                )}
              </div>

              {addresses.length > 0 && !showForm && (
                <RadioGroup value={selectedId || ""} onValueChange={setSelectedId} className="space-y-3">
                  {addresses.map((a) => (
                    <label key={a.id} className={`flex gap-3 p-4 rounded-2xl border cursor-pointer ${selectedId === a.id ? "border-primary bg-primary/5" : "border-border hover:border-primary"}`}>
                      <RadioGroupItem value={a.id} id={a.id} className="mt-1" />
                      <div className="flex-1 min-w-0 text-sm">
                        <div className="font-semibold flex items-center gap-2">
                          {a.fullName}
                          {a.label && <span className="text-xs px-2 py-0.5 rounded-full bg-accent/15 text-accent">{a.label}</span>}
                        </div>
                        <div className="text-muted-foreground">{a.phone}</div>
                        <div className="text-muted-foreground">{a.street}, {a.city}, {a.state}</div>
                      </div>
                      <div className="flex gap-1">
                        <Button type="button" variant="ghost" size="icon" onClick={(e) => { e.preventDefault(); startEdit(a); }}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button type="button" variant="ghost" size="icon" onClick={(e) => { e.preventDefault(); removeAddress(a.id); if (selectedId === a.id) setSelectedId(null); }}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </label>
                  ))}
                </RadioGroup>
              )}

              {showForm && (
                <div className="space-y-4">
                  {addresses.length > 0 && (
                    <div className="flex justify-between items-center">
                      <div className="font-semibold text-sm">{editingId ? "Edit address" : "New address"}</div>
                      <Button type="button" variant="ghost" size="sm" onClick={cancelForm}>
                        <X className="w-4 h-4 mr-1" /> Cancel
                      </Button>
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <Label>Label (optional)</Label>
                      <Input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} className="mt-1.5" placeholder="Home, Office..." />
                    </div>
                    <div>
                      <Label>Full name</Label>
                      <Input required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="mt-1.5" />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1.5" placeholder="+234..." />
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
                      <select value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                        {NIGERIAN_STATES.map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  {!editingId && (
                    <label className="flex items-center gap-2 text-sm">
                      <Checkbox checked={saveOnPlace} onCheckedChange={(v) => setSaveOnPlace(!!v)} />
                      Save this address for next time
                    </label>
                  )}
                </div>
              )}

              <div className="mt-5">
                <Label>Email</Label>
                <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" />
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

            <div className="space-y-2">
              <Label className="inline-flex items-center gap-1.5"><Tag className="w-3.5 h-3.5" /> Promo code</Label>
              {promo ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-leaf/10 border border-leaf/30 text-sm">
                  <div>
                    <div className="font-semibold text-leaf">{promo.code}</div>
                    <div className="text-xs text-muted-foreground">{promo.label}</div>
                  </div>
                  <Button type="button" variant="ghost" size="sm" onClick={() => { setPromo(null); setPromoInput(""); }}>
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input value={promoInput} onChange={(e) => setPromoInput(e.target.value)} placeholder="Enter code" className="uppercase" />
                  <Button type="button" variant="outline" onClick={tryApplyPromo}>Apply</Button>
                </div>
              )}
              {!promo && (
                <div className="text-[11px] text-muted-foreground">
                  Try: {PROMOS.map((p) => p.code).join(", ")}
                </div>
              )}
            </div>

            <div className="my-5 border-t border-border" />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatNGN(subtotal)}</span></div>
              {discount > 0 && (
                <div className="flex justify-between text-leaf"><span>Discount ({promo?.code})</span><span>−{formatNGN(discount)}</span></div>
              )}
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
