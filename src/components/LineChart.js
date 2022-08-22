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
  var baseUrl = "https://api.coinranking.com/v2/coins/?limit=10";
  var proxyUrl = "https://cors-anywhere.herokuapp.com/";
  var apiKey = "coinranking880bf7d5e9527019e8d11472ed5c31bb2e106f1e6fc9ccda";


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
      // promise
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
    labels: chart?.coins?.map(x => x.name),
    datasets: [{
      label: `Closing Price`,
      data: chart?.coins?.map(x => x.price),
      backgroundColor: [
        '#51459E',
    ],
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
    responsive: true,
    plugins: {
      title: {
          display: true,
          text: 'SVSTR',
          position: 'top',
          padding: {
            top: 5,
            bottom: 15,
          },
          align: 'start',
          font: {
            size: 20,
          },
          color: '#51459E',
      }
    }
  }

  return (
    <div style={{height:"90vh", width: "140vh"}}>
        <Line
          data={data}
          options={options}
        />
    </div>
  )
}

export default LineChart