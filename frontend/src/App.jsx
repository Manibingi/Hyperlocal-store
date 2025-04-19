import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import StorePage from "./pages/StorePage";
import CartPage from "./pages/CartPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import StoreProvider from "./context/StoreContext";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <StoreProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/store/:storeId" element={<StorePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route
                path="/order-confirmation"
                element={<OrderConfirmationPage />}
              />
            </Routes>
          </main>
          <Toaster position="top-center" />
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
