import { useParams } from "react-router-dom";
import { useGetCryptoQuery } from "../../../../redux/cryptoApi";

const CoinDetails = () => {
  const { id } = useParams();
  const { data: coin, isError, isLoading } = useGetCryptoQuery(id);

  // Render loading state while data is being fetched
  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Render error state if there's an error
  if (isError) {
    return (
      <div className="text-center py-4 text-red-500">
        Error fetching data. Please try again later.
      </div>
    );
  }

  // Render coin details if data is available
  if (coin) {
    return (
      <div className="max-w-screen-lg mx-auto py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{coin.name}</h1>
          <img
            src={coin.image.large}
            alt={coin.name}
            className="h-16 w-16"
          />
        </div>
        <div className="mt-4">
          <p className="text-lg text-gray-800 font-bold">Symbol: {coin.symbol.toUpperCase()}</p>
          <p className="text-lg text-gray-800 font-bold">Current Price: ${coin.market_data.current_price.usd}</p>
          <p className="text-lg text-gray-800 font-bold">Market Cap Rank: {coin.market_cap_rank}</p>
          <p className="text-lg text-gray-800 font-bold">Coingecko Score: {coin.coingecko_score}</p>
          <p className="text-md text-gray-500">Description: {coin.description.en}</p>
          
          {/* Add more details as needed */}
        </div>

        {/* Table for price changes */}
        <div className="mt-8">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-2 px-4">Timeframe</th>
                <th className="py-2 px-4">Price Change</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 text-center">1h</td>
                <td className="py-2 px-4 text-center">{coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(2)}%</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-center">24h</td>
                <td className="py-2 px-4 text-center">{coin.market_data.price_change_percentage_24h.toFixed(2)}%</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-center">7d</td>
                <td className="py-2 px-4 text-center">{coin.market_data.price_change_percentage_7d.toFixed(2)}%</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-center">14d</td>
                <td className="py-2 px-4 text-center">{coin.market_data.price_change_percentage_14d.toFixed(2)}%</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-center">30d</td>
                <td className="py-2 px-4 text-center">{coin.market_data.price_change_percentage_30d.toFixed(2)}%</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-center">1y</td>
                <td className="py-2 px-4 text-center">{coin.market_data.price_change_percentage_1y.toFixed(2)}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Default fallback
  return null;
};

export default CoinDetails;
