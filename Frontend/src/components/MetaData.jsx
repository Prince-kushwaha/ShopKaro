import Helmit from "react-helmet";
import React from 'react'
function MetaData(props) {
  return (
    <Helmit>
      <title>{props.title}</title>
    </Helmit>
  );
}

export default MetaData;
