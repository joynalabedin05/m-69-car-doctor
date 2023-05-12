import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Checkout from "../pages/checkout/Checkout";
import Bookservice from "../pages/BookService/Bookservice";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path:'/',
            element: <Home></Home>,
        },
        {
            path:'/login',
            element: <Login></Login>,
        },
        {
            path:'/signup',
            element: <Signup></Signup>,
        },
        {
            path:'/book/:id',
            element: <Bookservice></Bookservice>,
            loader: ({params})=> fetch(`http://localhost:5000/services/${params.id}`)
        },
        {
            path:'/checkout/:id',
            element: <Checkout></Checkout>,
            loader: ({params})=> fetch(`http://localhost:5000/services/${params.id}`)
        }
      ]  
    },
  ]);
export default router;  