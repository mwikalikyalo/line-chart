import React from 'react'
import List from './List'

function Navbar() {
  return (
    <div className="container-fluid navv">
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand nas" href="#">Nasdaq</a>
        </div>
        <div className="container-fluid">
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Type here to search" aria-label="Search" />
          </form>
        </div>
        <List/>
      </nav>
    </div>
  )
}

export default Navbar