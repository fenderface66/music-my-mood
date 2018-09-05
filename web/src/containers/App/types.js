export type Props = {
  initiateApp: () => void,
  appInitiated: boolean
};

export const actionKeys = {
  INITIATE_APP: "INITIATE_APP"
};

export type InitiateApp = { type: "INITIATE_APP" };

export type State = {
  appInitiated: boolean
};

export type Action = InitiateApp;
