import React from "react";

import "./Overlay.css";

function Overlay({ children, isLoading }) {
  return (
    <>
      {isLoading && <div className="loaderComp"></div>}
      {children}
    </>
  );
}

export default Overlay;
