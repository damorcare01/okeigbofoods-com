import { Link, useParams } from "react-router-dom";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useOrders } from "@/context/OrdersContext";
import { CheckCircle2, Package } from "lucide-react";
import { formatNGN } from "@/lib/format";

const OrderConfirmation = () => {
  const { id } = useParams<{ id: string }>();
  const { orders } = useOrders();
  const order = orders.find((o) => o.id === id);

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="container py-16 max-w-2xl">
        <div className="text-center">
          <div className="inline-grid place-items-center w-20 h-20 rounded-full bg-leaf/15 text-leaf mb-5">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="font-display text-4xl font-700 text-primary">Order placed!</h1>
          <p className="text-muted-foreground mt-2">
            Thank you. We'll send a confirmation to {order?.customerEmail}.
          </p>
        </div>

        {order && (
          <div className="mt-8 bg-card border border-border rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="font-display text-lg font-700">Order #{order.id}</div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-accent/15 text-accent uppercase">
                {order.status}
              </span>
            </div>

            <div className="space-y-2 text-sm mb-5">
              {order.items.map((it) => (
                <div key={it.product.id} className="flex justify-between">
                  <span>{it.qty} × {it.product.name}</span>
                  <span className="font-semibold">{formatNGN(it.qty * it.product.price)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatNGN(order.subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{order.delivery === 0 ? "FREE" : formatNGN(order.delivery)}</span></div>
              <div className="flex justify-between font-display font-700 text-lg pt-2 border-t border-border">
                <span>Total</span><span className="text-primary">{formatNGN(order.total)}</span>
              </div>
            </div>

            <div className="mt-5 p-4 rounded-2xl bg-muted text-sm">
              <div className="font-semibold mb-1 inline-flex items-center gap-2"><Package className="w-4 h-4" /> Delivering to</div>
              <div className="text-muted-foreground">
                {order.address.fullName} · {order.address.phone}<br />
                {order.address.street}, {order.address.city}, {order.address.state}
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex gap-3 justify-center">
          <Link to="/shop" className="px-6 py-3 rounded-full border border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground">
            Continue shopping
          </Link>
          <Link to="/account" className="px-6 py-3 rounded-full gradient-leaf text-primary-foreground font-semibold">
            View my orders
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default OrderConfirmation;
