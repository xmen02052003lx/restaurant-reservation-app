import { apiSlice } from "./apiSlice"
import { BILLS_URL } from "../constants"

export const billApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getBill: builder.query({
      query: orderId => ({
        url: `${BILLS_URL}/${orderId}`
      }),
      keepUnusedDataFor: 5
    }),
    saveBill: builder.mutation({
      query: orderId => ({
        url: `${BILLS_URL}/pay/${orderId}`,
        method: "PUT"
      })
    }),
    getBills: builder.query({
      query: () => ({
        url: BILLS_URL
      }),
      keepUnusedDataFor: 5
    })
  })
})

export const { useGetBillQuery, useSaveBillMutation, useGetBillsQuery } =
  billApiSlice
