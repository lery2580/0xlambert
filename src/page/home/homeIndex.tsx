import React from "react";
import HeaderWidget from "@/components/header/headerWidget";
import FooterWidget from "@/components/footer/footerWidget";
import HomeContainer from "./homeContainer/homeContainer";
import "./homeIndex.less";

function HomeIndex() {
  return (
    <div className="homeIndex">
      <HeaderWidget />
      <HomeContainer />
      <FooterWidget />
    </div>
  );
}
export default HomeIndex;
