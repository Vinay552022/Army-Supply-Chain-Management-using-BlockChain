import React from 'react'
import { Link } from 'react-router-dom'
import "../../SCM.png"
export default function Loginnav() {
  return (
    <>
  {/* Hello world */}
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
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Process Flow
</button>   
      

      </div>
  </div>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-fullscreen">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Process flow diagram</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <img  src={require('../../SCM.png')} class="img-fluid" alt="Responsive image"/>
      </div>
      <div class="modal-footer">
        
        
      </div>
    </div>
  </div>
</div>
  <nav className="navbar  navbar-expand-lg  ">
    <div className="container">
      <button
        className="btns btn me-2"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasWithBothOptions"
        aria-controls="offcanvasWithBothOptions"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <Link className=" navbar-brand me-auto ms-3" to="/">
        Login Page
      </Link>
      <h1 className=" navbar-brand ">SCM</h1>
      
    </div>
  </nav>
</>

  )
}
