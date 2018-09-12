import { type UserData } from "../Login/types";

export const actionKeys = {
  CREATE_USER: "CREATE_USER",
  CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS"
};

export type CreateData = {
  firstname: string,
  lastname: string,
  email: string,
  password: string
};

export type Props = {
  createUser: (createData: CreateData) => void,
  createUserSuccess: (userData: UserData) => void,
  error: string
};

export type CreateUser = {
  type: "CREATE_USER",
  createData: CreateData
};

export type CreateUserSuccess = {
  type: "CREATE_USER_SUCCESS",
  userData: UserData
};

export type State = {
  loggedInUser: UserData
};

export type Action = CreateUser | CreateUserSuccess;
