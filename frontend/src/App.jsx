import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Cart from "./pages/Cart";
import CategoryShop from "./pages/CategoryShop";
import Details from "./pages/Details";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageLayout from "./pages/PageLayout";
import Register from "./pages/Register";
import SearchProduct from "./pages/SearchProduct";
import Shipping from "./pages/Shipping";
import Shops from "./pages/Shops";
const router = createBrowserRouter([
        {
                path: "/",
                element: <PageLayout />,
                children: [
                        {
                                index: true,
                                element: <Home />,
                        },
                        {
                                path: "shops",
                                element: <Shops />,
                        },
                        {
                                path: "cart",
                                element: <Cart />,
                        },
                        {
                                path: "shipping",
                                element: <Shipping />,
                        },
                        {
                                path: "/products?",
                                element: <CategoryShop />,
                        },
                        {
                                path: "/products/search?",
                                element: <SearchProduct />,
                        },
                        {
                                path: "/product/details/:slug",
                                element: <Details />,
                        },
                        {
                                path: "/login",
                                element: <Login />,
                        },
                        {
                                path: "/register",
                                element: <Register />,
                        },
                ],
        },
]);
const App = () => {
        return <RouterProvider router={router}></RouterProvider>;
};

export default App;
