import React from "react";
import "./header.css";

export const Header = React.memo(function () {
  return (
    <div className="header">
      <h2>BROCCOLI & CO.</h2>
    </div>
  );
});
