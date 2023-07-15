import React, { useContext, useEffect, useState } from 'react'
import "../Tracking.css"
import { SolidityContext } from '../App'
export default function Tracking() {
    const {contract,currentAccount}=useContext(SolidityContext);
    const [status,setStatus]=useState();
    const [tracking,setTracking]=useState([]);
    const [timestamps,setTimestamps]=useState([])
    const id=parseInt(sessionStorage.getItem("Id"))
    useEffect(()=>{
        async function getDetails(){
            try{
            let {0:Status,1:Tracking,2:Timestamps}=await contract.methods.getTracking(id).call();
            console.log(Timestamps)
            Timestamps=Timestamps.map((data,index)=>parseInt(data))
            console.log(Status,Tracking,Timestamps)
            setStatus(Status)
            setTracking(Tracking)

            setTimestamps(Timestamps)
            }
            catch(e){
                console.log(e)

            }
           
        }
        getDetails()
    },[contract])
  return (
    <>
        <div className="container">
        <div className="page-header mt-4">
            <h1 id="timeline" className="Theading m-3">Request Timeline</h1>
        </div>
        <ul className="timeline" id="timeline1">

            {tracking.length>0 && tracking.map((data,index)=>{
                if(index==tracking.length-1 && status!="accepted"){
                    return(
                        <>
                        <li className={`${index % 2==0?"":"timeline-inverted"}`}> 
                <div className="timeline-badge" />
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h4 className="timeline-title">status : Request {data} </h4>
                    
                  </div>
                  <div className="timeline-body">
                    <p>on {(new Date(timestamps[index]*1000)).toLocaleString()}</p>
                  </div>
                </div>
              </li>
              <li className={`${(index+1) % 2==0?"":"timeline-inverted"}`}> 
                <div className="timeline-badge" />
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h4 className="timeline-title">status : Waiting for the response </h4>
                    
                  </div>
                  <div className="timeline-body">
                    <p>...</p>
                  </div>
                </div>
              </li>
                            </>
                    )


                }
                else{
                return(
                    <>
                <li className={`${index % 2==0?"":"timeline-inverted"}`}> 
        <div className="timeline-badge" />
        <div className="timeline-panel">
          <div className="timeline-heading">
            <h4 className="timeline-title">status : Request {data} </h4>
            
          </div>
          <div className="timeline-body">
            <p>on {(new Date(timestamps[index]*1000)).toLocaleString()}</p>
          </div>
        </div>
      </li>
                    </>
                )
                }

            })
}
        </ul>
        </div>

    </>
  )
}
