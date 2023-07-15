import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { SolidityContext } from '../../App';
import { Table } from '../Table';
import Web3 from 'web3';
import { TableDGSTtoDDST } from '../TableDGSTtoDDST';

function FromDGSTpending({searchQuery}) {
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
    let [mailIds,setMailIds]=useState([])
    let [filterMailIds,setFilterMailIds]=useState([])
    let [DGSTMail,setDGSTMail]=useState();
    
    useEffect(()=>{
        
        
        const getPending=async ()=>{
            let contract=contextUser.contract;
            console.log(contract,"000")
            
            let DdstMail=JSON.parse(localStorage.getItem("Mail"));
            setMailId(DdstMail)
   
            if(contract!=[]){
            try{
                 let {0:dgstemail,1:requestIdsFromDGST}= await contract.methods.DDGSTinfo(DdstMail[0]).call();
                 setDGSTMail(dgstemail)
                
                 let requestSentToDGST=await contract.methods.getSentToASC(DdstMail[0]).call();
                 
                 let ids=[],timestamps=[],Items=[],mailIds=[],quantities=[],statuses=[];
                 console.log(requestSentToDGST,requestIdsFromDGST,"lol")
                 for(let i=0;i<requestIdsFromDGST.length;i++){
                    if(!requestSentToDGST.includes(requestIdsFromDGST[i]) ){
                        let {0:items,1:quantity,2:status,3:email,4:timestamp}=await contract.methods.getDetailsById(parseInt(requestIdsFromDGST[i])).call();
                        ids.push(requestIdsFromDGST[i])
                        Items.push(items)
                        mailIds.push(email)
                        timestamps.push(timestamp)
                        quantities.push(quantity)
                        statuses.push(status)
                    }
                    
                 }

                 console.log(ids,Items,mailIds,timestamps,quantities)
                 ids=ids.map((data,index)=>parseInt(data))
                 timestamps=timestamps.map((data,index)=>parseInt(data))
                 setTimestamps(timestamps.reverse())
                 setIds(ids.reverse());
                 let i=[...Items]
                 let j=[...quantities]
                 let k=[...statuses]
                 setMailIds(mailIds.reverse())
                 setItems(i.reverse())
                 setQuantities(j.reverse());
                 setStatus(k.reverse())
                 setFilterIds(ids)
                setFilterItems(i)
                setFilterQuantities(j)
                setFilterStatus(k)
                setFilterTimestamps(timestamps)
                setFilterMailIds(mailIds)
                
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
         setFilterMailIds(()=>{
            return mailIds.filter((data,index)=>{
                
                 return (data).toLowerCase().includes(searchQuery.toLowerCase())
             })
         })

   },[searchQuery])
   
  return (
    <>  
        <div className='text-center'>
       <h2 className="mt-5" >{DGSTMail} pending Requests</h2>
       </div>
       {console.log(filterMailIds,filterIds,filterQuantities,filterItems,"filter")}
        {
            
            Items.length>0 && Items.map((data,index)=>{
                if((filterItems.includes(data) || filterQuantities.includes(Quantities[index]) || filterIds.includes(Ids[index]) || filterStatus.includes(Status[index]) || filterTimestamps.includes(Timestamps[index]) || filterMailIds.includes(mailIds[index])) && Status[index]=="pending") {
            return(
                <>   
                <TableDGSTtoDDST Items={data} Quantities={Quantities[index]} Status={Status[index]} Ids={Ids[index]}  dgstMail={DGSTMail} mailid={MailId} Timestamps={Timestamps[index]} mailIds={mailIds[index]} contract={contextUser.contract} account={contextUser.currentAccount} />
                </>
            
            )
            }
        })
    }

    </>
  )
}


export default FromDGSTpending