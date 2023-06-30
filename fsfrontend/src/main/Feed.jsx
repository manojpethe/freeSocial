// import React from 'react'
import LeftPane from "./LeftPane"
import Suggestion from "./Suggestion";

const Feed = () => {
  const width = screen.width;
  return (
    <>
      {/* <LeftPane /> */}
      {/* <div style={{ "marginLeft":"400px","height":"2000px", "width":"100%", "backgroundColor":"yellow"}}>Feed</div> */}
      <div className="grid" style={{"width":"100%"}}>
        {width > 400 ? <div className="col-12 lg:col-3 md:col-3 "><LeftPane /></div> : ""}
        <div className="col-12 lg:col-6 md:col-6"><Suggestion/></div>
        <div className="col-12 lg:col-3 md:col-3">3</div>
        {/* <div className="col">4</div> */}
      </div>
    </>
  )
}

export default Feed