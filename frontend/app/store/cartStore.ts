import { create } from "zustand";

export type CartItem = {
id: number;
name: string;
description: string;
price: number;
image: string;
unit: "pair" | "box" | "kg";
qty: number;
};

type CartState = {
items: CartItem[];

addItem: (item: CartItem) => void;
removeItem: (id: number) => void;
increase: (id: number) => void;
decrease: (id: number) => void;
clearCart: () => void;
loadCart: () => void;

isOpen: boolean;
openCart: () => void;
closeCart: () => void;
};

// quantity rule
const getStep = (unit: string) => {
if (unit === "pair") return 50;
return 1;
};

export const useCartStore = create<CartState>((set, get) => ({
/* ---------------- DATA ---------------- */
items: [],
isOpen: false,

/* ---------------- UI ---------------- */
openCart: () => set({ isOpen: true }),
closeCart: () => set({ isOpen: false }),

/* ---------------- LOAD CART ---------------- */
loadCart: () => {
if (typeof window === "undefined") return;

try {
  const saved = localStorage.getItem("cart");
  if (saved) {
    set({ items: JSON.parse(saved) });
  }
} catch (err) {
  console.log("cart load error", err);
}

},

/* ---------------- ADD ITEM ---------------- */
addItem: (item) => {
const items = [...get().items];
const existing = items.find((i) => i.id === item.id);
const step = getStep(item.unit);

if (existing) {
  existing.qty += step;
} else {
  items.push({ ...item, qty: step });
}

localStorage.setItem("cart", JSON.stringify(items));
set({ items });

},

/* ---------------- INCREASE ---------------- */
increase: (id) => {
const items = get().items.map((i) => {
const step = getStep(i.unit);
return i.id === id ? { ...i, qty: i.qty + step } : i;
});

localStorage.setItem("cart", JSON.stringify(items));
set({ items });

},

/* ---------------- DECREASE ---------------- */
decrease: (id) => {
const items = get().items
.map((i) => {
const step = getStep(i.unit);
return i.id === id ? { ...i, qty: i.qty - step } : i;
})
.filter((i) => i.qty > 0);

localStorage.setItem("cart", JSON.stringify(items));
set({ items });

},

/* ---------------- REMOVE ---------------- */
removeItem: (id) => {
const items = get().items.filter((i) => i.id !== id);
localStorage.setItem("cart", JSON.stringify(items));
set({ items });
},

/* ---------------- CLEAR CART ---------------- */
clearCart: () => {
localStorage.removeItem("cart");
set({ items: [], isOpen: false });
},
}));

/* =========================================================
GLOBAL LISTENER (RUNS ONLY IN BROWSER)
Clears cart when logout event fired from Navbar
========================================================= */
if (typeof window !== "undefined") {
window.addEventListener("userLoggedOut", () => {
localStorage.removeItem("cart");

useCartStore.setState({
  items: [],
  isOpen: false,
});

});
}
