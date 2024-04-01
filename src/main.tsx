import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import DrinkDetail from "./pages/Drink/Drink";
import AddDrink from "./pages/AddDrink/AddDrink";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>Error page</div>,
  },
  {
    path: "/drink/:drinkId",
    element: <DrinkDetail />,
    errorElement: <div>Error page</div>,
  },
  {
    path: "/drink/new",
    element: <AddDrink />,
    errorElement: <div>Error page</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
