import React from 'react';

const CountryInfo = ({country}) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <p>Region: {country.region}</p>
            <p><img alt="country flag" width="40%" src={country.flag} /></p>
        </div>
    )
}

const ListItem = ({country, onClickHandler}) => {
    return (
        <li onClick={() => onClickHandler(country)}>{country.name}</li>
    )
}

const ShowCountries =({countries, countrySearcher, onClickHandler}) =>{
    const searchResult = countries.filter(countrySearcher)
    console.log(searchResult.length)
    if (searchResult.length === 0){
        return (
            <div>No countries found</div> 
    )}

    else if (searchResult.length === 1){
        return (
            <div>
                <CountryInfo country={searchResult[0]} />
            </div>
    )}

    else if (searchResult.length > 10){
        return (
            <div>Too many countries found, make filter more specific</div>
    )}

    else{
        return (
            <div>
                <ul>
                {searchResult.map(i=><ListItem key={i.name} country={i} onClickHandler={onClickHandler}/>)}
                </ul>
            </div>
    )}
}


export default ShowCountries