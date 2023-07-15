import React from 'react'
import { Link } from 'react-router-dom';

function TableGetUnits({AdstMails,pending}) {
  let map=new Map()
  let key=0;
  console.log(pending)
  for(let i=0;i<pending.length;i++){
    map.set(AdstMails[i],parseInt(pending[i]))
  }
  let sortedmap= new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
  function setAdst(selectedAdst){
    sessionStorage.setItem("selectedAdst",JSON.stringify([selectedAdst]))
  }
  return (
    <>
        <div className="main-content">
    <div className="container mt-7">
      {/* Table */}
    <h2 className=' mb-5'>ADST's </h2>
     
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-header border-0">
              <h3 className="mb-0"></h3>
            </div>
            <div className="table-responsive">
              <table className="table align-items-center table-flush">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Unit Id</th>
                    <th scope="col">Pending Requests</th>
                    <th scope="col">Accepted Requests</th>
                  </tr>
                </thead>
                <tbody>
                  
                  
                  {[...sortedmap.entries()].map((data,index)=>{
                      return (
                        <>
                          <tr >
                    <th scope="row">
                      {index+1}
                    </th>
                    <td>
                    <div className="media align-items-center">
                        <div className="media-body">
                          <span className="mb-0 text-sm">
                            {data[0]}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                    <Link to="/Adstpending">
                    <button type="button" className=" btn btn-info position-relative" key={index} onClick={(e)=>{setAdst(data[0])}}>
                    Pending
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {data[1]}
                        <span className="visually-hidden">unread messages</span>
                    </span>
                    
                    </button>
                    </Link>
                    
                    </td>
                    <td>
                      <Link to="/Adstaccepted">
                    <button type="button" className=" btn btn-success position-relative" onClick={(e)=>{setAdst(data[0])}}>
                    Accepted
                    </button>
                    </Link>
                    </td>
                  </tr>
                        </>
                      )
                  })}
                            
                        

                        
                      
                  
                  
                  
                </tbody>
              </table>
            
            </div>
            
          </div>
        </div>
      </div>
      
      
    </div>
  </div>



    </>
    
  )
}

export default TableGetUnits