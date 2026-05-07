import { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useAuth } from "@/context/AuthContext";
import { useOrders, OrderStatus, Order } from "@/context/OrdersContext";
import { PRODUCTS } from "@/data/products";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { formatNGN } from "@/lib/format";
import { Package, Users, ShoppingBag, ShieldCheck, ShieldOff, Search, X, MessageSquarePlus, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const STATUSES: OrderStatus[] = ["pending", "confirmed", "out-for-delivery", "delivered", "cancelled"];
const PAGE_SIZE = 10;

const Admin = () => {
  const { user, users, setRole } = useAuth();
  const { orders, setStatus, addTrackingNote } = useOrders();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(1);
  const [trackingFor, setTrackingFor] = useState<Order | null>(null);
  const [trackingNote, setTrackingNote] = useState("");

  const filteredOrders = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter((o) => {
      if (statusFilter !== "all" && o.status !== statusFilter) return false;
      if (q) {
        const hay = `${o.id} ${o.address.fullName} ${o.address.phone} ${o.customerEmail}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      const created = new Date(o.createdAt).getTime();
      if (fromDate && created < new Date(fromDate).getTime()) return false;
      if (toDate && created > new Date(toDate).getTime() + 86400000 - 1) return false;
      return true;
    });
  }, [orders, query, statusFilter, fromDate, toDate]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pagedOrders = filteredOrders.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const startIdx = filteredOrders.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const endIdx = Math.min(currentPage * PAGE_SIZE, filteredOrders.length);

  const clearFilters = () => { setQuery(""); setStatusFilter("all"); setFromDate(""); setToDate(""); setPage(1); };

  const submitTrackingNote = () => {
    if (!trackingFor || !trackingNote.trim()) return;
    addTrackingNote(trackingFor.id, trackingNote.trim());
    toast.success("Tracking note added");
    setTrackingNote("");
    setTrackingFor(null);
  };

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="container py-32 text-center">
          <ShieldOff className="w-12 h-12 text-destructive mx-auto mb-3" />
          <h1 className="font-display text-3xl">Admin access required</h1>
          <p className="text-muted-foreground mt-2">Sign in with an admin account to view this page.</p>
        </div>
        <Footer />
      </main>
    );
  }

  const totalRevenue = orders.filter((o) => o.status !== "cancelled").reduce((a, o) => a + o.total, 0);

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="container py-12">
        <div className="flex items-center gap-3 mb-2">
          <ShieldCheck className="w-8 h-8 text-primary" />
          <h1 className="font-display text-4xl font-700 text-primary">Admin dashboard</h1>
        </div>
        <p className="text-muted-foreground">Manage orders, products and users.</p>

        {/* Stats */}
        <div className="mt-8 grid sm:grid-cols-4 gap-4">
          {[
            { label: "Total orders", value: orders.length, icon: Package },
            { label: "Revenue", value: formatNGN(totalRevenue), icon: ShoppingBag },
            { label: "Customers", value: users.filter((u) => u.role === "customer").length, icon: Users },
            { label: "Products", value: PRODUCTS.length, icon: Package },
          ].map((s) => (
            <div key={s.label} className="p-5 rounded-2xl bg-card border border-border">
              <s.icon className="w-5 h-5 text-primary mb-2" />
              <div className="text-xs text-muted-foreground">{s.label}</div>
              <div className="font-display text-2xl font-700">{s.value}</div>
            </div>
          ))}
        </div>

        <Tabs defaultValue="orders" className="mt-10">
          <TabsList>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="mt-6 space-y-4">
            <div className="p-4 rounded-2xl border border-border bg-card grid md:grid-cols-[1fr_180px_160px_160px_auto] gap-3 items-end">
              <div>
                <Label className="text-xs">Search</Label>
                <div className="relative mt-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Order #, name, phone, email" className="pl-9" />
                </div>
              </div>
              <div>
                <Label className="text-xs">Status</Label>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)} className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                  <option value="all">All statuses</option>
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <Label className="text-xs">From</Label>
                <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label className="text-xs">To</Label>
                <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="mt-1" />
              </div>
              <Button type="button" variant="outline" onClick={clearFilters}>
                <X className="w-4 h-4 mr-1" /> Clear
              </Button>
            </div>

            <div className="text-xs text-muted-foreground">Showing {filteredOrders.length} of {orders.length} orders</div>

            {filteredOrders.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground bg-card rounded-2xl border border-border">No orders match your filters.</div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-border bg-card">
                <table className="w-full text-sm">
                  <thead className="bg-muted text-left">
                    <tr>
                      <th className="p-3">Order</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Items</th>
                      <th className="p-3">Total</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((o) => (
                      <tr key={o.id} className="border-t border-border">
                        <td className="p-3 font-mono text-xs">{o.id}</td>
                        <td className="p-3">
                          <div className="font-medium">{o.address.fullName}</div>
                          <div className="text-xs text-muted-foreground">{o.address.phone}</div>
                          <div className="text-xs text-muted-foreground">{o.customerEmail}</div>
                        </td>
                        <td className="p-3">{o.items.length}</td>
                        <td className="p-3 font-semibold">{formatNGN(o.total)}</td>
                        <td className="p-3 text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleDateString()}</td>
                        <td className="p-3">
                          <select
                            value={o.status}
                            onChange={(e) => { setStatus(o.id, e.target.value as OrderStatus); toast.success(`Order ${o.id} → ${e.target.value}`); }}
                            className="h-8 rounded-md border border-border bg-background px-2 text-xs"
                          >
                            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="products" className="mt-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PRODUCTS.map((p) => (
                <div key={p.id} className="p-4 rounded-2xl border border-border bg-card flex gap-3">
                  <img src={p.img} alt={p.name} className="w-16 h-16 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.category} · {p.origin}</div>
                    <div className="font-display font-700 text-primary mt-1">{formatNGN(p.price)}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Product editing requires a backend. Enable Lovable Cloud to add/edit/delete products with persistence.
            </p>
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <div className="overflow-x-auto rounded-2xl border border-border bg-card">
              <table className="w-full text-sm">
                <thead className="bg-muted text-left">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Joined</th>
                    <th className="p-3">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-t border-border">
                      <td className="p-3 font-medium">{u.name}</td>
                      <td className="p-3 text-muted-foreground">{u.email}</td>
                      <td className="p-3 text-xs text-muted-foreground">{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td className="p-3">
                        <select
                          value={u.role}
                          onChange={(e) => { setRole(u.id, e.target.value as any); toast.success(`${u.name} → ${e.target.value}`); }}
                          disabled={u.id === user.id}
                          className="h-8 rounded-md border border-border bg-background px-2 text-xs disabled:opacity-60"
                        >
                          <option value="customer">customer</option>
                          <option value="admin">admin</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </section>
      <Footer />
    </main>
  );
};

export default Admin;
