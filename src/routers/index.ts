import React from "react";
import { HomeIndex } from "../page";
import config from "../config/index";
export type RouterType = {
  path: string;
  component: React.LazyExoticComponent<any>;
  root: string[];
  notExect?: boolean;
};

const HomeRouter: RouterType = {
  path: config.preLink + "/",
  component: HomeIndex,
  root: [],
  notExect: false,
};

const Routers: RouterType[] = [HomeRouter];
export { Routers };
