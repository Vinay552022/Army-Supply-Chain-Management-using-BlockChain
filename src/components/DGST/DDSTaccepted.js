import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { SolidityContext } from '../../App';
import { TableDDSTAccepted } from '../TableDDSTAccepted';
import Web3 from 'web3';

function DDSTaccepted({Auth,searchQuery}) {
    let contextUser=useContext(SolidityContext)
    let [Items,setItems]=useState([])
    let [Quantities,setQuantities]=useState([])
    let [Ids,setIds]=useState([])
    let [Status,setStatus]=useState([])
    let [unitMails,setUnitMails]=useState([])
    let [Timestamps,setTimestamps]=useState([])
    let [filterUnitMails,setFilterUnitMails]=useState([])
    let [filterItems,setFilterItems]=useState([])
    let [filterQuantities,setFilterQuantities]=useState([])
    let [filterIds,setFilterIds]=useState([])
    let [filterStatus,setFilterStatus]=useState([])
    let [filterTimestamps,setFilterTimestamps]=useState([])
    let [selectedDdst,setSelectedDdst]=useState();
    let [AcceptedBy,setAcceptedBy]=useState([]);
    let [filterAcceptedBy,setFilterAcceptedBy]=useState([]);
    let DGSTMail=JSON.parse(localStorage.getItem("Mail"))
    
    useEffect(()=>{
        const getPending=async ()=>{
            let contract=contextUser.contract;
            console.log(contract,"000")
            
            
            if(contract!=[]){
            try{
                 let selectedddst=JSON.parse(sessionStorage.getItem("selectedDdst"))
                 console.log(selectedddst)
                 setSelectedDdst(selectedddst[0])
                 let {0:dgstAccepted,1:ddstAccpted}= await contract.methods.getAcceptedByDgst(DGSTMail[0],selectedddst[0]).call();

                 let gitems=[],gquantity=[],gids=[],gstatus=[],gtimestamps=[],gunitmails=[],gAcceptedby=[];
                 for(let i=0;i<ddstAccpted.length;i++){
                    if(dgstAccepted.includes(ddstAccpted[i])){
                        let {0:items,1:quantity,2:status,3:email,4:timestamp,5:AcceptedBy}=await contract.methods.getDetailsById(parseInt(ddstAccpted[i])).call();
                        gids.push(ddstAccpted[i])
                        gitems.push(items)
                        gquantity.push(quantity)
                        gstatus.push(status)
                        gunitmails.push(email)
                        
                        gtimestamps.push(timestamp)
                        gAcceptedby.push(AcceptedBy)
                    }

                    
                 }
                 
                 console.log(gunitmails,'k')
                 gids=gids.map((data,index)=>parseInt(data))
                 gtimestamps=gtimestamps.map((data,index)=>parseInt(data))
                 setTimestamps(gtimestamps.reverse())
                 setIds([...gids].reverse());
              
                 console.log(gitems)
                 setUnitMails([...gunitmails].reverse())
                 console.log(unitMails,gunitmails)
                 setItems([...gitems].reverse())
                 console.log(gitems,Items)
                 setQuantities([...gquantity].reverse());
                 setStatus([...gstatus].reverse())
                 
                 setFilterUnitMails([...gunitmails].reverse())
                 setFilterIds([...gids].reverse())
                 setAcceptedBy([...gAcceptedby].reverse())
                setFilterItems(gitems)
                setFilterQuantities(gquantity)
                setFilterStatus([...gstatus].reverse())
                setFilterTimestamps(gtimestamps)
                setFilterAcceptedBy([...gAcceptedby].reverse())
            }
            catch(e){
                console.log(e)
            }
           
        }
        // console.log(Web3.version,"version");
        
    }

        getPending();
        
        
    
    },[contextUser.contract,selectedDdst])
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
         setFilterAcceptedBy(()=>{
            return AcceptedBy.filter((data,index)=>{
                 return (data).toLowerCase().includes(searchQuery.toLowerCase())
             })
         })
         setFilterUnitMails(()=>{
            return unitMails.filter((data,index)=>{
                 return (data).toLowerCase().includes(searchQuery.toLowerCase())
             })
         })
   },[searchQuery])
   
  return (
    <>  
        <div className='text-center'>
            {console.log(AcceptedBy,unitMails,filterUnitMails)}
       <h2 className="mt-5" >Accepted Requests from {selectedDdst} </h2>
       </div>
       
        {
            
            Items.length>0 && Items.map((data,index)=>{
                if((filterItems.includes(data) || filterQuantities.includes(Quantities[index]) || filterIds.includes(Ids[index]) || filterStatus.includes(Status[index]) || filterTimestamps.includes(Timestamps[index]) || filterAcceptedBy.includes(AcceptedBy[index]) || filterUnitMails.includes(unitMails[index]) ) && Timestamps[index]!=0) {
            return(
                <>   
                <TableDDSTAccepted Items={data}  Quantities={Quantities[index]} Status={Status[index]} Ids={Ids[index]}   Timestamps={Timestamps[index]} DdstMail={selectedDdst} AdstMail={unitMails[index]} AcceptedBy={AcceptedBy[index]}  />
                </>
            
            )
            }
        })
    }

    </>
  )
}


export default DDSTaccepted