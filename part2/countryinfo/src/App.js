import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
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

const Header = (props) => {
  if (props.oneCountryFound) {
    return (
      <h2>{props.country.name}</h2>
    )
  }
  else return (
    null
  )
}

const LanguageHeader = (props) => {
  return (
    <h3>{props.country.language}</h3>
  )
}

const CountryList = (props) => {
  const query = props.query
  if (props.countries.length <= 10 && query !== '') {
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
  else if (query !== '')
   return (
      <div>
        Too many matches, please specify
      </div>
    ) 
  else return (
    null
  )
}

const BasicInfo = (props) => {
  return (
    <ul>
      {props.countries.map(country =>
        <div key={country.name}>
          capital {country.capital}
          population {country.population}
        </div>
      )}
    </ul>
    // <ul>
    //   capital {country.capital}
    //   population {country.population}
    // </ul>
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

  const checkIfOnlyOneMatch = () => {
    if (countriesToShow.length === 1) {
      setRenderCountryInfo(true)
    }
  }

  return (
    <div>
      <Filter filteringString={query} handleFilter={handleFilter}> </Filter>
      <CountryList countries={countriesToShow} query={query}></CountryList>
      <Header oneCountryFound={renderCountryInfo} country={countriesToShow}></Header>
      {/* <BasicInfo countries={countriesToShow}></BasicInfo> */}
      {/* <Languages language='Swiss'></Languages>
      <Flag></Flag> */}
    </div>
  )
}

export default App;
