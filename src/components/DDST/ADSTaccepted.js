import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { SolidityContext } from '../../App';
import { Table } from '../Table';
import Web3 from 'web3';
import { TableDDSTAccepted } from '../TableDDSTAccepted';

function FromDdstAccepted({searchQuery}) {
    let contextUser=useContext(SolidityContext)
    let [Items,setItems]=useState([])
    let [Quantities,setQuantities]=useState([])
    let [Ids,setIds]=useState([])
    let [Status,setStatus]=useState([])
    let [Timestamps,setTimestamps]=useState([])
    let [AcceptedByIds,setAcceptedByIds]=useState([])
    let [filterItems,setFilterItems]=useState([])
    let [filterQuantities,setFilterQuantities]=useState([])
    let [filterIds,setFilterIds]=useState([])
    let [filterStatus,setFilterStatus]=useState([])
    let [filterTimestamps,setFilterTimestamps]=useState([])
    let [AdstMail,setAdstMail]=useState()
    let [filterMailIds,setFilterMailIds]=useState([])
    let [DDSTMail,setDDSTMail]=useState();
    let [filterAcceptedBy,setFilterAcceptedBy]=useState([])
    
    useEffect(()=>{
        
        
        const getPending=async ()=>{
            let contract=contextUser.contract;
            console.log(contract,"000")
            let adstMail=JSON.parse(sessionStorage.getItem("selectedAdst"))[0]
            setAdstMail(adstMail)
            let DdstMail=JSON.parse(localStorage.getItem("Mail"));
            setDDSTMail(DdstMail[0])
   
            if(contract!=[]){
            try{
                 let Accepted=await contract.methods.DDSTgetAccepted(DdstMail[0]).call();
                 console.log(Accepted)
                 let ids=[],timestamps=[],Items=[],quantities=[],statuses=[],acceptedby=[];
                 for(let i=0;i<Accepted.length;i++){
                        
                        let {0:items,1:quantity,2:status,3:Adst,4:timestamp,5:AcceptedBy}=await contract.methods.getDetailsById(parseInt(Accepted[i])).call();
                        console.log(Adst,adstMail)
                            if(Adst==adstMail){
                                acceptedby.push(AcceptedBy);
                                ids.push(Accepted[i])
                                Items.push(items)
                                timestamps.push(timestamp)
                                quantities.push(quantity)
                                statuses.push(status)
                            }
                    
                    
                 }
                 setAcceptedByIds(acceptedby.reverse())
                 console.log(ids,Items,timestamps,quantities)
                 ids=ids.map((data,index)=>parseInt(data))
                 timestamps=timestamps.map((data,index)=>parseInt(data))
                 setTimestamps(timestamps.reverse())
                 setIds(ids.reverse());
                 let i=[...Items]
                 let j=[...quantities]
                 let k=[...statuses]
                
                 setItems(i.reverse())
                 setQuantities(j.reverse());
                 setStatus(k.reverse())
                 setFilterIds(ids)
                setFilterItems(i)
                setFilterQuantities(j)
                setFilterStatus(k)
                setFilterTimestamps(timestamps)
                setFilterAcceptedBy(acceptedby)
                
                
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
            console.log(data,"dataaa",typeof(data))
                return data.toLowerCase().includes(searchQuery.toLowerCase())
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
         setFilterQuantities(()=>{
            return AcceptedByIds.filter((data,index)=>{
                 return (data).toLowerCase().includes(searchQuery.toLowerCase())
             })
         })
         

   },[searchQuery])
   
  return (
    <>  
        <div className='text-center'>
       <h2 className="mt-5" > Accepted Requests</h2>
       </div>
       {console.log(filterMailIds,filterIds,filterQuantities,AcceptedByIds,"filter")}
        {
            
            Items.length>0 && Items.map((data,index)=>{
                if(filterItems.includes(data) || filterQuantities.includes(Quantities[index]) || filterIds.includes(Ids[index]) || filterStatus.includes(Status[index]) || filterTimestamps.includes(Timestamps[index])  || filterAcceptedBy.includes(AcceptedByIds[index])) {
            return(
                <>   
                <TableDDSTAccepted Items={data} Quantities={Quantities[index]} Status={Status[index]} Ids={Ids[index]}   Timestamps={Timestamps[index]} AdstMail={AdstMail} AcceptedBy={AcceptedByIds[index]}  />
                </>
            
            )
            }
        })
    }

    </>
  )
}


export default FromDdstAccepted