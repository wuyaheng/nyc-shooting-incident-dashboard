import React from "react";
import { Radar } from "react-chartjs-2";
import 'chartjs-plugin-labels';

function VictimRaceChart(props) {
    console.log(props.results)

  const RadarChart = ({ type }) => {
    const obj = {};
    const colorArray = [
        "#cc8b86",
        "#a0ced9",
        "#f5cb5c",
        "#99c2a2",
        "#b392ac",
        "#7f7f7f"
      ];

    let options = {
      legend: {
        display: false,
        reverse: true
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        labels: {
          render: 'value',
          precision: 0,
          showZero: true,
          fontSize: 13,
          fontColor: '#fff',
          arc: false,
          showActualPercentages: true,
          outsidePadding: 4,
          textMargin: 4
        }
      },
      title: {
        display: true,
        text: 'Shooting Incident By Victim Race', 
        fontSize: 15
     },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            },
            ticks: {
              display: false
            }
          }
        ],
        yAxes: [{
          ticks: {
            display: false
          },
          gridLines: {
            display: false
          }
      }]
      }
    };

    props.results.forEach((ele) => {
      const key = ele[type];
      if (key)
        if (obj[key]) {
          obj[key] += 1;
        } else {
          obj[key] = 1;
        }
    });

    let entries =
      Object.entries(obj).sort((a, b) => (a[0] > b[0] ? 1 : -1)) || [];
     return (
        <Radar
          data={{
            labels: entries.map((x) => x[0]),
            datasets: [
              {
                data: entries.map((x) => x[1]), 
                backgroundColor: colorArray
              },
            ],
          }}
          options={options} 
          height={"300px"}
        />
      );

  };



  return (
        <div>
          <RadarChart type="vic_race" />
        </div>
  );
}

export default VictimRaceChart;