// App.js đã sửa lỗi logic
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { default as Router } from "./router/Router";
import { getRoutes } from "./router/routes/index.jsx";
import publicRoutes from "./router/routes/publicRoutes";

function App() {
        const [allRoutes, setAllRoutes] = useState([...publicRoutes]);

        useEffect(() => {
                const routes = getRoutes();

                setAllRoutes((prevRoutes) => [...prevRoutes, ...routes]);
        }, []);

        return (
                <BrowserRouter>
                        <Router allRoutes={allRoutes} />
                </BrowserRouter>
        );
}

export default App;
