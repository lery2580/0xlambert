import React from "react";
// import { Link } from "react-router-dom";
import config from "../../config/index";
import "./headerWidget.less";
function HeaderWidget() {
  return (
    <div className="header">
      <div className="headerWidget">
        <h1>
          <a href={config.preLink} title="Soully">

            <img src={require("./img/logo.png")} alt="logo" />
          </a>
        </h1>
        <h2>Unique SOULLY</h2>
        <h3>coming soon</h3>
        <div className="fr">
          <a href="https://discord.gg/Dmn7DhDyEZ" title="discord.gg">
            <img src={require("./img/discord.png")} alt="discord" />
          </a>
          <a href="https://twitter.com/SoullyWorld" title="twitter.com">
            <img src={require("./img/twitter.png")} alt="twitter" />
          </a>
        </div>
      </div>
    </div>
  );
}
export default HeaderWidget;
