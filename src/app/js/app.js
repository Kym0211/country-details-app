import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./homePage";
import DetailsPage from "./detailPage";

export default function App(){
    const colorModeFromPreferences = () => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"
    };
    const colorModeFromLocalStorage = () => {
        return localStorage.getItem("mode");
    };
    const [mode, setMode] = useState(colorModeFromLocalStorage() || colorModeFromPreferences())
    useEffect(() => {
        document.querySelector('body').classList = mode
    }, [mode])
    const [country, setCountry] = useState("")
    const [data, setData] = useState([])
    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(data => {
            setData(data)
            // setFilteredData(data)
        })
    }, [])


    return(
        <Router basename="/">
          <Routes>
            <Route path="/" element={<HomePage setMode={setMode} mode={mode} setCountry={setCountry} data={data}/>} />
            <Route path="/details" element={<DetailsPage setMode={setMode} mode={mode} country={country} setCountry={setCountry} data={data} />} />
          </Routes>
        </Router>
        // <HomePage setMode={setMode} mode={mode} setData={setData} />
    )
}