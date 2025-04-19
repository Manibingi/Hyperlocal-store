import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useStore } from "../context/StoreContext";

const StorePage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { storeId } = useParams();
  const { selectedStore, addToCart } = useStore();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${apiUrl}/products/store/${storeId}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, [storeId]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {selectedStore || "Store"} - Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white p-4 rounded-xl shadow flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600 mb-2">₹{product.price}</p>
            </div>
            <button
              onClick={() => addToCart(product)}
              className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 transition duration-300 ease-in-out hover:scale-105 cursor-pointer"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate("/cart")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out hover:scale-105 cursor-pointer"
        >
          View Cart
        </button>
      </div>
    </div>
  );
};

export default StorePage;
