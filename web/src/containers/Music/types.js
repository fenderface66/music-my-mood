export const actionKeys = {
  GET_MUSIC: "GET_MUSIC",
  GET_MUSIC_SUCCESS: "GET_MUSIC_SUCCESS",
  GET_MUSIC_FAILED: "GET_MUSIC_FAILED"
};

export type GetMusicPayload = {
  userID: string,
  latitude: number,
  longitude: number
};

export type Position = {
  coords: {
    accuracy: number,
    altitude?: number,
    altitudeAccuracy?: number,
    heading?: string,
    latitude: number,
    longitude: number
  }
};

export type Props = {
  userID: string,
  getMusic: (payload: GetMusicPayload) => void
};

export type GetMusic = {
  type: typeof actionKeys.GET_MUSIC,
  payload: GetMusicPayload
};

export type Music = {
  data: string
};

export type State = {
  data: string
};

export type GetMusicSuccess = {
  type: typeof actionKeys.GET_MUSIC_SUCCESS,
  music: Music
};

export type GetMusicFailed = {
  type: typeof actionKeys.GET_MUSIC_FAILED
};

export type Action = GetMusic | GetMusicSuccess | GetMusicFailed;
