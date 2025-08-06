import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import "./index.css";
import store from "./store";
const App = lazy(() => import("./App.jsx"));
createRoot(document.getElementById("root")).render(
        <StrictMode>
                <Suspense fallback={<div>Loading...</div>}>
                        <Provider store={store}>
                                <App />
                                <Toaster
                                        toastOptions={{
                                                position: "top-right",
                                                style: {
                                                        background: "#283046",
                                                        color: "#ffffff",
                                                },
                                        }}
                                />
                        </Provider>
                </Suspense>
        </StrictMode>
);
