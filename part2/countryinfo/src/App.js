import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

const Filter = (props) => {
  return (
    <div>
      find countries
      <input
       value={props.filteringString} 
       onChange={props.handleFilter}
      />
    </div>
  )
}


const CountryList = (props) => {
  return (
    <ul>
      {props.countries.map(country =>
        <div key={country.name}>
          {country.name}
          <button onClick={() => props.showCountryInfo(country.name)}>
            show
          </button>
        </div>
      )}
    </ul>
  )
}

const BasicInfo = (props) => {
  return (
    <div>
      {props.countries.map(country =>
        <div key={country.name}>
          <h2> {country.name} </h2>
          <ul> capital {country.capital} </ul>
          <ul> population {country.population} </ul>
          <h3> Languages </h3>
        </div>
      )}
    </div>
  )
}

const Languages = (props) => {
  return (
    <div>
      {props.countries.map(country => 
        <div key={country.name}>
          {country.languages.map(language => 
            <li key={language.name}>
              {language.name}
            </li>
          )}
        </div>
      )}
    </div>
  )
}


const Flag = (props) => {
  return (
    <div>
      {props.countries.map(country =>
        <img
          alt={'Flag of ' + country.name}
          src={country.flag}
          key={country.name}
          width="170"
          crop="scale">
        </img>
      )}
    </div>
  )
}

const Weather = (props) => {
  const forecast = props.forecast
  return (
    <div>
      <div>
        <h3>Weather in {forecast.location.name}</h3>
        <ul>temperature: {forecast.current.temperature}</ul>  
        <img
          alt={'Weather in ' + forecast.location.name}
          src={forecast.current.weather_icons}>
        </img>
        <ul>
          wind: {forecast.current.wind_speed}
          mph direction {forecast.current.wind_dir}
        </ul>
      </div>
    </div>
  )
  
}

const AllCountryInfo = (props) => {
  const [ forecast, setForecast ] = useState(undefined)
  const countries = props.countries
  const capital = props.capital
  const params = {
    access_key: process.env.REACT_APP_API_KEY,
    query: capital
  }
  useEffect(() => {
    axios.get('http://api.weatherstack.com/current', {params})
      .then(response => {
        setForecast(response.data)
      })
  }, [])  
  return (
    <div>
      <BasicInfo countries = {countries}></BasicInfo>
      <Languages countries = {countries}></Languages>
      <Flag countries = {countries}></Flag>
      {forecast !== undefined
        ? <Weather forecast={forecast}></Weather>
        : null
      }
    </div>
  )
}


function App() {
  const [ countries, setCountries ] = useState([]) 
  const [ query, setQuery ] = useState('')

  
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])
  
  const handleFilter = (event) => {
    setQuery(event.target.value)
  }
  
  const countriesToShow =
    query === ''
      ? []
      : countries.filter(country =>
          country.name.toLowerCase().includes(query.toLowerCase())
        )

    

  const showCountry = (name) => {
    setQuery(name)
  }


  function renderView () {
    if (countriesToShow.length === 1) {
      return (
        <div>
          <AllCountryInfo countries={countriesToShow} capital={countriesToShow[0].capital}></AllCountryInfo>
        </div>
      )
    }
    else if (countriesToShow.length <= 10) {
      return (
        <CountryList countries={countriesToShow} query={query} showCountryInfo={showCountry}></CountryList>
      )
    }
    else if (countriesToShow.length > 10) {
      return (
        'Too many countries, please specify'
      )
    }
    else {
      return null
    }
  }


    

  return (
    <div>
      <Filter filteringString={query} handleFilter={handleFilter}> </Filter>
      {renderView()}
    </div>
  )
}

export default App;
