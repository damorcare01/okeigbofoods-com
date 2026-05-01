import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatNGN } from "@/lib/format";

export const CartDrawer = () => {
  const { items, open, setOpen, remove, setQty, subtotal, count } = useCart();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">Your Basket ({count})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-3">
            <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            <p className="text-muted-foreground">Your basket is empty.</p>
            <Button onClick={() => setOpen(false)} variant="outline">Keep shopping</Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {items.map((it) => (
                <div key={it.product.id} className="flex gap-3 p-3 rounded-2xl border border-border bg-card">
                  <img src={it.product.img} alt={it.product.name} className="w-16 h-16 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{it.product.name}</div>
                    <div className="text-xs text-muted-foreground">{formatNGN(it.product.price)} / {it.product.unit}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={() => setQty(it.product.id, it.qty - 1)} className="grid place-items-center w-7 h-7 rounded-full border border-border hover:bg-muted">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-semibold w-6 text-center">{it.qty}</span>
                      <button onClick={() => setQty(it.product.id, it.qty + 1)} className="grid place-items-center w-7 h-7 rounded-full border border-border hover:bg-muted">
                        <Plus className="w-3 h-3" />
                      </button>
                      <button onClick={() => remove(it.product.id)} className="ml-auto text-destructive hover:opacity-80">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm font-display font-700 text-primary">
                    {formatNGN(it.product.price * it.qty)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-display font-700 text-lg">{formatNGN(subtotal)}</span>
              </div>
              <Link to="/checkout" onClick={() => setOpen(false)}>
                <Button className="w-full gradient-leaf text-primary-foreground rounded-full h-12 text-base">
                  Checkout
                </Button>
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
