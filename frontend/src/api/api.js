import axios from "axios";
const localUrl = "http://localhost:5000";
// const productionUrl = "";
const api = axios.create({
        baseURL: `${localUrl}/api`,
        withCredentials: true,
});

export default api;
