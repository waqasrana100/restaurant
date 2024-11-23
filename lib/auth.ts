import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

interface DecodedToken {
  exp: number;
  user_id: number;
}

export const setTokens = (accessToken: string, refreshToken: string) => {
  Cookies.set("accessToken", accessToken, { secure: true, sameSite: "strict" });
  Cookies.set("refreshToken", refreshToken, {
    secure: true,
    sameSite: "strict",
  });
};

export const getAccessToken = () => Cookies.get("accessToken");
export const getRefreshToken = () => Cookies.get("refreshToken");

export const removeTokens = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};

export const isTokenExpired = (token: string) => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.exp < Date.now() / 1000;
  } catch (error) {
    return true;
  }
};

export const getUserIdFromToken = (token: string) => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.user_id;
  } catch (error) {
    return null;
  }
};
