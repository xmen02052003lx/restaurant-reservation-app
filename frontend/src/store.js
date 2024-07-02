// this is the redux store to provide to our app
import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./slices/apiSlice"
import authReducer from "./slices/authSlice"

const store = configureStore({
  reducer: {
    // this is our global reducer, we wrap this around our app
    // we dont add productsApiSlice/usersApiSlice because they are apiSlice's children
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})

export default store
