import React, { memo, useEffect } from "react";

import { getTopList } from "@/services/recommend";

import ZWThemeHeaderRCM from "@/components/theme-header-rcm";
import { RankingWrapper } from "./style";

const ZWRecommendRanking = memo(() => {
  useEffect(() => {
    getTopList(19723756).then((res) => {
      console.log(res);
    });
    getTopList(3779629).then((res) => {
      console.log(res);
    });
    getTopList(2884035).then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <RankingWrapper>
      <ZWThemeHeaderRCM title="榜单" />
    </RankingWrapper>
  );
});

export default ZWRecommendRanking;
