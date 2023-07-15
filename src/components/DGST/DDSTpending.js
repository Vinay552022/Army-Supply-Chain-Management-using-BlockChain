import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { SolidityContext } from '../../App';
import {TableDDSTtoDGSTPending} from '../TableDDSTtoDGSTPending';
import Web3 from 'web3';

function Adstpending({Auth,searchQuery}) {
    let contextUser=useContext(SolidityContext)
    let [Items,setItems]=useState([])
    let [Quantities,setQuantities]=useState([])
    let [Ids,setIds]=useState([])
    let [UnitIds,setUnitIds]=useState([])
    let [Status,setStatus]=useState([])
    let [Timestamps,setTimestamps]=useState([])
    let [filterItems,setFilterItems]=useState([])
    let [filterQuantities,setFilterQuantities]=useState([])
    let [filterIds,setFilterIds]=useState([])
    let [filterStatus,setFilterStatus]=useState([])
    let [filterTimestamps,setFilterTimestamps]=useState([])
    let [filterUnitIds,setFilterUnitIds]=useState([])
    let [selectedDdst,setSelectedDdst]=useState();
    let [flagAccept,setFlagAccept]=useState(false);
    useEffect(()=>{
        const getPending=async ()=>{
            let contract=contextUser.contract;
            console.log(contract,"000")
            
            
            if(contract!=[]){
            try{
                 let selectedddst=JSON.parse(sessionStorage.getItem("selectedDdst"))
                 console.log(selectedddst)
                 setSelectedDdst(selectedddst[0])
                 let {0:details,1:ids,2:timestamps,3:unitIds}= await contract.methods.grtPendingDDST(selectedddst[0]).call();
                 console.log(details,ids,timestamps,"kiii")
                 
                 ids=ids.map((data,index)=>parseInt(data))
                 timestamps=timestamps.map((data,index)=>parseInt(data))
                 setTimestamps(timestamps.reverse())
                 setIds(ids.reverse());
                 let [items,quantitis,status]=details;
                 let i=[...items]
                 let j=[...quantitis]
                 let k=[...status]
                 let m=[...unitIds]
                 setUnitIds(m.reverse())
                 console.log(items)
                 setItems(i.reverse())
                 setQuantities(j.reverse());
                 setStatus(k.reverse())
                 setFilterUnitIds(m)
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
        // console.log(Web3.version,"version");
        
    }

        getPending();
        
        
    
    },[contextUser.contract,selectedDdst,flagAccept])
   useEffect(()=>{
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
         setFilterUnitIds(()=>{
            return UnitIds.filter((data,index)=>{
                 return (data).toLowerCase().includes(searchQuery.toLowerCase())
             })
         })
   },[searchQuery])
   
  return (
    <>  
        <div className='text-center'>
       <h2 className="mt-5" >Pending Requests from {selectedDdst} </h2>
       </div>
        {
            
            Items.length>0 && Items.map((data,index)=>{
                if((filterItems.includes(data) || filterQuantities.includes(Quantities[index]) || filterIds.includes(Ids[index]) || filterStatus.includes(Status[index]) || filterTimestamps.includes(Timestamps[index]) || filterUnitIds.includes(UnitIds[index])) && Timestamps[index]!=0 && Status[index]=="pending") {
            return(
                <>   
                <TableDDSTtoDGSTPending Items={data} Quantities={Quantities[index]} Status={Status[index]} Ids={Ids[index]} mailid={selectedDdst} Timestamps={Timestamps[index]} contract={contextUser.contract} account={contextUser.currentAccount} setFlagAccept={setFlagAccept} uintId={UnitIds[index]}/>
                </>
            
            )
            }
        })
    }

    </>
  )
}


export default Adstpending