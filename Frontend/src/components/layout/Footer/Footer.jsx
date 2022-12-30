import React from "react";
import appStore from "../../../images/Appstore.png";
import playStore from "../../../images/playstore.png";
import "./Footer.css";

function Footer() {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Download our App</h4>
        <p>Download App for Android and IOS phone</p>
        <img src={playStore}></img>
        <img src={appStore}></img>
      </div>
      <div className="midFooter">
        <h1 className="text-red">ShopKaro</h1>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a>Insagram</a>
        <a>Youtube</a>
        <a>Facebook</a>
      </div>
    </footer>
  );
}

export default Footer;
