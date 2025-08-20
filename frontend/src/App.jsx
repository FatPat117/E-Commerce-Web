import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Cart from "./pages/Cart";
import Details from "./pages/Details";
import Home from "./pages/Home";
import PageLayout from "./pages/PageLayout";
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
                                path: "/product/details/:slug",
                                element: <Details />,
                        },
                ],
        },
]);
const App = () => {
        return <RouterProvider router={router}></RouterProvider>;
};

export default App;
