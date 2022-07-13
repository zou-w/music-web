import { Map } from "immutable";
import * as actionTypes from "./constants";

const defaultState = Map({
  currentSong: {},
  lyricList: [],
});

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_CURRENT_SONG:
      return state.set("currentSong", action.currentSong);
    case actionTypes.CHANGE_LYRICS_LIST:
      return state.set("lyricList", action.lyricList);
    default:
      return state;
  }
}

export default reducer;
