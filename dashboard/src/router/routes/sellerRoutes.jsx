import { lazy } from "react";
const Home = lazy(() => import("../../views/Home"));
const SellerDashboard = lazy(() => import("../../views/seller/SellerDashboard"));
const AddProduct = lazy(() => import("../../views/seller/AddProduct"));
const Products = lazy(() => import("../../views/seller/Products"));
export const sellerRoutes = [
        {
                index: true,
                element: <Home />,
                ability: ["admin", "seller"],
        },
        {
                path: "/seller/dashboard",
                element: <SellerDashboard />,
                ability: ["seller"],
        },
        {
                path: "/seller/dashboard/all-product",
                element: <Products />,
                ability: ["seller"],
        },
];
