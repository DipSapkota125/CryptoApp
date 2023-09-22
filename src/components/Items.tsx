import React from "react";
import { CoinType } from "../redux/app/common/types";
import { Link } from "react-router-dom";

export interface PropsFunction {
  coin: CoinType;
}

const Items: React.FC<PropsFunction> = ({ coin }) => {
  return (
    <tr>
      <td className="px-8 py-2">{coin?.market_cap_rank}</td>
      <td className="px-12 py-2">
        <div className="flex items-center">
          <Link to={`/coin-details/${coin.id}`}>
            <img
              src={coin?.image}
              alt={coin?.name}
              className="h-10 mr-2 w-auto"
            />
          </Link>
          <span className="text-gray-800 font-semibold">
            {coin?.symbol.toUpperCase()}
          </span>
        </div>
      </td>
      <td className="py-2 font-semibold text-center">
        ${coin?.current_price.toLocaleString()}
      </td>
      <td
        className={`py-2 ${
          coin.price_change_percentage_24h >= 0
            ? "text-green-500"
            : "text-red-500"
        } text-center`}
      >
        {coin?.price_change_percentage_24h.toFixed(2)}%
      </td>
      <td className="py-2 text-center">
        ${coin?.total_volume.toLocaleString()}
      </td>
      <td className="py-2 text-center">${coin?.market_cap.toLocaleString()}</td>
    </tr>
  );
};

export default Items;
