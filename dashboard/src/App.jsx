import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";

import { default as Router } from "./router/Router";
import publicRoutes from "./router/routes/publicRoutes";

const App = () => {
        const [allRoutes, setAllRoutes] = useState([...publicRoutes]);

        return (
                <BrowserRouter>
                        <Router allRoutes={allRoutes} />
                </BrowserRouter>
        );
};

export default App;
