import { type UserData } from "../Login/types";

export type Props = {
  loggedInUser: UserData,
  loginUserSuccess: (userData: UserData) => void
};
