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

const LanguageHeader = (props) => {
  return (
    <h3>{props.country.language}</h3>
  )
}

const CountryList = (props) => {
    return (
      <ul>
        {props.countries.map(country =>
          <div key={country.name}>
            {country.name}
          </div>
        )}
      </ul>
    )
}

const BasicInfo = (props) => {
  return (
    <ul>
      {props.countries.map(country =>
        <div key={country.name}>
          <h2> {country.name} </h2>
          <ul> capital {country.capital} </ul>
          <ul> population {country.population} </ul>
        </div>
      )}
    </ul>
  )
}

const Languages = (props) => {
  return (
    <div>
      <li>{props.language}</li>
    </div>
  )
}

const Flag = (props) => {
  return (
    <div>
      Flag here
    </div>
  )
}


function App() {
  const [ countries, setCountries ] = useState([]) 
  const [ query, setQuery ] = useState('')
  const [ renderCountryInfo, setRenderCountryInfo ] = useState(false)

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  const handleFilter = (event) => {
    console.log(event.target.value)
    setQuery(event.target.value)
  }

  const countriesToShow =
    countries.filter(country =>
        country.name.toLowerCase().includes(query)
    )


  return (
    <div>
      <Filter filteringString={query} handleFilter={handleFilter}> </Filter>
      {countriesToShow.length <= 10 && countriesToShow.length >= 2 
        ? <CountryList countries={countriesToShow} query={query}></CountryList>
        : countriesToShow.length > 10 
        ? 'Too many countries, please specify'
        : <BasicInfo countries={countriesToShow}></BasicInfo>
      }
      {/* <Languages language='Swiss'></Languages>
      <Flag></Flag> */}
    </div>
  )
}

export default App;
