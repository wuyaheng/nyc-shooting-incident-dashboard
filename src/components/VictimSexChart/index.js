import React from "react";
import { Doughnut } from "react-chartjs-2";
import 'chartjs-plugin-labels';

function VictimSexChart(props) {

  const DoughnutChart = ({ type }) => {
    const obj = {};
    const colorArray = [
        "#cc8b86",
        "#9eb3c2",
        "#fedc97"
      ];

    let options = {
      legend: {
        display: true,
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
        text: 'Shooting Incident By Victim Sex', 
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

      for (let i = 0; i < entries.length; i++) {
        if (entries[i][0] === "F") {
          entries[i][0] = "Female"
        } else if (entries[i][0] === "M") {
          entries[i][0] = "Male"
        } else {
          entries[i][0] = "Unknown"
        }
      }
     return (
        <Doughnut
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
          height={300}
        />
      );

  };



  return (
        <div>
          <DoughnutChart type="vic_sex" />
        </div>
  );
}

export default VictimSexChart;