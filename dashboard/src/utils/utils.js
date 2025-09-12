import io from "socket.io-client";

const localUrl = "http://localhost:5000";
const productionUrl = "https://e-commerce-web-8l3q.onrender.com";
const mode = "pro";

const API_URL = mode == "pro" ? productionUrl : localUrl;
// socket client
const socket = io(API_URL, {
        withCredentials: true,
        transports: ["websocket"], // đảm bảo dùng websocket
});

const overrideStyle = {
        display: "flex",
        margin: "0 auto",
        height: "24px",
        justifyContent: "center",
        alignItems: "center",
};

export { overrideStyle, socket };
