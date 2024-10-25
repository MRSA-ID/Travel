import axios from "axios";
import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import store from "@/store";
import { logout } from "@/store/slices/authSlices";

const baseURL = import.meta.env.VITE_API_URL;

const $http: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const genericSuccessResponseInterceptor = function (response: AxiosResponse) {
  return response;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const genericErrorResponseInterceptor = function (error: any) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (error.response.status === 401) {
      store.dispatch(logout());
      window.location.href = "/login";
      return Promise.reject(
        new Error("Anda belum terautentikasi, harap login terlebih dahulu"),
      );
    }

    return Promise.reject(error);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    return Promise.reject(
      new Error("Mohon cek koneksi internet anda dan coba lagi"),
    );
  } else {
    // Error comes from AbortController signal abort
    if (error.message === "canceled") {
      return Promise.reject(new Error("request canceled"));
    }
    // Something happened in setting up the request that triggered an Error
    return Promise.reject(error.message);
  }
};

// disini terdapat config dengan type AxiosRequestConfig terdapat error not assignable ro parameter bisakah untuk di fix kan juga
$http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const state = store.getState();
  const token = state.auth.token;

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

$http.interceptors.response.use(
  genericSuccessResponseInterceptor,
  genericErrorResponseInterceptor,
);

export default $http;
