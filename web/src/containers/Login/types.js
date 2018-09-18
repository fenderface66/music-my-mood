export type UserData = {
  _id: string,
  firstname: string,
  lastname: string,
  email: string,
  token: string
};

export const actionKeys = {
  LOGIN_USER: "LOGIN_USER",
  LOGIN_USER_SUCCESS: "LOGIN_USER_SUCCESS"
};

export type LoginData = {
  email: string,
  password: string
};

export type Props = {
  loginUser: (loginData: LoginData) => void,
  loginUserSuccess: (userData: UserData) => void,
  error: string
};

export type LoginUser = {
  type: "LOGIN_USER",
  loginData: LoginData
};

export type LoginUserSuccess = {
  type: "LOGIN_USER_SUCCESS",
  userData: UserData
};

export type State = {
  loggedInUser: UserData
};

export type Action = LoginUser | LoginUserSuccess;
