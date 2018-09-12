import { type CreateUser, actionKeys } from "./types";
import { type UserData } from "../Login/types";

export const createUser = (createData: CreateUser) => {
  return {
    type: actionKeys.CREATE_USER,
    createData
  };
};

export const createUserSuccess = (userData: UserData) => {
  return {
    type: actionKeys.CREATE_USER_SUCCESS,
    userData
  };
};
