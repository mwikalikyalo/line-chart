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
  var baseUrl = "https://data.nasdaq.com/api/v3/datatables/ETFG/FUND.json?ticker=SPY,IWM&api_key=YOURAPIKEY";
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
      backgroundColor: [
        '##51459E',
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