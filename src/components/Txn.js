import React from 'react'

export default function Txn({txnDetails,Data}) {
    console.log(txnDetails,"ll")
  return (
    <>
        <div className=" main-content">
    <div className="container mt-7 ">
      {/* Table */}
     
      <div className="row">
        <div className="col">
          <div className="card shadow overflow-scroll">
            <div className="card-header border-0">
              <h3 className="mb-0">Request Id : {Data.requestId}</h3>
              <hr/>
            </div>


            
            
                <div className=' container m-5 mt-2 '>
                         <b>Transaction Hash</b> &nbsp;: {txnDetails.hash}
                        <br/>
                        <b>Block Number</b> : {parseInt(txnDetails.blockNumber)}
                        <br/>
                        
                        <b>From Account</b> : {txnDetails.from}
                        <br/>
                        <b>To Account</b> : {txnDetails.to}
                        <br/>
                        <b>Gas</b> : {parseInt(txnDetails.gas)}
                        <br/>
                        <b>Gas Price</b> : {parseInt(txnDetails.gasPrice)}
                        <br/>
                        <b>Reason</b> : {Data.purpose}
                    </div>

              
                    
                
              
                
            
            </div>
            
          </div>
        </div>
      </div>
      
      
    </div>
  

    </>
   
  )
}
