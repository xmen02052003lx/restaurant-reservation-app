import { RESTAURANT_URL } from "../constants"
import { apiSlice } from "./apiSlice" // this slice dealding with asynchronous request so we need apiSlice (createApi)

const restaurantId = "66817d1fdba1724bb5388925"

export const restaurantApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    // with this, we dont need to use fetch/axios (which is cool in my opinion)

    getRestaurantDetails: builder.query({
      query: restaurantId => ({
        url: `${RESTAURANT_URL}/${restaurantId}`
      }),
      keepUnusedDataFor: 5
    }),

    updateRestaurant: builder.mutation({
      query: data => ({
        url: `${RESTAURANT_URL}/${data._id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Products"]
    })
  })
})

// this is a convention: when it is a query => "use" + query's name + "Query"
// this is what we bring into our component whenever we want to use this and fetch our data
export const { useGetRestaurantDetailsQuery, useUpdateRestaurantMutation } =
  restaurantApiSlice
