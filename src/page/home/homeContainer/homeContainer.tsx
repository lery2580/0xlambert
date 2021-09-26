import React from "react";
import "./homeContainer.less";
const HomeContainer = function () {
  return (
    <>
      <div className="banner">
        <img className="logo" src={require("../assets/logo.png")} alt="logo" />
        <h2>Unique SOULLY</h2>
        <h4>
          It's an exclusive series of NFTs in collaboration with SpiritSwap
        </h4>
      </div>
      <div className="buttom">
        <ul>
          <li>
            <img src={require("../assets/pc01.png")} alt="pc01" />
          </li>
          <li>
            <img src={require("../assets/pc02.png")} alt="pc02" />
          </li>
          <li>
            <img src={require("../assets/pc03.png")} alt="pc03" />
          </li>
          <li>
            <img src={require("../assets/pc04.png")} alt="pc04" />
          </li>
          <li>
            <img src={require("../assets/pc05.png")} alt="pc05" />
          </li>
        </ul>
        <h3>Unique SOULLY</h3>
        <p>I will be releasing my latest collection, Unique SOULLY.</p>
        <p>Total 20 NFTs. </p>
        <p>It will be available at https://artion.io when it launches. </p>
        <p>
          It's an exclusive series of NFTs in collaboration with SpiritSwap
        </p>
      </div>
    </>
  );
};
export default HomeContainer;
