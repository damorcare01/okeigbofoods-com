export interface PromoResult {
  code: string;
  label: string;
  discount: number; // amount off subtotal
  freeDelivery: boolean;
}

interface PromoDef {
  code: string;
  label: string;
  type: "percent" | "flat" | "freeship";
  value: number; // percent (0-100) or flat NGN
  minSubtotal?: number;
}

export const PROMOS: PromoDef[] = [
  { code: "WELCOME10", label: "10% off your order", type: "percent", value: 10 },
  { code: "OK500", label: "₦500 off (min ₦5,000)", type: "flat", value: 500, minSubtotal: 5000 },
  { code: "FREESHIP", label: "Free delivery", type: "freeship", value: 0 },
];

export const applyPromo = (
  rawCode: string,
  subtotal: number,
  delivery: number,
): { ok: true; result: PromoResult } | { ok: false; error: string } => {
  const code = rawCode.trim().toUpperCase();
  if (!code) return { ok: false, error: "Enter a promo code" };
  const promo = PROMOS.find((p) => p.code === code);
  if (!promo) return { ok: false, error: "Invalid promo code" };
  if (promo.minSubtotal && subtotal < promo.minSubtotal)
    return { ok: false, error: `Minimum subtotal ₦${promo.minSubtotal.toLocaleString()}` };

  let discount = 0;
  let freeDelivery = false;
  if (promo.type === "percent") discount = Math.round((subtotal * promo.value) / 100);
  else if (promo.type === "flat") discount = Math.min(promo.value, subtotal);
  else if (promo.type === "freeship") freeDelivery = delivery > 0;

  return { ok: true, result: { code: promo.code, label: promo.label, discount, freeDelivery } };
};
