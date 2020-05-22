import React from 'react';
import logo from './logo.svg';
import './App.css';

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

const BasicInfo = (props) => {
  return (
    <div>
      <h1>{props.countryName}</h1>
      <ul>capital {props.capital}</ul>
      <ul>population {props.population}</ul>
      <h2>languages</h2>
    </div>
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
  return (
    <div>
      <Filter></Filter>
      <BasicInfo countryName='Switzerland' capital='Bern' population='235672'></BasicInfo>
      <Languages language='Swiss'></Languages>
      <Flag></Flag>
    </div>
  )
}

export default App;
