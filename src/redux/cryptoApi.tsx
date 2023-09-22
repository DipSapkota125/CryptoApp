import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CoinType } from "./app/common/types";

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.coingecko.com/api/v3" }),
  endpoints: (builder) => ({
    getCryptos: builder.mutation({
      query: ({ page, perPage }) => {
        const perPageSize = Number(perPage);
        return {
          url: `/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=${perPageSize}&page=${page}&sparkline=false&locale=en`,
          method: "get",
        };
      },
    }),

    getAllCryptos: builder.query<CoinType[],void>({
      query: () =>
        `/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=1000&page=1&sparkline=false&locale=en`,
    }),
   getCrypto:builder.query({
      query:(coinId)=>`/coins/${coinId}`,
   }),
  }),
});

export const { useGetCryptosMutation, useGetAllCryptosQuery,useGetCryptoQuery } = cryptoApi;
