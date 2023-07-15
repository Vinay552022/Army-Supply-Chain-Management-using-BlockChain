import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "../Table.css"
import Web3 from "web3"
export const TableDDSTtoDGSTPending = (props) => {
    let {Items,Quantities, Status,Ids,mailid,Timestamps,contract,account,setFlagAccept,uintId}=props;
    console.log(Items,Quantities,"li")
    let items=Items.split(" ");
    let quantitis=Quantities.split(" ")
    let DGSTmail=JSON.parse(localStorage.getItem("Mail"));
    const [getSentToDivisions,setGetSentToDivisions]=useState([]);
    const [getSentToManufacturer,setGetSentToManufacturer]=useState([]);
   
    const [flag,setFlag]=useState()
    const [flagDgst,setFlagDgst]=useState()
    
    async function accept(Id){
        await contract.methods.DGSTaccept(parseInt(Id),DGSTmail[0],mailid).send({from:account});
        setFlagAccept(true)
        setTransactionDetails("Accepted Request")
    }
    async function sendToDivisions(Id){
        console.log(contract,account) 
        await contract.methods.sendToDivisions(parseInt(Id),DGSTmail[0]).send({from:account});
        setFlag(true)
        setTransactionDetails("Sent Request to Divisions")

    }
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
           mailId:DGSTmail[0],
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



    async function sendToManufacturer(Id){
      console.log(contract,account) 
      await contract.methods.sendToManufacturer(parseInt(Id),DGSTmail[0]).send({from:account});
      setFlagDgst(true)

  }
    useEffect(()=>{
        async function getSenttoDDST(){
            let getSenttoDivisions=await contract.methods.getSentToDivisions(DGSTmail[0]).call();
            getSenttoDivisions=getSenttoDivisions.map((data,index)=>parseInt(data))
            setGetSentToDivisions(getSenttoDivisions);
            setFlag(getSenttoDivisions.includes(Ids))
        }
        getSenttoDDST()
    },[])
    useEffect(()=>{
      async function getSentToManufacturer(){
        //   let getSenttoManufacturer=await contract.methods.getSenttoManufacturer(DGSTmail[0]).call();    
        //   getSenttoManufacturer=getSenttoManufacturer.map((data,index)=>parseInt(data))
        //   console.log(getSenttoManufacturer)
        //   setGetSentToManufacturer(getSenttoManufacturer);
        //   setFlagDgst(getSenttoManufacturer.includes(Ids))
      }
      getSentToManufacturer()

  },[])
    
    
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
                            {uintId}
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
                <button className='btns btn btn-primary '  onClick={(e)=>{accept(Ids)}}>Accept</button>
                {flag || <button className='btns btn btn-primary'  onClick={(e)=>{sendToDivisions(Ids)}}>send to Divisions</button>}
                { flag && <button className=' btn btn-secondary' disabled  onClick={(e)=>{sendToDivisions(Ids)}}>send to Divisions</button>}


               
                <Link to="/TransactionDetails">
                <button className='btns btn btn-primary'onClick={()=>sessionStorage.setItem("details",JSON.stringify([Ids,[...DGSTmail]]))}>Transactions</button>
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
