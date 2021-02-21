import React, { Component } from 'react';
import Map from "./components/Map/index";
import VictimSexChart from "./components/VictimSexChart/index";
import VictimAgeChart from "./components/VictimAgeChart/index";
import VictimRaceChart from "./components/VictimRaceChart/index";
import OccurDateChart from "./components/OccurDateChart/index";
import OccurTimeChart from "./components/OccurTimeChart/index"; 
import './App.css';
import axios from "axios"

const ALLBOROUGHS = "All Boroughs" 


class App extends Component { 
  state = {
    sites: []
  }

  componentDidMount() {
      this.fetchSites()
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
    const res = await axios.get('https://data.cityofnewyork.us/resource/5ucz-vwe8.json?$limit=50000',options)

    this.setState({
      sites: res.data
    })
  }






  render() {

    return (
      <>
        <nav className="nav-wrapper">
          <p className="center projectTitle p-0 text-white">2020 NYC Shooting Incident Dashboard</p> 
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

        <div className="card horizontal">
        <div className="card-content">
          <p>Total Number of NYC Shooting Incidents</p>
          <h1 className="text-center" style={{color: "#cc8b86", fontWeight: 700}}>{this.state.sites.length}</h1>
          <p className="justify-content-end text-right">Data Source: <a target="_blank" rel="noopener noreferrer" aria-label="NYC open data" href="https://data.cityofnewyork.us/City-Government/Privately-Owned-Public-Spaces-POPS-/rvih-nhyn">NYC OpenData  </a></p>
        </div>
        </div>
        <VictimSexChart results={this.state.sites}/> 

        </div> 

        <div className="col-md-4">
        <VictimAgeChart results={this.state.sites}/> 

        <VictimRaceChart results={this.state.sites}/> 
        </div>

          <div className="col-md-5 mb-0 pb-0">
              <div className="card mb-0 pb-0"> 
                <Map results={this.state.sites}/> 
              </div>
           
            </div> 
        </div>

        <div className="row">
        <div className="col-md-12">
        <OccurDateChart results={this.state.sites}/>
        </div>
        </div>
        <div className="row">
        <div className="col-md-12">
          <OccurTimeChart results={this.state.sites}/>
        </div>
        </div>
       </div> 
      </>
    )
  }
}

export default App; 
