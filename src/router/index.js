import React from "react";
import { Redirect } from "react-router-dom";

import ZWDiscover from "../pages/discover";
import ZWFriend from "../pages/friend";
import ZWMine from "../pages/mine";

import ZWRecommend from "../pages/discover/c-pages/recommend";
import ZWAlbum from "../pages/discover/c-pages/album";
import ZWArtist from "../pages/discover/c-pages/artist";
import ZWRanking from "../pages/discover/c-pages/ranking";
import ZWSongs from "../pages/discover/c-pages/songs";
import ZWDjradio from "../pages/discover/c-pages/djradio";

const routes = [
  {
    path: "/",
    exact: true,
    render: () => <Redirect to="/discover" />,
  },
  {
    path: "/discover",
    component: ZWDiscover,
    routes: [
      {
        path: "/discover",
        exact: true,
        render: () => <Redirect to="/discover/recommend" />,
      },
      {
        path: "/discover/recommend",
        component: ZWRecommend,
      },
      {
        path: "/discover/album",
        component: ZWAlbum,
      },
      {
        path: "/discover/artist",
        component: ZWArtist,
      },
      {
        path: "/discover/djradio",
        exact: true,
        component: ZWDjradio,
      },
      {
        path: "/discover/ranking",
        component: ZWRanking,
      },
      {
        path: "/discover/songs",
        component: ZWSongs,
      },
    ],
  },
  {
    path: "/mine",
    component: ZWMine,
  },
  {
    path: "/friend",
    component: ZWFriend,
  },
];

export default routes;
