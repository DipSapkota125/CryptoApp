import { Link } from "react-router-dom";
import { FaBitcoin } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-[#fff] p-4 border shadow-md ">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
          <FaBitcoin className="w-8 h-8 mr-2 text-yellow-500" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-500">Crypto App</h1>

        </div>
        <nav className="space-x-4">
          <Link to="/portfolio" className="hover:text-yellow-500">
            Portfolio
          </Link>
          <Link to="/market" className="hover:text-yellow-500">
            Market
          </Link>
          <Link to="/news" className="hover:text-yellow-500">
            News
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
