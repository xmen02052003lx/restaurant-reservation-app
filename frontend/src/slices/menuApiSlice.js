import { MENU_URL } from "../constants"
import { apiSlice } from "./apiSlice" // this slice dealding with asynchronous request so we need apiSlice (createApi)

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    // with this, we dont need to use fetch/axios (which is cool in my opinion)
    getMenu: builder.query({
      query: ({ keyword, pageNumber }) => ({
        // because we want this arrow function return an object so: ({....})
        // this is a query so GET request
        url: MENU_URL,
        params: { keyword, pageNumber }
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Products"]
    }),
    getMenuItemDetails: builder.query({
      query: productId => ({
        url: `${MENU_URL}/${productId}`
      }),
      keepUnusedDataFor: 5
    }),
    createMenu: builder.mutation({
      query: data => ({
        url: `${MENU_URL}/create`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Product"] // stop it from being cached so we'll have fresh data
    }),
    updateMenuItem: builder.mutation({
      query: data => ({
        url: `${MENU_URL}/${data.productId}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Products"]
    }),
    uploadMenuImage: builder.mutation({
      query: data => ({
        url: `/api/upload`,
        method: "POST",
        body: data
      })
    }),
    deleteMenuItem: builder.mutation({
      query: productId => ({
        url: `${MENU_URL}/${productId}`,
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
  useGetMenuItemDetailsQuery,
  useCreateMenuMutation,
  useUpdateMenuMutation,
  useUploadMenuImageMutation,
  useDeleteMenuMutation
} = productsApiSlice
