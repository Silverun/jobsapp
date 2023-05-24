import axios from "axios";

const useAxios = () => {
  const instance = axios.create({
    baseURL: "https://startup-summer-2023-proxy.onrender.com/",

    headers: { "X-Custom-Header": "foobar" },
  });
};
export default useAxios;
