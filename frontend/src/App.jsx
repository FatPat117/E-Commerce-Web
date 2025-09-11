import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ChangePassword from "./components/dashboard/ChangePassword";
import Chat from "./components/dashboard/Chat";
import Index from "./components/dashboard/Index";
import OrderDetails from "./components/dashboard/OrderDetails";
import Orders from "./components/dashboard/Orders";
import Wishlist from "./components/dashboard/Wishlist";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Cart from "./pages/Cart";
import CategoryShop from "./pages/CategoryShop";
import ConfirmOrders from "./pages/ConfirmOrders";
import Contact from "./pages/Contact";
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
                                path: "/products/search",
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
                                path: "/blog",
                                element: <Blog />,
                        },
                        {
                                path: "/about",
                                element: <About />,
                        },
                        {
                                path: "/contact",
                                element: <Contact />,
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
                                children: [
                                        { index: true, element: <Index /> },
                                        {
                                                path: "my-orders",
                                                element: <Orders />,
                                        },
                                        {
                                                path: "change-password",
                                                element: <ChangePassword />,
                                        },
                                        {
                                                path: "my-wishlist",
                                                element: <Wishlist />,
                                        },
                                        {
                                                path: "order/:orderId",
                                                element: <OrderDetails />,
                                        },
                                        {
                                                path: "chat",
                                                element: <Chat />,
                                        },
                                        {
                                                path: "chat/:sellerId",
                                                element: <Chat />,
                                        },
                                ],
                        },
                ],
        },
        {
                path: "/order/confirm",
                element: <ConfirmOrders />,
        },
]);
const App = () => {
        return <RouterProvider router={router}></RouterProvider>;
};

export default App;
