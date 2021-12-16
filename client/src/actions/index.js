import axios from "axios";
import { AUTH_ERROR, AUTH_USER } from "./types";

export const signup =
  ({ email, password }, callback) =>
  async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:3090/signup", {
        email,
        password,
      });

      dispatch({ type: AUTH_USER, payload: response.data.token });
      localStorage.setItem("token", response.data.token);
      callback();
    } catch (e) {
      dispatch({ type: AUTH_ERROR, payload: "Email in use" });
    }
  };

export const signin =
  ({ email, password }, callback) =>
  async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:3090/signin", {
        email,
        password,
      });

      dispatch({ type: AUTH_USER, payload: response.data.token });
      localStorage.setItem("token", response.data.token);
      callback();
    } catch (e) {
      dispatch({ type: AUTH_ERROR, payload: "Invalid login credentials" });
    }
  };

export const signout = () => {
  localStorage.removeItem("token");
  return {
    type: AUTH_USER,
    payload: "",
  };
};
