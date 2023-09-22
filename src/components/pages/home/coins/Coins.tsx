import { useEffect, useState } from "react";
import {
  useGetAllCryptosQuery,
  useGetCryptosMutation,
} from "../../../../redux/cryptoApi";
import { CoinType } from "../../../../redux/app/common/types";
import Items from "../../../Items";

const Coins = () => {
  const [getCryptos, { data: cryptos, isError, isLoading }] =
    useGetCryptosMutation();

  const { data } = useGetAllCryptosQuery();

  const [page, setPage] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [perPage, setPerPage] = useState<string>("10");
  const pages = ["5", "10", "15", "20", "25", "30"];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(e.target.value);
  };

  useEffect(() => {
    const fetchedData = async () => {
      await getCryptos({ page, perPage });
    };
    fetchedData();
  }, [getCryptos, page, perPage]);

  const searchedCoins = data?.filter((coin) =>
    coin.name.toLowerCase().includes(name.toLowerCase())
  );

  return (
    <div className="sans-serif py-6">
      <div className="max-w-screen-lg mx-auto overflow-x-auto">
        <h1 className="text-gray-500 text-xl my-2">CryptoCoins</h1>
        <div className="grid gap-4 ml-4 mb-6 md:grid-cols-3 mt-4 items-center justify-center">
          <input
            type="text"
            id="crypto_name"
            className=" appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-200"
            placeholder="search your Favourite crypto"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 text-white">
            <tr>
              <th className="w-1/12 py-2">#</th>
              <th className="w-3/12 py-2 text-center">Coin</th>
              <th className="w-2/12 py-2 text-center">Price</th>
              <th className="w-3/12 py-2 text-center">24h</th>
              <th className="w-3/12 py-2 text-center">Volume</th>
              <th className="w-3/12 py-2 text-center">Market Cap</th>
            </tr>
          </thead>
          <tbody className="bg-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-red-500">
                  Error fetching data. Please try again later.
                </td>
              </tr>
            ) : !name ? (
              cryptos?.map((coin: CoinType) => (
                <Items key={coin.id} coin={coin} />
              ))
            ) : (
              searchedCoins?.map((coin: CoinType) => (
                <Items key={coin.id} coin={coin} />
              ))
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-center" style={{opacity:`${name ? 0 : 1}`}}>
          <button
            onClick={() => setPage((page) => page - 1)}
            disabled={page === 1 ? true : false}
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded m-2"
          >
            Prev
          </button>
          <p className="text-lg font-bold">{page}</p>
          <button
            onClick={() => setPage((page) => page + 1)}
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded m-2"
          >
            Next
          </button>
          <div className="dropdown inline-block relative ml-8">
            <span>Per Page:</span>
            <select
              value={perPage}
              onChange={handleChange}
              className="focus:outline-none"
            >
              {pages.map((page, index) => (
                <option key={index}>{page}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coins;
