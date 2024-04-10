import "./App.css";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { lazy, Suspense } from "react";
import RootLayout from "./RootLayout";
import Home from "./components/Home";
//import Register from "./components/Register";

import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import UserComponents from "./components/UserComponents";
import ViewProducts from "./components/ViewProducts";
import Cart from "./components/Cart";
import SellerComponents from "./components/SellerComponents";
import AddProducts from "./components/AddProducts";


//dynamic import
let Register = lazy(() => import("./components/Register"));

function App() {
  //create BrowserRouter object
  let browserRouter = createBrowserRouter([
    {
      path: "",
      element: <RootLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "register",
          element: (
            <Suspense fallback={<p>Loading...</p>}>
              <Register />
            </Suspense>
          ),
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "user-profile",
          element: <UserProfile />,
        },
        {
          path:"user-login",
          element:<UserComponents/>,
          children:[
            {
              path:"",
              element:<ViewProducts/>,
            },
            {
              path:"cart",
              element:<Cart/>
            }
          ]
        },
        {
          path:"seller-login",
          element:<SellerComponents/>,
          children:[
            {
              path:"viewproducts",
              element:<ViewProducts/>,
            },
            {
              path:"",
              element:<AddProducts/>,
            }
          ]
        }
      ],
    },
  ]);

  return <RouterProvider router={browserRouter} />;
}

export default App;
