import { type LoginUser, type UserData, actionKeys } from "./types";

export const loginUser = (loginData: LoginUser) => {
  return {
    type: actionKeys.LOGIN_USER,
    loginData
  };
};

export const loginUserSuccess = (userData: UserData) => {
  return {
    type: actionKeys.LOGIN_USER_SUCCESS,
    userData
  };
};
