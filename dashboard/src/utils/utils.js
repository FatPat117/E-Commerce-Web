import io from "socket.io-client";
const socket = io("http://localhost:5000");

const overrideStyle = {
        display: "flex",
        margin: "0 auto",
        height: "24px",
        justifyContent: "center",
        alignItems: "center",
};

export { overrideStyle, socket };
