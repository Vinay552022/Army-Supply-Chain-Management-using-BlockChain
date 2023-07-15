import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import "../Table.css"
import Web3 from "web3"
export const TableDDSTtoADST = (props) => {
    let {Items,Quantities, Status,Ids,ddstMail,mailid,Timestamps,mailIds,contract,account,setFlag}=props;
    
    let items=Items.split(" ");
    let quantitis=Quantities.split(" ")
    async function Accept(){
      console.log(typeof(Ids),Ids,ddstMail,mailid)
      await contract.methods.updateStatus(Ids,ddstMail,mailid[0]).send({from:account});
      setTransactionDetails()
      setFlag((prev)=>!prev)

    }
    async function setTransactionDetails(){
      
      const web3=new Web3(window.ethereum);
 
         const lastBlockNumber = await web3.eth.getBlockNumber();
         console.log('Last block number: ', lastBlockNumber);
 
         let block = await web3.eth.getBlock(lastBlockNumber);
 
 
 
         const lastTransaction = block.transactions[block.transactions.length - 1];
         console.log('Last transaction hash: ', lastTransaction);
         let details={
           txnhash:lastTransaction,
           requestId:parseInt(Ids),
           mailId:mailid[0],
           purpose:"Accepted Request"
         }
         const response=await fetch("http://localhost:5000/TransactionPost",{
           method:"post",
           headers:{
             "Content-type":"application/json",
           },
           body:JSON.stringify(details)
         });
 
 
   }
    
    
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
                            {mailIds}
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
                      <span className="color badge badge-dot mr-4">
                        <i className="bg-warning " /> {Status}
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
                <button className='btns btn btn-primary' onClick={Accept}>Accept</button>
                <Link to="/TransactionDetails">
                  {console.log(mailid,"ll")}
                <button className='btns btn btn-primary'onClick={()=>sessionStorage.setItem("details",JSON.stringify([Ids,mailid]))}>Transactions</button>
                </Link>
                <Link to="/Tracking">
                <button className='btns btn btn-primary'onClick={()=>sessionStorage.setItem("Id",Ids)}>track</button>
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
