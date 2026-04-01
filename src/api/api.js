import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  withCredentials: true,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (err) => {
    const requestUrl = err.config?.url || "";
    const isAuthCheck = requestUrl.includes("/user/me");
    const isAuthPage = ["/login", "/register"].includes(
      window.location.pathname,
    );
    if (err.response?.status === 401 && !isAuthCheck && !isAuthPage) {
      window.location.href = "/login";
    }
    return Promise.reject(err);
  },
);

export default api;
