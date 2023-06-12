import { Location } from "react-router-dom";

export const getAuthToken = (): string => {
  let token = localStorage.getItem('accessToken')!;
  return token ?? '';
};

export const redirectToLogin = function () {
  localStorage.clear();
};

export const isLoginPage = (location: Location) => {
  return ["/", "/login"].includes(location.pathname);
}