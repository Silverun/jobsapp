import axios from "axios";

let accToken;

if (typeof window !== "undefined") {
  accToken = localStorage.getItem("acc_token");
}

const axiosPrivate = axios.create({
  headers: {
    Authorization: "Bearer " + accToken,
  },
});

export default axiosPrivate;
