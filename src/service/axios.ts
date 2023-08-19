import axios from "axios";
import { REFRESH_TOKEN_URL } from "./urls";

export const source = axios.CancelToken.source();

const baseURL = "http://127.0.0.1:8000/";

export const nonTokenInstance = axios.create({
    baseURL,
    // timeout: 30000,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8",
    },
    transformRequest: [
        (data) => {
            return JSON.stringify(data);
        },
    ],
});

export const withTokenInstance = axios.create({
    baseURL,
    // timeout: 30000
});

withTokenInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response?.status === 401 && localStorage.getItem("tokens")) {
            const authData = JSON.parse(localStorage.getItem("tokens") || "{}");
            const payload = {
                refresh: authData?.refresh,
            };
            const apiResponse = await axios.post(baseURL + REFRESH_TOKEN_URL, payload);
            authData.access = apiResponse.data.access;
            localStorage.setItem("tokens", JSON.stringify(authData));
            error.config.headers.Authorization = `Bearer ${apiResponse.data.access}`;
            return axios(error.config);
        }
        else {
            return Promise.reject(error);
        }
    },
);

withTokenInstance.interceptors.request.use((config) => {
    if (localStorage.getItem("tokens")) {
        const authData = JSON.parse(localStorage.getItem("tokens") || "{}");
        config.headers.Authorization = `Bearer ${authData.access}`;
    }
    return config;
});
