import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CreateDrink from "./pages/[id].tsx";
import DrinkDetails from "./pages/drink-details.tsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        lazy: async () => {
          const Tasks = await import("./pages/Drinks.tsx");
          return { Component: Tasks.default };
        },
      },
      {
        path: "/drink/:id",
        element: <CreateDrink />,
      },
      {
        path: "/drink/details",
        element: <DrinkDetails />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={route}></RouterProvider>
  </React.StrictMode>
);
