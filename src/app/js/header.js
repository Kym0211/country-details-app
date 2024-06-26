import React from "react";
import { useState, useEffect } from "react";

export default function Header(props) {

    function toggleMode(){
        props.setMode((prevMode) => {
            localStorage.setItem("mode", prevMode === "light" ? "dark" : "light")
            return prevMode === "light" ? "dark" : "light"
        })
    }

    const modeIcon = props.mode === "light" ? 
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 1024 1024">
    <g id="icomoon-ignore">
    </g>
    <path fill="#111517" d="M698.768 570.595v0c2.807-11.244 4.533-22.917 5.060-34.901-14.965 5.268-31.061 8.133-47.827 8.133-79.529 0-144-64.471-144-144 0-16.766 2.865-32.863 8.133-47.827-11.984 0.527-23.656 2.253-34.901 5.060-76.535 19.106-133.232 88.316-133.232 170.768 0 97.202 78.798 176 176 176 82.452 0 151.662-56.698 170.768-133.232zM384 527.827c0-62.763 40.153-116.148 96.173-135.867-0.115 2.608-0.173 5.231-0.173 7.867 0 97.202 78.798 176 176 176 2.636 0 5.259-0.058 7.867-0.173-19.719 56.019-73.104 96.173-135.867 96.173-79.529 0-144-64.471-144-144v0z"></path>
    </svg>
    :
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 1024 1024">
    <g id="icomoon-ignore">
    </g>
    <path fill="#fafafa" d="M698.768 570.595c-19.106 76.535-88.316 133.232-170.768 133.232-97.202 0-176-78.798-176-176 0-82.452 56.698-151.662 133.232-170.768 11.244-2.807 22.917-4.533 34.901-5.060-5.268 14.965-8.133 31.061-8.133 47.827 0 79.529 64.471 144 144 144 16.766 0 32.863-2.865 47.827-8.133-0.527 11.984-2.253 23.656-5.060 34.901z"></path>
    </svg>

    return(
        <header className="header">
            <h1>Where in the world?</h1>
            <button type="button" className="mode" onClick={toggleMode}>
            {modeIcon}
            Dark Mode
            </button>
        </header>
    )
}