import React from "react";
import "./footer.css";

export const Footer = React.memo(function () {
  return (
    <div className="footer">
      <div>Made with ♥ in Melbourne</div>
      <div>@ 2024 Broccoli & Co. All rights reserved</div>
    </div>
  );
});
