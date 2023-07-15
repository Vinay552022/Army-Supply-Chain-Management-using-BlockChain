import React, { useContext, useEffect, useState } from 'react'
import { SolidityContext } from '../App'
import Txn from './Txn'
import Web3 from "web3"
export default function Transactions() {
    const [Data,setData]=useState([])
    const [Details,setDetails]=useState([]);
    const [txnDetails,setTxnDetails]=useState([]);
    useEffect(()=>{
        async function getDetails(){
            try{
                let getdetails=JSON.parse(sessionStorage.getItem("details"))
                
                console.log(getdetails[0],getdetails[1])
                setDetails(getdetails);
                const web3=new Web3(window.ethereum);
                const response=await fetch("http://localhost:5000/Transactions",{
                method:"post",
                headers:{
                    "Content-type":"application/json",
                },
                body:JSON.stringify(getdetails)
                });
                let data=await response.json();
                console.log(data,"hii")
                setData(data)
                let txnDetails=[]
                for(let i of data){
                    let {txnhash}=i;
                    const transaction = await web3.eth.getTransaction(txnhash);
                    console.log(transaction)
                    txnDetails.push(transaction)
                }
                setTxnDetails(txnDetails);
            
            }
            catch(e){
                console.log(e)

            }
            

           
        }
        getDetails()
    },[])


if(Data.length>0){
  return (
    <>
        <div className='text-center'>
       <h2 className="mt-5" > Transactions performed  </h2>
       </div>
       {txnDetails.map((data,index)=>{
        return(
            
            <Txn txnDetails={data} Data={Data[index]} />
        )
       })
    }
        </>
    
  )
}
else{
    return(
        <>
    <div className='text-center'>
       <h2 className="mt-5" >No transactions performed yet </h2>
       </div>
       
       </>

    )

}
}
