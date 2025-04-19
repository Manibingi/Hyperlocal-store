import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useStore } from "../context/StoreContext";

const Navbar = () => {
  const { cartItemsCount } = useStore();
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-gray-800">
              Hyperlocal Store
            </span>
          </Link>

          <div className="flex items-center">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-green-700 transition duration-300 ease-in-out hover:scale-120" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
