import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Index from "./components/dashboard/Index";
import Cart from "./pages/Cart";
import CategoryShop from "./pages/CategoryShop";
import Dashboard from "./pages/Dashboard";
import Details from "./pages/Details";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageLayout from "./pages/PageLayout";
import Payment from "./pages/Payment";
import Register from "./pages/Register";
import SearchProduct from "./pages/SearchProduct";
import Shipping from "./pages/Shipping";
import Shops from "./pages/Shops";
import ProtectedUser from "./utils/ProtectedUser";
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
                        {
                                path: "/payment",
                                element: <Payment />,
                        },
                        {
                                path: "/dashboard",
                                element: (
                                        <ProtectedUser>
                                                <Dashboard />
                                        </ProtectedUser>
                                ),
                                children: [{ index: true, element: <Index /> }],
                        },
                ],
        },
]);
const App = () => {
        return <RouterProvider router={router}></RouterProvider>;
};

export default App;
