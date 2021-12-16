import { AUTH_USER } from "./types";

export const signup = ({ email, password }) => {
  return {
    type: AUTH_USER,
    payload: "1010101",
  };
};
