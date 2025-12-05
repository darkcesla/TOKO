import { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  qty: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (p: any, qty?: number) => void;
  tambah: (id: number) => void;
  kurang: (id: number) => void;
  hapus: (id: number) => void;
  hapusCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "toko_assessment_frontend_2";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      return JSON.parse(raw) as CartItem[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const addToCart = (p: any, qty: number = 1) => {
    setCart((prev) => {
      const exists = prev.find((x) => x.id === p.id);
      if (exists) {
        return prev.map((x) =>
          x.id === p.id ? { ...x, qty: x.qty + qty } : x
        );
      }
      return [
        ...prev,
        { id: p.id, title: p.title, price: p.price, image: p.image, qty },
      ];
    });
  };

  const tambah = (id: number) => {
    setCart((prev) =>
      prev.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x))
    );
  };

  const kurang = (id: number) => {
    setCart((prev) =>
      prev
        .map((x) => (x.id === id ? { ...x, qty: x.qty - 1 } : x))
        .filter((x) => x.qty > 0)
    );
  };

  const hapus = (id: number) =>
    setCart((prev) => prev.filter((x) => x.id !== id));

  const hapusCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        tambah,
        kurang,
        hapus,
        hapusCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("Pastikan useCart harus ada di dalam CartProvider");
  return ctx;
};
