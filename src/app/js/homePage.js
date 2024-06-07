import React from "react";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Header from "./header";
import { useNavigate } from "react-router-dom";

export default function HomePage(props) {
    const Navigate = useNavigate()

    const [filteredData, setFilteredData] = useState([])
    const [selectedRegion, setSelectedRegion] = useState("placeholder")
    useEffect(() => setFilteredData(props.data), [props.data])

    function showDetails(event){
        const countryCard = event.target.closest(".country-card")
        const countryName = countryCard.dataset.countryName
        props.setCountry(countryName)
        Navigate("/details")
    }

    const countryList = filteredData.map((country) => {
        return(
            <section 
                key={nanoid()} 
                className="country-card" 
                data-country-name={country.name.common}
                onClick={showDetails} 
            >
                <img src={country.flags.png} alt={`map of ${country.name.common}`} className="img"></img>
                <h2 className="country-card-name">{country.name.common}</h2>
                <p className="country-card-population">Population: <span>{country.population}</span></p>
                <p className="country-card-region">Region: <span>{country.region}</span></p>
                <p className="country-card-capital">Capital: <span>{country.capital}</span></p>
            </section>
        )
    })

    const optionList = []
    props.data.forEach((country) => {
        if(!optionList.includes(country.region)){
            optionList.push(country.region)
        }
    })
    const optionElements = optionList.map((option) => {
        return <option key={nanoid()} value={option}>{option}</option>
    })


    const searchIconColor = props.mode === "light" ? "#858585" : "#fafafa"
    const searchIcon = <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 640 640" className="icon search-icon">
    <g id="icomoon-ignore" >
    </g>
    <path fill={searchIconColor} d="M347.482 339.913l-13.765-13.765c2.076-3.406 3.271-7.413 3.271-11.692 0-12.446-10.786-23.228-23.231-23.228-12.446-0.004-22.532 10.086-22.532 22.532 0 12.442 10.786 23.228 23.227 23.228 4.141 0 8.013-1.126 11.346-3.074l13.838 13.845c1.355 1.351 3.551 1.351 4.903 0l3.435-3.435c1.351-1.351 0.859-3.060-0.492-4.411zM298.16 313.761c0-8.618 6.983-15.6 15.597-15.6 8.618 0 16.296 7.674 16.296 16.296 0 8.614-6.986 15.6-15.6 15.6-8.618-0.004-16.292-7.682-16.292-16.296z"></path>
    </svg>

    function filterRegion(event){
        const region = event.target.value
        setSelectedRegion(region)

        if(region === "placeholder"){
            setFilteredData(props.data)
        }
        else{
            const filtered = props.data.filter((country) => country.region === region)
            setFilteredData(filtered)
        }
    }

    function filterCountry(event){
        const search = event.target.value
        const filtered = props.data.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase()))
        setFilteredData(filtered)
    }

  return(
    <>
        <Header setMode={props.setMode} mode={props.mode} />

        <div className="container">
            <section name="country" className="container-header">
                {searchIcon}
                <input className="input-box" type="text" placeholder="Search for a country.." onChange={filterCountry}></input>

                <select title="region-filter" className="country-filter" value={selectedRegion} onInput={filterRegion}>
                    <option value="placeholder" disabled hidden>Filter by region</option>
                    {optionElements}
                    <option value="placeholder">All</option>
                </select>
            </section>
            <div name="country" className="country-list">
                {countryList}
            </div>
        </div>
    </> 
  )
}