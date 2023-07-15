import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { SolidityContext } from '../../App';
import { Table } from '../Table';
import Web3 from 'web3';

function Accepted({Auth,searchQuery}) {
    let contextUser=useContext(SolidityContext)
    let [Items,setItems]=useState([])
    let [Quantities,setQuantities]=useState([])
    let [Ids,setIds]=useState([])
    let [Status,setStatus]=useState([])
    let [Timestamps,setTimestamps]=useState([])
    let [MailId,setMailId]=useState("")
    let [filterItems,setFilterItems]=useState([])
    let [filterQuantities,setFilterQuantities]=useState([])
    let [filterIds,setFilterIds]=useState([])
    let [filterStatus,setFilterStatus]=useState([])
    let [filterTimestamps,setFilterTimestamps]=useState([])
    useEffect(()=>{
        
        
        const getPending=async ()=>{
            let contract=contextUser.contract;
            console.log(contract,"000")
            
            let AdstMail=JSON.parse(localStorage.getItem("Mail"));
            setMailId(AdstMail)
            console.log(AdstMail)
            if(contract!=[]){
            try{
                 let {0:details,1:ids,2:timestamps}= await contract.methods.getAccepted(AdstMail[0]).call();
                 console.log(details,ids,timestamps)
                 ids=ids.map((data,index)=>parseInt(data))
                 timestamps=timestamps.map((data,index)=>parseInt(data))
                 setTimestamps(timestamps.reverse())
                 setIds(ids.reverse());
                 let [items,quantitis,status]=details;
                 let i=[...items]
                 let j=[...quantitis]
                 let k=[...status]
                 console.log(items)
                 setItems(i.reverse())
                 setQuantities(j.reverse());
                 setStatus(k.reverse())
                 setFilterIds(ids)
                setFilterItems(i)
                setFilterQuantities(j)
                setFilterStatus(k)
                setFilterTimestamps(timestamps)
                
            }
            catch(e){
                console.log(e)
            }
           
        }
        
    }

        getPending();
        
        
    
    },[contextUser.contract])
   useEffect(()=>{
    console.log(searchQuery,'visited visited')
        setFilterItems(()=>{
           return Items.filter((data,index)=>{
                return String(data).toLowerCase().includes(searchQuery.toLowerCase())
            })
        })
        setFilterTimestamps(()=>{
            return Timestamps.filter((data,index)=>{
                 return ((new Date(data*1000)).toLocaleDateString()).includes(searchQuery.toLowerCase())
            })
            
        })
        setFilterIds(()=>{
            return Ids.filter((data,index)=>{
                 return String(data).toLowerCase().includes(searchQuery.toLowerCase())
             })
         })
         setFilterStatus(()=>{
            return Status.filter((data,index)=>{
                 return String(data).toLowerCase().includes(searchQuery.toLowerCase())
             })
         })
         setFilterQuantities(()=>{
            return Quantities.filter((data,index)=>{
                 return String(data).toLowerCase().includes(searchQuery.toLowerCase())
             })
         })
   },[searchQuery])
   
  return (
    <>  
        <div className='text-center'>
       <h2 className="mt-5" >My Accepted Requests</h2>
       </div>
       {console.log(filterIds,filterQuantities,"filter")}
        {
            
            Items.length>0  && Items.map((data,index)=>{
                if((filterItems.includes(data) || filterQuantities.includes(Quantities[index]) || filterIds.includes(Ids[index]) || filterStatus.includes(Status[index]) || filterTimestamps.includes(Timestamps[index]))&& Timestamps[index]!=0) {
            return(
                <>   
                <Table Items={data} Quantities={Quantities[index]} Status={Status[index]} Ids={Ids[index]} mailid={MailId} Timestamps={Timestamps[index]}/>
                </>
            
            )
            }
        })
    }

    </>
  )
}


export default Accepted