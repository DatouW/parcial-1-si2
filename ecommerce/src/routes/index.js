import Admin from "../pages/admin";
import Home from "../pages/admin/home";
import Product from "../pages/admin/producto/product";
import Order from "../pages/admin/order";
import Login from "../pages/admin/login";
import Categoria from "../pages/admin/producto/category";
import Customer from "../pages/admin/users/cliente";
import User from "../pages/admin/users/user";
import Rol from "../pages/admin/users/rol";
import ProductIndex from "../pages/admin/producto";
import DetailBook from "../pages/admin/producto/detail-book";
import AddUpdateBook from "../pages/admin/producto/add-update";
import Report from "../pages/admin/report";
import Main from "../pages/client";
import { Navigate } from "react-router-dom";
import HomeC from "../pages/client/home";
import LoginC from "../pages/client/login";
import SignUp from "../pages/client/signup";
import Cart from "../pages/client/cart";
import ProductDetails from "../pages/client/product-details";

const routes = [
  {
    path: "/bookhut",
    element: <Main />,
    children: [
      {
        index: true,
        element: <HomeC />,
      },
      {
        path: "login",
        element: <LoginC />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "pago",
        element: <Cart />,
      },
      {
        path: "detalle",
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "cliente",
        element: <Customer />,
      },
      {
        path: "usuario",
        element: <User />,
      },
      {
        path: "rol",
        element: <Rol />,
      },
      {
        path: "producto",
        element: <ProductIndex />,
        children: [
          {
            index: true,
            element: <Product />,
          },
          {
            path: "detalles",
            element: <DetailBook />,
          },
          {
            path: "addupdate",
            element: <AddUpdateBook />,
          },
        ],
      },
      {
        path: "categoria",
        element: <Categoria />,
      },
      {
        path: "pedido",
        element: <Order />,
      },
      {
        path: "reporte",
        element: <Report />,
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/bookhut" />,
  },
  {
    path: "*",
    element: (
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: 60, fontWeight: "bold", marginBottom: 0 }}>404</p>
        <p style={{ fontSize: 30, fontWeight: "bold", marginBottom: 0 }}>
          Page not found
        </p>
        <p style={{ fontSize: 20, marginBottom: 0 }}>
          We're sorry, the page you requested could not be found.
        </p>
      </div>
    ),
  },
];

export default routes;
