import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:3000/api",

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 15000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;

    const token = localStorage.getItem("token");

    if (status === 401 && token) {
      localStorage.removeItem("token");
       localStorage.removeItem("role");

      if (window.location.pathname !== "/logIn") {
        window.location.href = "/logIn";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;