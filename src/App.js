import React, { Component } from 'react';
import MapBox from "./components/MapBox/index"
import SelectBoroughs from "./components/SelectBoroughs/index"; 
import VictimSexChart from "./components/VictimSexChart/index";
import VictimAgeChart from "./components/VictimAgeChart/index";
import VictimRaceChart from "./components/VictimRaceChart/index";
import OccurDateChart from "./components/OccurDateChart/index";
import './App.css';
import axios from "axios"

const ALLBOROUGHS = "All Boroughs" 


class App extends Component { 
  state = {
    boroughs: [],
    sel_borough: "",
    sites: []
  }

  componentDidMount() {
    this.setState(
      {
        sel_borough: ALLBOROUGHS,
      },
        this.fetchSites
     );
    this.fetchBoroughs();
  } 

  fetchBoroughs = async () => {
    try {
      const res = await axios.get(
        'https://data.cityofnewyork.us/resource/5ucz-vwe8.json?$group=boro&$select=boro'
      );
      let dropdownBorough = res.data.map((x) => x.boro)
      let dropdown = [ALLBOROUGHS,...dropdownBorough] 
      this.setState({
        boroughs: dropdown
      });
    } catch (error) {
      console.log(error)
    }
  } 

  fetchSites = async () => { 
    let options = {}
    if (this.state.sel_borough !== ALLBOROUGHS) {
      options = { 
        params: {
          boro: this.state.sel_borough 
        }
      }
    }
    const res = await axios.get('https://data.cityofnewyork.us/resource/5ucz-vwe8.json',options)

    this.setState({
      sites: res.data
    })
  }


  handleInputChange = (event) => {
    this.setState(
      {
        sel_borough: event.target.value 
      },
      () => {
        this.fetchSites()
      })
  }




  render() {

    return (
      <>
        <nav className="nav-wrapper">
          <p className="center projectTitle p-0 text-white">NYC Shooting Incident Dashboard</p> 
        </nav>

      <div className="container-fluid"> 
      <div className="row mt-2 mb-0"> 
      <div className="col-md-3">
{/* 
      <a className="aboutBtn mt-2 waves-effect waves-light btn btn-block modal-trigger #3f88c5 text-white" href="#modal1">About the Project</a>

      <div id="modal1" className="modal">
        <div className="modal-content pb-0 mb-0"> 
          <p>This is a breakdown of every shooting incident that occurred in NYC during the current calendar year. This data is manually extracted every quarter and reviewed by the Office of Management Analysis and Planning before being posted on the NYPD website.
             Each record represents a shooting incident in NYC and includes information about the event, the location and time of occurrence. In addition, information related to suspect and victim demographics is also included (NYC OpenData).</p> 
          <div className="modal-footer mb-0 pb-0">
          <a href="#!" className="aboutCloseBtn modal-close waves-effect waves-green btn text-white #3f88c5">Close</a>
        </div>
        </div> 
      </div>  */}

      {/* <div className="searchCard"> 
      <h6>&nbsp;<b>Choose a Borough</b></h6> 
        <SelectBoroughs results={this.state.boroughs} handleInputChange={this.handleInputChange} /> 
        </div> */}
        <VictimSexChart results={this.state.sites}/> 
        <OccurDateChart results={this.state.sites}/>
        </div> 

        <div className="col-md-3">
        <VictimAgeChart results={this.state.sites}/> 
        <VictimRaceChart results={this.state.sites}/> 
        </div>
          <div className="col-md-6 mb-0 pb-0">
              <div className="card mb-0 pb-0"> 
                <MapBox results={this.state.sites}/> 
              </div>
          
              <p className="mr-1 justify-content-end text-right">Data Source: <a target="_blank" rel="noopener noreferrer" aria-label="NYC open data" href="https://data.cityofnewyork.us/City-Government/Privately-Owned-Public-Spaces-POPS-/rvih-nhyn">NYC OpenData  </a></p>
           
            </div> 
        </div>
       </div> 
      </>
    )
  }
}

export default App; 