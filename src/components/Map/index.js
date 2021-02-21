import React from "react";
import L from "leaflet";
import "leaflet.heat";

export default (props) => {
  React.useEffect(() => {
    const MAP_CONTAINER = document.getElementById("map-container");

    if (props.lat && props.lon && props.pins) {
      const MAP_ID = document.createElement("div");
      MAP_ID.setAttribute("id", "mapid");
      MAP_CONTAINER.appendChild(MAP_ID);

      let mymap; 
      props.pins.length > 200 ? 
      mymap = L.map("mapid").setView([props.lat, props.lon], 10) : mymap = L.map("mapid").setView([props.lat, props.lon], 15)

      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken: process.env.REACT_APP_MAP_API_KEY,
        }
      ).addTo(mymap);


      props.pins.forEach((pin) =>
         L.marker([pin.latitude, pin.longitude]).addTo(mymap).bindTooltip('<b>Victim Age Group:</b> <span>' + pin.vic_age_group + '</span><br/><b>Victim Sex:</b> <span>' + pin.vic_sex + '</span><br/><b>Victim Race: </b><span>' + pin.vic_race + '</span><br/><b>Occur Date: </b><span>' + pin.occur_date + '</span>')  
      );

    }

    return () => (MAP_CONTAINER.innerHTML = "");
  }, [props.lat, props.lon, props.pins]);

  return <div id="map-container"></div>;
};

