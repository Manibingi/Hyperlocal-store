import { useStore } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const CartPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const {
    cart,
    customerName,
    setCustomerName,
    clearCart,
    selectedStore,
    updateCartQuantity,
    removeFromCart,
    setCartItemsCount,
    cartItemsCount,
  } = useStore();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for cart data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const placeOrder = async () => {
    setLoading(true);

    try {
      await axios.post(`${apiUrl}/orders`, {
        customerName,
        products: cart.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total,
        storeName: selectedStore.name,
      });

      clearCart();
      navigate("/order-confirmation");
    } catch (err) {
      console.error("Order failed:", err);
      alert("Something went wrong while placing the order.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col gap-4 items-center justify-center text-lg text-gray-600">
        Your cart is empty.
        <button
          onClick={() => navigate("/")}
          className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 transition duration-300 ease-in-out hover:scale-105 cursor-pointer"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Cart</h1>

      <div className="bg-white rounded-xl shadow p-4 space-y-4">
        {cart.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b py-3"
          >
            <div>
              <h2 className="font-medium">{item.name}</h2>
              <p className="text-sm text-gray-600">₹{item.price} each</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={item.quantity <= 1}
                onClick={() => {
                  updateCartQuantity(item.name, -1);
                  setCartItemsCount(cartItemsCount - 1);
                }}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => {
                  updateCartQuantity(item.name, 1);
                  setCartItemsCount(cartItemsCount + 1);
                }}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-medium">₹{item.price * item.quantity}</span>
              <button
                onClick={() => {
                  removeFromCart(item.name);
                  setCartItemsCount(cartItemsCount - item.quantity);
                }}
                className="text-red-500 hover:text-red-700 text-sm cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <hr />
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <div className="mt-4">
          <label className="block mb-1 font-medium">Your Name</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter your name"
            className={`w-full p-2 border rounded-lg transition
              ${!customerName.trim() ? "border-red-400" : "border-gray-300"}`}
          />
          <div className="h-6 mt-1">
            {!customerName.trim() && (
              <p className="text-red-500 text-sm">
                Name is required to place the order.
              </p>
            )}
          </div>
        </div>

        <button
          onClick={placeOrder}
          disabled={!customerName.trim() || loading}
          className={`w-full py-2 mt-2 rounded-lg text-white transition
            ${
              !customerName.trim() || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 duration-300 ease-in-out hover:scale-103 cursor-pointer"
            }
          `}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default CartPage;
