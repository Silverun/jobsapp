import axiosPrivate from "@/config/axios";
import axios from "axios";
import { useEffect } from "react";

const useAxiosPrivate = () => {
  useEffect(() => {
    const ttl = localStorage.getItem("ttl");
    const date = Date.now() / 1000;
    const refreshToken = localStorage.getItem("ref_token");

    const requestIntercept = axiosPrivate.interceptors.request.use(
      async (config) => {
        if (config.headers.Authorization === "Bearer null") {
          const data = await axios.get("/api/login");
          localStorage.setItem("ttl", data.data.ttl);
          localStorage.setItem("acc_token", data.data.access_token);
          localStorage.setItem("ref_token", data.data.refresh_token);
          config.headers.Authorization = "Bearer " + data.data.access_token;
        }

        if (ttl && ttl < date) {
          const data = await axios.post("/api/refresh", {
            refreshToken: refreshToken,
          });
          localStorage.setItem("ttl", data.data.ttl);
          localStorage.setItem("acc_token", data.data.access_token);
          localStorage.setItem("ref_token", data.data.refresh_token);
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, []);

  return axiosPrivate;
};

export default useAxiosPrivate;
