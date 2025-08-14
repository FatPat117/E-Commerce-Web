// App.js đã sửa lỗi logic
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { default as Router } from "./router/Router";
import { getRoutes } from "./router/routes/index.jsx";
import publicRoutes from "./router/routes/publicRoutes";
import { get_user_info } from "./store/Reducers/authReducer";

function App() {
        const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
        const dispatch = useDispatch();
        const { token } = useSelector((state) => state.auth);

        useEffect(() => {
                const routes = getRoutes();

                setAllRoutes((prevRoutes) => [...prevRoutes, ...routes]);
        }, []);

        useEffect(() => {
                if (token) {
                        dispatch(get_user_info());
                }
        }, [token]);

        return (
                <BrowserRouter>
                        <Router allRoutes={allRoutes} />
                </BrowserRouter>
        );
}

export default App;
