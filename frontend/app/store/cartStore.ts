import { create } from "zustand";

export type CartItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  qty: number;
};

type CartState = {
  /* ---------- CART DATA ---------- */
  items: CartItem[];

  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;
  clearCart: () => void;
  loadCart: () => void;

  /* ---------- CART UI (DRAWER) ---------- */
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  /* =========================================================
      CART UI STATE (for Blinkit style drawer)
     ========================================================= */
  isOpen: false,

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  /* =========================================================
      LOAD CART FROM LOCALSTORAGE (ON APP START)
     ========================================================= */
  loadCart: () => {
    try {
      if (typeof window === "undefined") return;

      const saved = localStorage.getItem("cart");
      if (saved) {
        set({ items: JSON.parse(saved) });
      }
    } catch (err) {
      console.log("cart load error", err);
    }
  },

  /* =========================================================
      SAVE HELPER
     ========================================================= */
  saveCart: (items: CartItem[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  },

  /* =========================================================
      ADD ITEM
     ========================================================= */
  addItem: (item) => {
    const items = [...get().items];
    const existing = items.find((i) => i.id === item.id);

    if (existing) {
      existing.qty += 50;
    } else {
      items.push({ ...item, qty: 50 });
    }

    localStorage.setItem("cart", JSON.stringify(items));
    set({ items });
  },

  /* =========================================================
      INCREASE QTY
     ========================================================= */
  increase: (id) => {
    const items = get().items.map((i) =>
      i.id === id ? { ...i, qty: i.qty + 50 } : i
    );

    localStorage.setItem("cart", JSON.stringify(items));
    set({ items });
  },

  /* =========================================================
      DECREASE QTY
     ========================================================= */
  decrease: (id) => {
    const items = get().items
      .map((i) => (i.id === id ? { ...i, qty: i.qty - 50 } : i))
      .filter((i) => i.qty > 0);

    localStorage.setItem("cart", JSON.stringify(items));
    set({ items });
  },

  /* =========================================================
      REMOVE ITEM
     ========================================================= */
  removeItem: (id) => {
    const items = get().items.filter((i) => i.id !== id);
    localStorage.setItem("cart", JSON.stringify(items));
    set({ items });
  },

  /* =========================================================
      CLEAR CART
     ========================================================= */
  clearCart: () => {
    localStorage.removeItem("cart");
    set({ items: [] });
  },
}));