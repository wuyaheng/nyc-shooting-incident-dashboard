import React from "react";
import { Bar } from "react-chartjs-2";
import 'chartjs-plugin-labels';

function VictimAgeChart(props) {
    console.log(props.results)

  const BarChart = ({ type }) => {
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
        text: 'Shooting Incident By Victim Age Group', 
        fontSize: 15
     },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            },
            ticks: {
              display: true
            }
          }
        ],
        yAxes: [{
          ticks: {
            display: true
          },
          gridLines: {
            display: true
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

      console.log("before",entries)
      let last = entries.splice(4,1)
      let unArray = last[0]
      entries.unshift(unArray)
     return (
        <Bar
          data={{
            labels: entries.map((x) => x?.[0]),
            datasets: [
              {
                data: entries.map((x) => x?.[1]), 
                backgroundColor: colorArray
              },
            ],
          }}
          options={options} 
        />
      );

  };



  return (
        <div>
          <BarChart type="vic_age_group" />
        </div>
  );
}

export default VictimAgeChart;