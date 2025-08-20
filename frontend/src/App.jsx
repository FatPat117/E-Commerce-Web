import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import PageLayout from "./pages/PageLayout";
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
                ],
        },
]);
const App = () => {
        return <RouterProvider router={router}></RouterProvider>;
};

export default App;
