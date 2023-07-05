// import React from 'react'
import { Link } from "react-router-dom";

const LeftPane = () => {
    return (
        <div style={{"width":"75%", "borderRadius":"10px", "padding":"10px", "marginLeft":"25%", "margin":"20px","backgroundColor":"lightgray","paddingLeft":"10%"}}>
            <div style={{"height":"150px","width":"100%"}}>Profile DP</div>
            <div style={{"height":"60px","width":"100%"}}>Suggestions</div>
            <div style={{"height":"60px","width":"100%"}}>Acitivity</div>
            <div style={{"height":"60px","width":"100%"}}> <Link to="/main/search">Search</Link></div>
            <div style={{"height":"60px","width":"100%"}}>Messenger</div>
        </div>
    )
}

export default LeftPane