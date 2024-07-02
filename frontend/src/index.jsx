import React from "react"
import ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store"
// import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/styles/bootstrap.custom.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import HomeScreen from "./screens/HomeScreen"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/admin/RegisterScreen"
import RestaurantInfoEditScreen from "./screens/admin/RestaurantInfoEditScreen"
import MenuScreen from "./screens/MenuScreen"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/editRestaurant" element={<RestaurantInfoEditScreen />} />
      <Route path="/menu" element={<MenuScreen />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
