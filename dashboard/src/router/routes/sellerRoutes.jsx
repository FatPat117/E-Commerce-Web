import { lazy } from "react";
const Home = lazy(() => import("../../views/Home"));

export const sellerRoutes = [
        {
                index: true,
                element: <Home />,
                ability: ["admin", "seller"],
        },
];
