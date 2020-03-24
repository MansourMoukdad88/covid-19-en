import React, { Component, Fragment } from 'react';
import './App.css';
import {Confirmed, ConfirmedLabel, Recovered, RecoveredLabel, Deaths, DeathsLabel, DivUpdate} from './styled'

class Search extends Component {

    state = {
      values: [],
      names:[],
      confirmed: null,
      recovered:null,
      deaths:null,
      // test:{},
      currentCountry: "",
      lastUpdate:""
    };

  // ComponentDidMount
  componentDidMount = () =>{
    fetch(`https://covid19.mathdro.id/api/countries/`)
    .then(response => response.json())
    .then(data => {
      // this.setState({test: data.countries})
      // console.log("qqqqq", Object.keys(data.iso3));
      
      let iso3Array = [];
      let iso3 = Object.keys(data.iso3);
      iso3.map(key => {
        iso3Array.push(key);
      });

      let namesOfCountries = Object.keys(data.countries);
      let optionsArray = [];
      namesOfCountries.map(key => {
        optionsArray.push(key);
      });

      this.setState({names: optionsArray, value:iso3Array});
    });
  }


  // HandleChange
  handleChange = (event) => {
    let val = event.target.value;
    fetch( `https://covid19.mathdro.id/api/countries/${val}`)
    .then(response => response.json())
    .then(data => {
      let confirmed = data.confirmed.value;
      let recovered = data.recovered.value;
      let deaths = data.deaths.value;
      let lastUpdate = data.lastUpdate
      let currentCountry = val
      this.setState({confirmed, recovered, deaths, currentCountry, lastUpdate})
    });
  };

// Render function 
  render() {
    const { names, confirmed, recovered, deaths, currentCountry, lastUpdate } = this.state;
    const renderName = names.map((el,index) => { 
      return(
        <Fragment key={index}>
          <option className="items-options" value={el} >{el}</option>
        </Fragment>
      )
    });

  return (
    <div>
        <label className="search-form">
          <select className="select-item" value={currentCountry} onChange={this.handleChange}>
            {renderName}
          </select>
        </label>
      <div>
      {recovered === null ? "" : (
      <div className="entireData-items">
        <h1>{currentCountry}</h1>
        <div className="global-item">
          <Confirmed> {confirmed} </Confirmed>
          <ConfirmedLabel>confirmed</ConfirmedLabel>
        </div>
        <div className="global-item">
          <Recovered> {recovered}</Recovered>
          <RecoveredLabel>recovered</RecoveredLabel>
        </div>
        <div className="global-item">
          <Deaths> {deaths}</Deaths>
          <DeathsLabel>deaths</DeathsLabel>
        </div>
        <br></br> <br></br>
        <DivUpdate>{ lastUpdate && (<div>Updated: {new Date(lastUpdate).toLocaleString()}</div>)}</DivUpdate>
      </div>
      )}
      </div>
    </div>
  );
  }
}

export default Search;