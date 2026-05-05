import { OrderStatus } from "@/context/OrdersContext";
import { Check, Clock, Package, Truck, Home, XCircle } from "lucide-react";

const STEPS: { key: OrderStatus; label: string; Icon: any }[] = [
  { key: "pending", label: "Order placed", Icon: Clock },
  { key: "confirmed", label: "Confirmed & packed", Icon: Package },
  { key: "out-for-delivery", label: "Out for delivery", Icon: Truck },
  { key: "delivered", label: "Delivered", Icon: Home },
];

export const OrderTracker = ({ status }: { status: OrderStatus }) => {
  if (status === "cancelled") {
    return (
      <div className="p-4 rounded-2xl bg-destructive/10 text-destructive inline-flex items-center gap-2 text-sm font-semibold">
        <XCircle className="w-4 h-4" /> This order was cancelled
      </div>
    );
  }
  const currentIdx = STEPS.findIndex((s) => s.key === status);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-1">
        {STEPS.map((s, i) => {
          const done = i <= currentIdx;
          const active = i === currentIdx;
          return (
            <div key={s.key} className="flex-1 flex flex-col items-center text-center relative">
              <div className={`relative z-10 grid place-items-center w-9 h-9 rounded-full border-2 transition-colors ${done ? "bg-primary border-primary text-primary-foreground" : "bg-card border-border text-muted-foreground"} ${active ? "ring-4 ring-primary/20" : ""}`}>
                {done && !active ? <Check className="w-4 h-4" /> : <s.Icon className="w-4 h-4" />}
              </div>
              <div className={`mt-2 text-[11px] font-semibold leading-tight ${done ? "text-foreground" : "text-muted-foreground"}`}>
                {s.label}
              </div>
              {i < STEPS.length - 1 && (
                <div className={`absolute top-[18px] left-1/2 w-full h-0.5 ${i < currentIdx ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
