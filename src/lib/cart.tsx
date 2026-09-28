"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

export type CartLine = {
  id: string; // slug + variant
  slug: string;
  name: string;
  variant?: string;
  price: number;
  image: string;
  qty: number;
};

type State = { lines: CartLine[] };

type Action =
  | { type: "add"; line: Omit<CartLine, "qty">; qty: number }
  | { type: "remove"; id: string }
  | { type: "setQty"; id: string; qty: number }
  | { type: "clear" }
  | { type: "hydrate"; lines: CartLine[] };

const STORAGE_KEY = "maaya-cart-v1";

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add": {
      const existing = state.lines.find((l) => l.id === action.line.id);
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.id === action.line.id ? { ...l, qty: l.qty + action.qty } : l
          ),
        };
      }
      return { lines: [...state.lines, { ...action.line, qty: action.qty }] };
    }
    case "remove":
      return { lines: state.lines.filter((l) => l.id !== action.id) };
    case "setQty":
      return {
        lines: state.lines
          .map((l) => (l.id === action.id ? { ...l, qty: Math.max(0, action.qty) } : l))
          .filter((l) => l.qty > 0),
      };
    case "clear":
      return { lines: [] };
    case "hydrate":
      return { lines: action.lines };
    default:
      return state;
  }
}

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  serviceCharge: number;
  total: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (line: Omit<CartLine, "qty">, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);

  // Hydrate from localStorage once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "hydrate", lines: JSON.parse(raw) });
    } catch {
      /* storage unavailable, run in memory */
    }
    setReady(true);
  }, []);

  // Persist on change.
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
    } catch {
      /* ignore */
    }
  }, [state.lines, ready]);

  const add = useCallback((line: Omit<CartLine, "qty">, qty = 1) => {
    dispatch({ type: "add", line, qty });
    setIsOpen(true);
  }, []);

  const remove = useCallback((id: string) => dispatch({ type: "remove", id }), []);
  const setQty = useCallback((id: string, qty: number) => dispatch({ type: "setQty", id, qty }), []);
  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  const subtotal = useMemo(
    () => state.lines.reduce((sum, l) => sum + l.price * l.qty, 0),
    [state.lines]
  );
  const count = useMemo(() => state.lines.reduce((s, l) => s + l.qty, 0), [state.lines]);
  const serviceCharge = useMemo(() => Math.round(subtotal * 0.125 * 100) / 100, [subtotal]);

  const value: CartContextValue = {
    lines: state.lines,
    count,
    subtotal,
    serviceCharge,
    total: Math.round((subtotal + serviceCharge) * 100) / 100,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    add,
    remove,
    setQty,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

// Re-exported for convenience so existing client imports keep working.
export { gbp } from "./format";
