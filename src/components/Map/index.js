import React from "react";
import L from "leaflet";
import "leaflet.heat";
let counter = 0;
export default (props) => {

  const [currentCount, setCount] = React.useState(0);
  const timer = () => setCount(currentCount + 1);

  React.useEffect(
      () => {
          console.log(currentCount)
          const id = setInterval(timer, 1000);
          return () => clearInterval(id);
      },
      [currentCount]
  )

  React.useEffect(() => {

    const MAP_CONTAINER = document.getElementById("map-container");

    if (props.lat && props.lon && props.pins) {
      const MAP_ID = document.createElement("div");
      MAP_ID.setAttribute("id", "mapid");
      MAP_CONTAINER.appendChild(MAP_ID);

      let mymap = L.map("mapid").setView([props.lat, props.lon], 11) 

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

  //     const points = addressPoints
  //     ? addressPoints.map((p) => {
  //         return [p[0], p[1]];
  //       })
  //     : [];

  //   L.heatLayer(points).addTo(map);
  // }, []);

        const points = props.pins.map((location) => {
          return [location.latitude, location.longitude]
        })


        L.heatLayer(points).addTo(mymap);

    }
    console.log(counter++)

    return () => (MAP_CONTAINER.innerHTML = "");
  }, [props.lat, props.lon, props.pins]);

  return <div id="map-container"></div>;
};

