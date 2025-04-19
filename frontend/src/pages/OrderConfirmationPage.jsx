import { useEffect, useState } from "react";
import { useStore } from "../context/StoreContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const OrderConfirmationPage = () => {
  const { customerName, setCustomerName } = useStore();

  const [showCheck, setShowCheck] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowCheck(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      {showCheck && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="text-white bg-emerald-400 rounded-full p-6"
        >
          <CheckCircle className="w-16 h-16" strokeWidth={2.5} />
        </motion.div>
      )}

      <h2 className="text-2xl font-semibold mt-6 text-center">
        Thank you{customerName ? `, ${customerName}` : ""}!
      </h2>
      <p className="text-gray-600 text-center mt-2">
        Your order has been placed successfully.
      </p>
      <Link
        to="/"
        onClick={() => setCustomerName("")}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out hover:scale-105 cursor-pointer"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default OrderConfirmationPage;
