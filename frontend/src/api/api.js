import axios from "axios";
const localUrl = "http://localhost:5000";
const productionUrl = "https://e-commerce-web-8l3q.onrender.com";

let API_URL = "";
let mode = "pro";

if (mode == "pro") {
        API_URL = productionUrl;
} else {
        API_URL = localUrl;
}
const api = axios.create({
        baseURL: `${API_URL}/api`,
        withCredentials: true,
});

export default api;
