import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "../Table.css"
import Web3 from "web3"
export const TableDDST = (props) => {
    let {Items,Quantities, Status,Ids,mailid,Timestamps,contract,account}=props;
    console.log(Items,Quantities,"li")
    let items=Items.split(" ");
    let quantitis=Quantities.split(" ")
    let DDSTmail=JSON.parse(localStorage.getItem("Mail"));
    const [getSentToUnits,setGetSendToUnits]=useState([]);
    const [getSentToASC,setGetSendToASC]=useState([]);
   
    const [flag,setFlag]=useState()
    const [flagDgst,setFlagDgst]=useState()
    async function sendToASC(Id){
        console.log(contract,account) 
        await contract.methods.sendtoASC(parseInt(Id),DDSTmail[0]).send({from:account});
        setFlagDgst(true)
        setTransactionDetails("Sent Request to ASC")

    }
    async function sendToUnits(Id){
      console.log(contract,account) 
      await contract.methods.sendToUnits(parseInt(Id),DDSTmail[0]).send({from:account});
      setFlag(true)
      setTransactionDetails("Sent Request to Units")

  }
    useEffect(()=>{
        async function getSent(){
            let getSenttoUnits=await contract.methods.getSentToUnits(DDSTmail[0]).call();
            getSenttoUnits=getSenttoUnits.map((data,index)=>parseInt(data))
            setGetSendToUnits(getSentToUnits);
            setFlag(getSenttoUnits.includes(Ids))
        }
        getSent()

    },[])
    useEffect(()=>{
      async function getSentToDGST(){
          let getSenttoASC=await contract.methods.getSentToASC(DDSTmail[0]).call();    
          getSenttoASC=getSenttoASC.map((data,index)=>parseInt(data))
          console.log(getSentToASC)
          setGetSendToASC(getSenttoASC);
          setFlagDgst(getSenttoASC.includes(Ids))
      }
      getSentToDGST()

  },[])
  async function setTransactionDetails(msg){
    
    const web3=new Web3(window.ethereum);

       const lastBlockNumber = await web3.eth.getBlockNumber();
       console.log('Last block number: ', lastBlockNumber);

       let block = await web3.eth.getBlock(lastBlockNumber);



       const lastTransaction = block.transactions[block.transactions.length - 1];
       console.log('Last transaction hash: ', lastTransaction);
       let details={
         txnhash:lastTransaction,
         requestId:parseInt(Ids),
         mailId:DDSTmail[0],
         purpose:msg
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
                            {mailid}
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
              <Link to="/Tracking">
                <button className='btns btn btn-primary'onClick={()=>sessionStorage.setItem("Id",Ids)}>track</button>
                </Link>
                
                {flag || <button className='btns btn btn-primary'  onClick={(e)=>{sendToUnits(Ids)}}>send to Units</button>}
                { flag && <button className='btns btn btn-secondary' disabled  onClick={(e)=>{sendToUnits(Ids)}}>sent to Units</button>}


                {flagDgst || <button className='btns btn btn-primary'  onClick={(e)=>{sendToASC(Ids)}}>send to ASC</button>}
                { flagDgst && <button className='btns btn btn-secondary' disabled  onClick={(e)=>{sendToASC(Ids)}}>sent to ASC</button>}
                <Link to="/TransactionDetails">
                <button className='btns btn btn-primary'onClick={()=>sessionStorage.setItem("details",JSON.stringify([Ids,DDSTmail]))}>Transactions</button>
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
