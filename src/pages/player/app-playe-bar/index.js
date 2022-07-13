import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { PlaybarWrapper, Control, PlayInfo, Operator } from "./style";
import { Slider } from "antd";

import { formatDate, getPlaySong } from "@/utils/format-utils";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getSongDetailAction } from "./store/actionCreators";

const ZWAppPlayerBar = memo(() => {
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const dispatch = useDispatch();
  const audioRef = useRef();

  //时间
  const duration = 344000;
  const showCurrentTime = formatDate(currentTime, "mm:ss");

  const { lyricList } = useSelector(
    (state) => ({
      lyricList: state.getIn(["player", "lyricList"]),
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(getSongDetailAction(386844));
  }, dispatch);

  useEffect(() => {
    audioRef.current.src = getPlaySong(386844);
  }, [386844]);

  const playMusic = () => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };
  const timeUpdate = (e) => {
    const currentTime = e.target.currentTime;
    if (!isChanging) {
      setCurrentTime(e.target.currentTime * 1000);
      setProgress(((currentTime * 1000) / duration) * 100);
    }

    //获取当前歌词
    let currentLyricIndex = 0;
    for (let i = 0; i < lyricList.length; i++) {
      let lyricItem = lyricList[i];
      if (currentTime < lyricItem.time) {
        currentLyricIndex = i;
        break;
      }
    }
    console.log(lyricList[currentLyricIndex]);
  };

  const sliderChange = useCallback(
    (value) => {
      setIsChanging(true);
      const currentTime = (value / 100) * duration;
      setCurrentTime(currentTime);
      setProgress(value);
    },
    [duration]
  );
  const sliderAfterChange = useCallback(
    (value) => {
      const currentTime = ((value / 100) * duration) / 1000;
      audioRef.current.currentTime = currentTime;
      setCurrentTime(currentTime * 1000);
      setIsChanging(false);

      if (!isPlaying) {
        playMusic();
      }
    },
    [duration, isPlaying, playMusic]
  );

  return (
    <PlaybarWrapper className="sprite_player">
      <div className="content wrap-v2">
        <Control isPlaying={isPlaying}>
          <button className="sprite_player btn prev"></button>
          <button
            className="sprite_player btn play"
            onClick={(e) => playMusic()}
          ></button>
          <button className="sprite_player btn next"></button>
        </Control>
        <PlayInfo>
          <div className="image">
            <a href="#">
              <img src="https://p2.music.126.net/W1kczDCB4-r-uNAznD1ljg==/108851651165850.jpg?param=34y34" />
            </a>
          </div>
          <div className="info">
            <div className="song">
              <span className="song-name">杀死那个石家庄人</span>
              <span className="singer-name">万能青年旅店</span>
            </div>
            <div className="progress">
              <Slider
                defaultValue={30}
                value={progress}
                onChange={sliderChange}
                onAfterChange={sliderAfterChange}
              />
              <div className="time">
                <span className="now-time">{showCurrentTime}</span>
                <span className="divider">/</span>
                <span className="duration">05:44</span>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator>
          <div className="left">
            <button className="sprite_player btn favor"></button>
            <button className="sprite_player btn share"></button>
          </div>
          <div className="right sprite_player">
            <button className="sprite_player btn volume"></button>
            <button className="sprite_player btn loop"></button>
            <button className="sprite_player btn playlist"></button>
          </div>
        </Operator>
      </div>
      <audio ref={audioRef} onTimeUpdate={timeUpdate} />
    </PlaybarWrapper>
  );
});

export default ZWAppPlayerBar;
