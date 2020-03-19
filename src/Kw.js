import React, { Component } from 'react'

class Kw extends Component {
  state = {
    global: "mansour"
  };

  componentDidMount(){
    fetch("https://covid19.mathdro.id/api/countries/Kuwait")
    .then(response => response.json())
    .then(data => {      
      let globalConfirmed = data.confirmed.value;
      let globalRecovered = data.recovered.value;
      let globalDeaths = data.deaths.value;
      let global = [globalConfirmed, globalRecovered, globalDeaths];
      this.setState({ global:global })
    });
  }

  render() {
    let som = this.state
   
    return (
      <div className="entireData-items">
        <h2>Kuwait</h2>
        <div className="global-item">
          <p style={{"color": "orange", "fontWeight":"bold"}}> {som.global[0]} </p>
          <label  style={{"color": "orange", "fontSize":"12px"}}>Confirmed</label>
        </div>
        <div className="global-item">
          <p style={{"color": "green", "fontWeight":"bold"}}> {som.global[1]}</p>
          <label style={{"color": "green", "fontSize":"12px"}}>Recovered</label>
        </div>
        <div className="global-item">
          <p style={{"color": "red", "fontWeight":"bold"}}> {som.global[2]}</p>
          <label style={{"color": "red", "fontSize":"12px"}}>Deaths</label>
        </div>
        <br></br>
        <br></br>

      </div>
    )
  }
}

export default Kw;