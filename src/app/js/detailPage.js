import React from "react";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Header from "./header";
import { useNavigate } from "react-router-dom";

export default function DetailsPage(props) {
    // console.log("DetailsPage props", props.data);
    const Navigate = useNavigate()
    const [data, setData] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(
        JSON.parse(localStorage.getItem("selectedCountry")) || null
    );

    useEffect(() => {
        if (props.country) {
            const savedCountry = JSON.parse(localStorage.getItem("selectedCountry"));
            if (!savedCountry || savedCountry.name.common !== props.country) {
                const country = props.data.find((country) => country.name.common === props.country);
                setSelectedCountry(country);
                localStorage.setItem("selectedCountry", JSON.stringify(country));
            }
        }
    }, [props.country]);

    // console.log("selectedCountry", selectedCountry);

    function toggleBack() {
        Navigate("/");
    }
    const backIcon = props.mode === "dark" ? 
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="60" height="30" viewBox="0 0 768 768" className="back-arrow"
            onClick={toggleBack}
            >
            <g id="icomoon-ignore">
            </g>
            <path fill="#fafafa" d="M406.624 585.376l-169.376-169.376h370.752c17.664 0 32-14.336 32-32s-14.336-32-32-32h-370.752l169.376-169.376c12.512-12.512 12.512-32.768 0-45.248s-32.768-12.512-45.248 0l-224 224c-3.072 3.072-5.376 6.592-6.944 10.368-1.632 3.904-2.432 8.096-2.432 12.256 0 8.192 3.136 16.384 9.376 22.624l224 224c12.512 12.512 32.768 12.512 45.248 0s12.512-32.768 0-45.248z"></path>
            </svg> 
            :
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="60" height="30" viewBox="0 0 768 768" className="back-arrow"
            onClick={toggleBack}
            >
            <g id="icomoon-ignore">
            </g>
            <path fill="#111517" d="M406.624 585.376l-169.376-169.376h370.752c17.664 0 32-14.336 32-32s-14.336-32-32-32h-370.752l169.376-169.376c12.512-12.512 12.512-32.768 0-45.248s-32.768-12.512-45.248 0l-224 224c-3.072 3.072-5.376 6.592-6.944 10.368-1.632 3.904-2.432 8.096-2.432 12.256 0 8.192 3.136 16.384 9.376 22.624l224 224c12.512 12.512 32.768 12.512 45.248 0s12.512-32.768 0-45.248z"></path>
            </svg>;


    if(!selectedCountry){
        return (
            <>
                <Header setMode={props.setMode} mode={props.mode} />
                {backIcon}
                <button type="button" className="btn" onClick={toggleBack}>
                Back
                </button>
                <p>Loading...</p>
            </>
        )
    }
    const {
        name,
        flags,
        population,
        region,
        subregion,
        capital,
        tld,
        currencies,
        languages,
        borders
    } = selectedCountry;

    const key = Object.keys(selectedCountry.languages)[0]
    const nativeName = selectedCountry?.name?.nativeName?.[key]?.common || "N/A";
    // console.log(selectedCountry.languages.key)

    function toggleBorderCountry(event) {
        const countryName = event.target.textContent;
        // console.log("countryName", countryName, "\n", selectedCountry);
    }

    return(
        <>
            <Header setMode={props.setMode} mode={props.mode} />
            {backIcon}
            <button type="button" className="btn" onClick={toggleBack}>
                Back
            </button>
            <div className="detail-page-container">
                <section className="img-section">
                    <img className="detail-page-container-img" src={flags?.png} alt={name?.common} />
                </section>
                <div className="detail-container">
                    <section className="detail-page-container-info">
                        <h1 className="country-name">{name?.common}</h1>

                        <p className="native-name"><span className="bold">Native Name: </span>{nativeName || 'N/A'}</p>

                        <p className="population"><span className="bold">Population: </span>{population?.toLocaleString()}</p>

                        <p className="region"><span className="bold">Region: </span>{region}</p>

                        <p className="sub-region"><span className="bold">Sub Region: </span>{subregion}</p>

                        <p className="capital"><span className="bold">Capital: </span>{capital || 'N/a'}</p>

                        <p className="tld"><span className="bold">Top Level Domain: </span>{tld?.join(', ')}</p>

                        <p className="currencies"><span className="bold">Currencies: </span>{currencies ? Object.values(currencies).map(currency => currency.name).join(', ') : 'N/A'}</p>   

                        <p className="languages"><span className="bold">Languages: </span>{languages ? Object.values(languages).join(', ') : 'N/A'}</p>
                    </section>
                    
                    <section className="borders">
                        <p><span className="bold">Border Countries: </span></p>
                        <div className="borders-countries">
                            {borders ? borders.map(border => <button key={nanoid()} type="button" className="border-country" onClick={toggleBorderCountry}>{border}</button>) : 'None'}   
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}