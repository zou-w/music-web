import React, { memo, useEffect, useRef } from "react";
import ZWThemeHeaderRCM from "@/components/theme-header-rcm";

import { Carousel } from "antd";
import ZWAlbumCover from "@/components/album-cover";

import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getNewAlbumAction } from "../../store/actionCreaters";

import { AlbumWrapper } from "./style";

const ZWNewAlbum = memo(() => {
  const dispatch = useDispatch();

  const { newAlbums } = useSelector(
    (state) => ({
      newAlbums: state.getIn(["recommend", "newAlbums"]),
    }),
    shallowEqual
  );

  //other hook
  const pageRef = useRef();
  useEffect(() => {
    dispatch(getNewAlbumAction(10));
  }, [dispatch]);

  return (
    <AlbumWrapper>
      <ZWThemeHeaderRCM title="新碟上架" />
      <div className="content">
        <button
          className="arrow arrow-left sprite_02"
          onClick={(e) => pageRef.current.prev()}
        ></button>
        <div className="album">
          <Carousel dots={false} ref={pageRef}>
            {[0, 1].map((item) => {
              return (
                <div key={item} className="page">
                  {newAlbums.slice(item * 5, (item + 1) * 5).map((iten) => {
                    return (
                      <ZWAlbumCover
                        key={iten.id}
                        info={iten}
                        size={100}
                        width={118}
                        bgp="-570px"
                      >
                        {iten.name}
                      </ZWAlbumCover>
                    );
                  })}
                </div>
              );
            })}
          </Carousel>
        </div>
        <button
          className="arrow arrow-right sprite_02"
          onClick={(e) => pageRef.current.next()}
        ></button>
      </div>
    </AlbumWrapper>
  );
});

export default ZWNewAlbum;
