import React from "react";
import L from "leaflet";
import "leaflet.heat";

export default (props) => {

  React.useEffect(() => {

    const MAP_CONTAINER = document.getElementById("map-container");

    if (props.results) {
      const MAP_ID = document.createElement("div");
      MAP_ID.setAttribute("id", "mapid");
      MAP_CONTAINER.appendChild(MAP_ID);

      let mymap = L.map("mapid").setView([40.746106816563156, -73.92531492341064], 11) 

      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v8",
          tileSize: 512,
          zoomOffset: -1,
          accessToken: process.env.REACT_APP_MAP_API_KEY,
        }
      ).addTo(mymap);

        const points = props.results.map((location) => {
          return [location.latitude, location.longitude]
        })


        L.heatLayer(points, {radius: 35, blur: 10}).addTo(mymap);

    }

    return () => (MAP_CONTAINER.innerHTML = "");
  }, [props.results]);

  return <div id="map-container"></div>;
};

