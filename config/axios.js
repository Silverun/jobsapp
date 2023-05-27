const { default: axios } = require("axios");

let accToken;
let ttl;

if (typeof window !== "undefined") {
  accToken = localStorage.getItem("acc_token");
  ttl = localStorage.getItem("ttl");
}

export default axios.create({
  headers: {
    Authorization: "Bearer " + accToken,
    "x-ttl": ttl,
  },
});
