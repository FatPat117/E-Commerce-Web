import MainLayout from "../../layout/MainLayout";
import { privateRoutes } from "./privateRoutes";
import ProtectedRoute from "./ProtectedRoute";

export const getRoutes = () => {
        privateRoutes.map((route, idx) => {
                // console.log(route);
                route.element = <ProtectedRoute route={route}>{route.element}</ProtectedRoute>;
        });

        return [
                {
                        path: "/",
                        element: <MainLayout />,
                        children: privateRoutes,
                },
        ];
};
