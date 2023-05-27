import axios from "axios";
import { useEffect } from "react";

export default function Auth({ children }) {
  const login = async () => {
    const data = await axios.get("/api/login");
    localStorage.setItem("ttl", data.data.ttl);
    localStorage.setItem("acc_token", data.data.access_token);
    localStorage.setItem("ref_token", data.data.refresh_token);
    console.log("Auth ran");
  };

  if (typeof window !== "undefined") {
    const ttl = localStorage.getItem("ttl");
  }

  useEffect(() => {
    const ttl = localStorage.getItem("ttl");
    const date = Date.now() / 1000;

    if (!ttl) {
      login();
    }

    // if (ttl && ttl < date) {
    //   const data = axios.get("api/refresh");
    //   // get new acc token with ref token and update ttl and acc token in localstorage
    // }
  }, []);

  return <>{children}</>;
}
