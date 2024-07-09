import { MENU_URL } from "../constants"
import { apiSlice } from "./apiSlice" // this slice dealding with asynchronous request so we need apiSlice (createApi)

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    // with this, we dont need to use fetch/axios (which is cool in my opinion)
    getMenu: builder.query({
      query: () => ({
        // because we want this arrow function return an object so: ({....})
        // this is a query so GET request
        url: MENU_URL
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Products"]
    }),

    createMenu: builder.mutation({
      query: data => ({
        url: `${MENU_URL}/create`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Product"] // stop it from being cached so we'll have fresh data
    }),
    updateMenu: builder.mutation({
      query: data => ({
        url: `${MENU_URL}/update/${data._id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Products"]
    }),
    deleteMenu: builder.mutation({
      query: productId => ({
        url: `${MENU_URL}/delete/${productId}`,
        method: "DELETE"
      }),
      providesTags: ["Product"]
    })
  })
})

// this is a convention: when it is a query => "use" + query's name + "Query"
// this is what we bring into our component whenever we want to use this and fetch our data
export const {
  useGetMenuQuery,
  useCreateMenuMutation,
  useUpdateMenuMutation,
  useDeleteMenuMutation
} = productsApiSlice
