import React, { memo } from "react";

import ZWTopBanner from "./c-cpns/top-banner";
import { RecommendWrapper } from "./style";

const ZWRecommend = memo((props) => {
  return (
    <RecommendWrapper>
      <ZWTopBanner />
    </RecommendWrapper>
  );
});

export default ZWRecommend;
