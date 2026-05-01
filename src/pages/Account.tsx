import { Link, Navigate } from "react-router-dom";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrdersContext";
import { formatNGN } from "@/lib/format";

const Account = () => {
  const { user } = useAuth();
  const { orders } = useOrders();

  if (!user) return <Navigate to="/login" replace />;

  const myOrders = orders.filter((o) => o.userId === user.id || o.customerEmail === user.email);

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="container py-12">
        <h1 className="font-display text-4xl font-700 text-primary">My account</h1>
        <p className="text-muted-foreground mt-1">{user.name} · {user.email}</p>

        <div className="mt-10">
          <h2 className="font-display text-2xl font-700 mb-4">My orders</h2>
          {myOrders.length === 0 ? (
            <div className="p-8 rounded-3xl bg-card border border-border text-center text-muted-foreground">
              No orders yet. <Link to="/shop" className="text-primary underline">Start shopping</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {myOrders.map((o) => (
                <div key={o.id} className="p-5 rounded-2xl border border-border bg-card flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <div className="font-display font-700">#{o.id}</div>
                    <div className="text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="text-sm">{o.items.length} item{o.items.length !== 1 && "s"}</div>
                  <div className="font-display font-700 text-primary">{formatNGN(o.total)}</div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-accent/15 text-accent uppercase">{o.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Account;
