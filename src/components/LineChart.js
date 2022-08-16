import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const LineChart = () => {
  const [chart, setChart] = useState({})
  var baseUrl = "https://data.nasdaq.com/api/v3/datatables/ETFG/FUND.json?ticker=SPY&api_key=X3GzqBgru1BVNYbgjext";
  var proxyUrl = "https://cors-anywhere.herokuapp.com/";
  var apiKey = "X3GzqBgru1BVNYbgjext";



  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${proxyUrl}${baseUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${apiKey}`,
          'Access-Control-Allow-Origin': "*"
        }
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((json) => {
              console.log(json.data);
              setChart(json.data)
            });
          }
        }).catch((error) => {
          console.log(error);
        });
    };
    fetchData()
  }, [baseUrl, proxyUrl, apiKey])

  console.log("chart", chart);

  var data = {
    labels: chart?.nasdaq?.map(x => x.name),
    datasets: [{
      label: `Closing price`,
      data: chart?.nasdaq?.map(x => x.price),
      // backgroundColor: [
      //   'rgba(255, 99, 132, 0.2)',
      //   'rgba(54, 162, 235, 0.2)',
      //   'rgba(255, 206, 86, 0.2)',
      //   'rgba(75, 192, 192, 0.2)',
      //   'rgba(153, 102, 255, 0.2)',
      //   'rgba(255, 159, 64, 0.2)'
      // ],
      // borderColor: [
      //   'rgba(255, 99, 132, 1)',
      //   'rgba(54, 162, 235, 1)',
      //   'rgba(255, 206, 86, 1)',
      //   'rgba(75, 192, 192, 1)',
      //   'rgba(153, 102, 255, 1)',
      //   'rgba(255, 159, 64, 1)'
      // ],
      borderWidth: 1
    }]
  };

  var options = {
    maintainAspectRatio: false,
    scales: {
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
    plugins: {
      title: {
          display: true,
          text: 'SVSTR',
          position: 'top',
          padding: {
            top: 5,
            bottom: 15,
          },
          font: {
            size: 20,
          },
          color: '#51459E',
      }
    }
  }

  return (
    <div>
        <Line
          data={data}
          height={500}
          width={500}
          options={options}

        />
    </div>
  )
}

export default LineChart