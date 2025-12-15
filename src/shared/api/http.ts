import axios, { AxiosError } from "axios";

export const http = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 10000,
});

http.interceptors.response.use(
  (res) => res,
  (err: AxiosError) => {
    return Promise.reject(err);
  }
);

export default http;
