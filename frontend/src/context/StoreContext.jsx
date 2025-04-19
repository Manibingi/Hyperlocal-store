import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const StoreContext = createContext(null);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within a StoreProvider");
  return context;
};

const StoreProvider = ({ children }) => {
  const [selectedStore, setSelectedStore] = useState({ id: "", name: "" });
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.name === product.name);
      if (exists) {
        return prev.map((p) =>
          p.name === product.name ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    setCartItemsCount(cartItemsCount + 1);
    toast.success(`${product.name} added to cart!`);
  };

  const clearCart = () => {
    setCart([]);
    setCartItemsCount(0);
  };

  const updateCartQuantity = (productName, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.name === productName
          ? { ...item, quantity: item.quantity + delta }
          : item
      )
    );
  };

  const removeFromCart = (productName) => {
    setCart((prev) => prev.filter((item) => item.name !== productName));
  };

  return (
    <StoreContext.Provider
      value={{
        selectedStore,
        setSelectedStore,
        cart,
        setCart,
        addToCart,
        clearCart,
        customerName,
        setCustomerName,
        cartItemsCount,
        setCartItemsCount,
        updateCartQuantity,
        removeFromCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
