import { Link, Navigate } from "react-router-dom";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrdersContext";
import { formatNGN } from "@/lib/format";
import { OrderTracker } from "@/components/site/OrderTracker";

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
            <div className="space-y-5">
              {myOrders.map((o) => (
                <div key={o.id} className="p-6 rounded-2xl border border-border bg-card">
                  <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
                    <div>
                      <div className="font-display font-700 text-lg">#{o.id}</div>
                      <div className="text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleString()}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">{o.items.length} item{o.items.length !== 1 && "s"}</div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-accent/15 text-accent uppercase">{o.status}</span>
                  </div>
                  <OrderTracker status={o.status} />
                  <div className="mt-5 flex flex-wrap gap-2">
                    {o.items.slice(0, 5).map((it) => (
                      <img key={it.product.id} src={it.product.img} alt={it.product.name} className="w-12 h-12 rounded-lg object-cover border border-border" title={`${it.qty} × ${it.product.name}`} />
                    ))}
                    {o.items.length > 5 && <div className="w-12 h-12 rounded-lg grid place-items-center bg-muted text-xs font-semibold">+{o.items.length - 5}</div>}
                  </div>
                  <div className="mt-5 grid sm:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatNGN(o.subtotal)}</span></div>
                      {o.discount && o.discount > 0 ? (
                        <div className="flex justify-between text-leaf">
                          <span>Promo {o.promoCode ? `(${o.promoCode})` : ""}</span>
                          <span>−{formatNGN(o.discount)}</span>
                        </div>
                      ) : null}
                      <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{o.delivery === 0 ? "FREE" : formatNGN(o.delivery)}</span></div>
                      <div className="flex justify-between font-display font-700 pt-1 border-t border-border"><span>Total</span><span className="text-primary">{formatNGN(o.total)}</span></div>
                    </div>
                    {o.tracking && o.tracking.length > 0 && (
                      <div className="rounded-xl bg-muted/60 p-3">
                        <div className="text-xs font-semibold text-muted-foreground mb-1">Tracking updates</div>
                        <ul className="space-y-1 text-xs max-h-28 overflow-auto">
                          {[...o.tracking].reverse().map((t, i) => (
                            <li key={i}>
                              <span className="font-semibold">{t.status}</span>
                              {t.note && <> · {t.note}</>}
                              <span className="text-muted-foreground"> · {new Date(t.at).toLocaleString()}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <Link to={`/order-confirmation/${o.id}`} className="text-sm font-semibold text-primary hover:underline">
                      View receipt →
                    </Link>
                  </div>
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
