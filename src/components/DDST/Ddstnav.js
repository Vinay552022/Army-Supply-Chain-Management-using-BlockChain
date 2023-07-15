import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
export default function Ddstnav(props) {
  
  return (
    <>
          <div
    className="offcanvas offcanvas-start"
    data-bs-scroll="true"
    tabIndex={-1}
    id="offcanvasWithBothOptions"
    aria-labelledby="offcanvasWithBothOptionsLabel"
  >
    <div className="offcanvas-header">
      <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
        SCM
      </h5>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      />
    </div>
    <div className="offcanvas-body">
      
      <div className=" navmenu navmenu-default navmenu-fixed-left ">
      <ul className=" nav navmenu-nav flex-column">
        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/FromDGSTpending">Pending Req From DGST</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/FromDGSTaccepted">Accepted Req From DGST</Link></li>
        <li className="nav-item"><Link className="nav-link" onClick={props.Logout}>Logout</Link></li>
      </ul>
      
         
    </div>
    </div>
  </div>
  <nav className="navbar  navbar-expand-lg  ">
  <div className="container">
      <button
        className="btns btn"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasWithBothOptions"
        aria-controls="offcanvasWithBothOptions"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <Link className="me-auto navbar-brand ms-lg-2 ms-md-2 " to="/">
        DDST
      </Link>
      <form className="d-flex ">
        <input className="form-control ms-sm-3" type="search" placeholder="Search" onChange={(e)=>props.setSearchQuery(e.target.value)} aria-label="Search"/>
      </form>
      
    </div>
  </nav>
  
    </>

  )
}