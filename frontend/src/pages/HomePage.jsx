import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useStore } from "../context/StoreContext";
import LoadingSpinner from "../components/LoadingSpinner";

const HomePage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { setSelectedStore } = useStore();
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get(`${apiUrl}/stores`);
        setStores(response.data);
      } catch (error) {
        console.error("Failed to fetch stores:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStores();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Hyperlocal Stores</h1>
      <div className="grid gap-4 max-w-xl mx-auto">
        {stores.map((store) => (
          <Link
            to={`/store/${store._id}`}
            key={store._id}
            className="p-4 bg-white flex justify-between items-center rounded-xl shadow hover:shadow-lg transition duration-300 ease-in-out hover:scale-105"
            onClick={() => setSelectedStore(store.name)}
          >
            <div>
              <h2 className="text-xl font-semibold">{store.name}</h2>
              <p className="text-gray-600">{store.location}</p>
            </div>
            <span className="text-blue-600 font-medium whitespace-nowrap">
              View Products &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
