import React, { memo } from "react";

import ZWTopBanner from "./c-cpns/top-banner";
import ZWHotRecommend from "./c-cpns/hot-recommend";
import ZWNewAlbum from "./c-cpns/new-album";
import ZWRecommendRanking from "./c-cpns/recommend-ranking";

import {
  RecommendWrapper,
  Content,
  RecommendLeft,
  RecommendRight,
} from "./style";

const ZWRecommend = memo((props) => {
  return (
    <RecommendWrapper>
      <ZWTopBanner />
      <Content className="wrap-v2">
        <RecommendLeft>
          <ZWHotRecommend />
          <ZWNewAlbum />
          <ZWRecommendRanking />
        </RecommendLeft>
        <RecommendRight></RecommendRight>
      </Content>
    </RecommendWrapper>
  );
});

export default ZWRecommend;
