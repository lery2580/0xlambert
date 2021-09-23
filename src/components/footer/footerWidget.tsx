import React from "react";
import "./footerWidget.less";
function FooterWidget() {
  return (
    <div className="footer">
      <div className="footerWidget">
        <p>@Lambert</p>
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
export default FooterWidget;
