import { type Music, type GetMusicPayload, actionKeys } from "./types";

export const getMusic = (payload: GetMusicPayload) => {
  return {
    type: actionKeys.GET_MUSIC,
    payload
  };
};

export const getMusicSuccess = (music: Music) => {
  return {
    type: actionKeys.GET_MUSIC_SUCCESS,
    music
  };
};

export const getMusicFailed = () => {
  return {
    type: actionKeys.GET_MUSIC_FAILED
  };
};
