import { getSongDetail, getLyric } from "@/services/player";

import * as actionTypes from "./constants";

import { parseLyric } from "@/utils/lrc-parse";

const changeCurrentSongAction = (currentSong) => ({
  type: actionTypes.CHANGE_CURRENT_SONG,
  currentSong,
});

const changeLyricsListAction = (lyricList) => ({
  type: actionTypes.CHANGE_LYRICS_LIST,
  lyricList,
});

export const getSongDetailAction = (ids) => {
  return (dispatch) => {
    getSongDetail(ids).then((res) => {
      dispatch(changeCurrentSongAction(res.songs));
    });
    dispatch(getLyricAction(386844));
  };
};

export const getLyricAction = (id) => {
  return (dispatch) => {
    getLyric(id).then((res) => {
      const lyric = res.lrc.lyric;
      const lyricList = parseLyric(lyric);
      dispatch(changeLyricsListAction(lyricList));
    });
  };
};
