import "./Loader.css";
import React from "react";

function Loader() {
  return (
    <div className="loading">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
