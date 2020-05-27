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
        alt=''
         src={country.flag}
         key={country.name}
         width="170"
         crop="scale">
        </img>
      )}
    </div>
  )
}


function App() {
  const [ countries, setCountries ] = useState([]) 
  const [ query, setQuery ] = useState('')

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
    setQuery(event.target.value)
  }

  const countriesToShow =
    countries.filter(country =>
        country.name.toLowerCase().includes(query.toLowerCase())
    )

  return (
    <div>
      <Filter filteringString={query} handleFilter={handleFilter}> </Filter>
      {countriesToShow.length <= 10 && countriesToShow.length >= 2 
        ? <CountryList countries={countriesToShow} query={query}></CountryList>
        : countriesToShow.length > 10 
        ? 'Too many countries, please specify'
        :
         <div>
          <BasicInfo countries={countriesToShow}></BasicInfo>
          <Languages countries={countriesToShow}></Languages>
          <Flag countries={countriesToShow}></Flag>
         </div>
      }
    </div>
  )
}

export default App;
