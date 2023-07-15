import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "../Table.css"

export const TableDDSTAccepted = (props) => {
    let {Items,Quantities, Status,Ids,DdstMail,AdstMail,Timestamps,AcceptedBy}=props;
    console.log(Items,Quantities,"li",AcceptedBy,AdstMail)
    let items=Items.split(" ");
    let quantitis=Quantities.split(" ")
    
    
  
    
    
    
  return (
<>
  <div className="main-content">
    <div className="container mt-7">
      {/* Table */}
     
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-header border-0">
              <h3 className="mb-0">Request Id : {Ids}</h3>
            </div>
            <div className="table-responsive">
              <table className="table align-items-center table-flush">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Unit Id</th>
                    <th scope="col">Items</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Req.Date</th>
                    <th scope='col'>Accepted By</th>
                    <th scope="col">Status</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  
                  
                  {
                    
                    items.length>0 && items.map((data,index)=>{
                      
                      
                      // console.log(Quantities)
                      let date=(new Date(Timestamps*1000)).toLocaleDateString()
                     
                      
                        return(
                          <>
                            <tr>
                    <th scope="row">
                      {index+1}
                    </th>
                    <td>
                    <div className="media align-items-center">
                        <div className="media-body">
                          <span className="mb-0 text-sm">
                            {AdstMail}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                    <div className="media align-items-center">
                        <div className="media-body">
                          <span className="mb-0 text-sm">
                            {data}
                          </span>
                        </div>
                      </div>
                    </td>
                   
                    <td>
                      {quantitis[index]}
                    </td>
                    <td>
                    <div className="media align-items-center">
                        <div className="media-body">
                          <span className="mb-0 text-sm">
                            {date}
                          </span>
                        </div>
                      </div>
                    </td>
                    
                    <td>
                    <div className="media align-items-center">
                        <div className="media-body">
                          <span className="mb-0 text-sm">
                            {AcceptedBy}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="color badge badge-dot mr-4">
                        <i className="bg-success " /> {Status}
                      </span>
                    </td>
                  </tr>
                          </>

                        )
                      })
                  
                  }
                  
                </tbody>
              </table>
              <div className="card-footer py-4">
              <nav aria-label="...">
              <Link to="/Tracking">
                <button className='btns btn btn-primary'onClick={()=>sessionStorage.setItem("Id",Ids)}>track</button>
                </Link>
                <Link to="/TransactionDetails">
                <button className='btns btn btn-primary'onClick={()=>sessionStorage.setItem("details",JSON.stringify([Ids,JSON.parse(localStorage.getItem("Mail"))]))}>Transactions</button>
                </Link>

                  
                   
              </nav>
            </div>
            </div>
            
          </div>
        </div>
      </div>
      
      
    </div>
  </div>
 
</>


  
  )
}
