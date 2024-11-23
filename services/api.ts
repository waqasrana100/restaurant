import axios, { AxiosError } from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  removeTokens,
  isTokenExpired,
} from "@/lib/auth";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

API.interceptors.request.use(async (config) => {
  let accessToken = getAccessToken();

  if (accessToken && isTokenExpired(accessToken)) {
    const refreshToken = getRefreshToken();
    if (refreshToken && !isTokenExpired(refreshToken)) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/refresh/`,
          {
            refresh: refreshToken,
          }
        );
        setTokens(response.data.access, refreshToken);
        accessToken = response.data.access;
      } catch (error) {
        removeTokens();
        window.location.href = "/login";
        return Promise.reject(error);
      }
    } else {
      removeTokens();
      window.location.href = "/login";
      return Promise.reject("Session expired");
    }
  }

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export const registerUser = async (data: any) => API.post("/register/", data);
export const loginUser = async (data: any) => {
  const response = await API.post("/login/", data);
  setTokens(response.data.access, response.data.refresh);
  return response;
};
export const verifyEmail = (email: string, verification_code: string) =>
  API.post("/verify_email/", { email, verification_code });

export const getRestaurants = async () => API.get("/restaurants/");
export const getMainMenuCategories = async () =>
  API.get("/main_menu_category/");

export const logoutUser = () => {
  removeTokens();
};
