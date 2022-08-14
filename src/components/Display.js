import React from 'react'
import LineChart from './LineChart'
import Navbar from './Navbar'

function App() {
  return (
    <div className="container-fluid">
      <div className='navbar'>
          <Navbar />
      </div> 
      <div className="line-chart">
          <LineChart />
      </div>     
    </div>
  )
}

export default App