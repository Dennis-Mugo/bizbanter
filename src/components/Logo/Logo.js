import React from "react";
import "./Logo.css";

function Logo({ style }) {
  return (
    <h2
      style={{
        fontFamily: "NunitoLight",
        fontSize: "28px",
        cursor: "pointer",

        ...style,
      }}
    >
      Bizbanter
    </h2>
  );
}

export default Logo;
