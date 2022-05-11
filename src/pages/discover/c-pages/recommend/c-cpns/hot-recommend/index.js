import React, { memo, useEffect } from "react";

import { HotRecommendWrapper } from "./style";
import ZWThemeHeaderRCM from "@/components/theme-header-rcm";
import ZWSongsCover from "@/components/songs-cover";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getHotRecommendAction } from "../../store/actionCreaters";
import { HOT_RECOMMEND_LIMIT } from "@/common/constants";

const ZWHotRecommend = memo(() => {
  const { hotRecommends } = useSelector(
    (state) => ({
      hotRecommends: state.getIn(["recommend", "hotRecommends"]),
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHotRecommendAction(HOT_RECOMMEND_LIMIT));
  }, [dispatch]);

  return (
    <HotRecommendWrapper>
      <ZWThemeHeaderRCM
        title="热门推荐"
        keywords={["华语", "流行", "热门", "电子"]}
      />
      <div className="recommend-list">
        {hotRecommends.map((item, index) => {
          return <ZWSongsCover key={item.id} info={item} />;
        })}
      </div>
    </HotRecommendWrapper>
  );
});

export default ZWHotRecommend;
