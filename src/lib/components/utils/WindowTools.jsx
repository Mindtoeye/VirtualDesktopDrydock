import React from "react";
import ReactDOM from "react-dom";

/**
 *
 */
class WindowTools {
  
  /**
   *
   */
  generateGrid () {
    return (<svg width="100%" height="100%" style={{position: "absolute"}} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#505050" strokeWidth="0.5"/>
        </pattern>
        <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
          <rect width="80" height="80" fill="url(#smallGrid)"/>
          <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#666666" strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>);
  }	
}

export default WindowTools;
