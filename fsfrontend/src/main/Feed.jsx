// import React from 'react'
import LeftPane from "./LeftPane"
import Suggestions from "./Suggestions";

const Feed = () => {
  const width = screen.width;
  return (
    <>
      {/* <LeftPane /> */}
      <div className="grid grid-nogutter">
        <Suggestions/>
      </div>
    </>
  )
}

export default Feed