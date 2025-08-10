import { lazy } from "react";
const Home = lazy(() => import("../../views/Home"));
const SellerDashboard = lazy(() => import("../../views/seller/SellerDashboard"));

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
];
