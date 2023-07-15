import React, { useState,useContext,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "../../Request.css"
import { SolidityContext } from '../../App';
import Web3 from 'web3';
export const RequestForm = () => {
  const Navigate=useNavigate()
  const [items,setItems]=useState([]);
  const [Quantities,setQuantities]=useState([]);
  const [item,setItem]=useState("");
  const [Quantity,setQuantity]=useState("")
  const [adstMail,setAdstMail]=useState("");
  let AdstMail;
  let contextUser=useContext(SolidityContext)
  const submit=async()=>{
    let contract=contextUser.contract;
    console.log(contract,"sp")
    AdstMail=JSON.parse(localStorage.getItem("Mail"));
    setAdstMail(AdstMail[0])
    console.log(AdstMail[0],contextUser.currentAccount,items,Quantities)
    console.log(items.join(" "),Quantities.join(" "))
    // setItem("Choose...")
    // setQuantity("");

    try{
     await contract.methods.getADSTrequest(items.join(" "),Quantities.join(" "),AdstMail[0]).send({from:contextUser.currentAccount});
     setTransactionDetails()
    }
    catch(e){
      console.log(e)
    }
    setItems([])
    setQuantities([])
    setItem("")
    setQuantity("")
     
  }
  function onchangeHandler2(e){
    setQuantity(e.target.value)
  }
  function onchangeHandler1(e){
    
    setItem(e.target.value)
  }
  function add(e){
    e.preventDefault();
    setItems((prev)=>{
      return [...prev,item]
    })
    console.log(Quantity)
    if(Quantity==''){
      setQuantities((prev)=>{
        return [...prev,0]
      })
    }
    else{
    setQuantities((prev)=>{
      return [...prev,Quantity]
    })
  }
    console.log(Quantities,items)

  }
  async function setTransactionDetails(){
     let id=await contextUser.contract.methods.getCurrentId().call();
     const web3=new Web3(window.ethereum);

        const lastBlockNumber = await web3.eth.getBlockNumber();
        console.log('Last block number: ', lastBlockNumber);

        let block = await web3.eth.getBlock(lastBlockNumber);



        const lastTransaction = block.transactions[block.transactions.length - 1];
        console.log('Last transaction hash: ', lastTransaction);
        console.log(AdstMail,"l")
        let details={
          txnhash:lastTransaction,
          requestId:parseInt(id)-1,
          mailId:AdstMail[0],
          purpose:"create and send Request to DDST"
        }
        const response=await fetch("http://localhost:5000/TransactionPost",{
          method:"post",
          headers:{
            "Content-type":"application/json",
          },
          body:JSON.stringify(details)
        });
        
        


  }
  function Remove(e,index){
    e.preventDefault()
    console.log(index)
    setItems((prev)=>{
      let x=[...prev]
      x.splice(index,1)
      return x

    })
    setQuantities((prev)=>{
      let x=[...prev]
      x.splice(index,1)
      return x
    })

  }
  
  return (
    <>

<div className="container contact-form">
    <div className="contact-image">
      <img
        src="https://image.ibb.co/kUagtU/rocket_contact.png"
        alt="rocket_contact"
      />
    </div>
    
    <form>
    <h3>Request for supplies</h3>
  <div className="row mb-3">
    <label htmlFor="input1"  className="col-sm-2 col-form-label" ><h2> Items </h2></label>
    <select id="input1" className="form-select form-select-lg"  value={item} defaultValue={"Choose..."} onChange={onchangeHandler1}>
           <option value={"Choose..."}>Choose...</option>         
          <option>Rice</option>
					<option>grains</option>
          <option>Paracetamol</option>
					<option>Chlorhexidine </option>
      </select>
    
  </div>
  <div className="row mb-3">
    <label htmlFor="input" className="col-sm-2 col-form-label"><h2> Quantity </h2></label>
    <div className="col-sm-10">
      <input type="number"  className="form-control form-control-lg" id="input" value={Quantity} defaultValue={0}  onChange={onchangeHandler2}/>
    </div>
    
  </div>
  <div className='row'>
  <div className="col-2">
                  <button  className="btn btn-primary mt-4" onClick={add}>Add to cart</button>
                </div>
  <div className="col-2">
            <button  className="btn btn-primary mt-4"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal">check</button>
          </div>
          </div>
  
    </form>
  
          

        
  </div>



  <div
    className="modal fade"
    id="exampleModal"
    tabIndex={-1}
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Added items
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
        <table className="table">
  <thead>
    <tr>
      <th scope="col">No</th>
      <th scope="col">Item</th>
      <th scope="col">Quantity</th>
      <th scope="col">Remove</th>

      
    </tr>
  </thead>
  <tbody>
    {    
      
       Quantities.length>0 && Quantities.map((data,index)=>{
        return(
        <tr>
      <th scope="row" key={index} >{index+1}</th>
      <td key={index}>{items[index]}</td>
      <td key={index}>{data}</td>
      <td><button  className="btns btn btn-primary" type="button" key={index} onClick={(e)=>Remove(e,index)}>Remove</button></td>
    </tr>

       )})
    }
    
  </tbody>
</table>



        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" onClick={()=>{submit()}} data-bs-toggle="modal"
            data-bs-target="#exampleModal" className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>


    </>
  )
}
