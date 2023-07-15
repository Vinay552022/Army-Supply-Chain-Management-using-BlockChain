import React, { useEffect, useState,useContext } from 'react'
import { SolidityContext } from '../../App';
import Web3 from 'web3'
import { TableDGSTtoDDSTaccepted } from '../TableDGSTtoDDSTaccepted';
function FromDGSTaccepted({searchQuery}) {
    let contextUser=useContext(SolidityContext)
    let [Items,setItems]=useState([])
    let [Quantities,setQuantities]=useState([])
    let [Ids,setIds]=useState([])
    let [Status,setStatus]=useState([])
    let [Timestamps,setTimestamps]=useState([])
    let [unitMails,setUnitMails]=useState([])
    let [MailId,setMailId]=useState("")
    let [filterUnitMails,setFilterUnitMails]=useState([])
    let [acceptedBy,setAcceptedBy]=useState([])
    let [filterAcceptedBy,setFilterAcceptedBy]=useState([])
    let [filterItems,setFilterItems]=useState([])
    let [filterQuantities,setFilterQuantities]=useState([])
    let [filterIds,setFilterIds]=useState([])
    let [filterStatus,setFilterStatus]=useState([])
    let [filterTimestamps,setFilterTimestamps]=useState([])
    let [mailIds,setMailIds]=useState([])
    let [filterMailIds,setFilterMailIds]=useState([])
    let [DDSTMail,setDDSTMail]=useState();
    let [DGSTMail,setDGSTMail]=useState();
    useEffect(()=>{
        
        
        const getPending=async ()=>{
            let contract=contextUser.contract;
            console.log(contract,"000")
            
            let DdstMail=JSON.parse(localStorage.getItem("Mail"));
            setMailId(DdstMail)
   
            if(contract!=[]){
            try{
                let {0:dgstemail}= await contract.methods.DDGSTinfo(DdstMail[0]).call();
                console.log(dgstemail,DdstMail[0],"ss")
                let DDSTAccepted=await contract.methods.getAcceptedFromDgst(DdstMail[0]).call()
                setDGSTMail(dgstemail)
                console.log(DDSTAccepted,"ki")
                 let ids=[],timestamps=[],Items=[],mailids=[],quantities=[],statuses=[],AcceptedBy=[];
                 for(let i=0;i<DDSTAccepted.length;i++){
                    
                        let {0:items,1:quantity,2:status,3:email,4:timestamp,5:acceptedBy}=await contract.methods.getDetailsById(parseInt(DDSTAccepted[i])).call();
                        ids.push(DDSTAccepted[i])
                        Items.push(items)
                        mailids.push(email)
                        timestamps.push(timestamp)
                        quantities.push(quantity)
                        statuses.push(status)
                        AcceptedBy.push(acceptedBy)

                    }
                    
                 

                 console.log(ids,Items,mailids,timestamps,quantities)
                 ids=ids.map((data,index)=>parseInt(data))
                 timestamps=timestamps.map((data,index)=>parseInt(data))
                 setTimestamps(timestamps.reverse())
                 setIds(ids.reverse());
                 let i=[...Items]
                 let j=[...quantities]
                 let k=[...statuses]
                 setMailIds(mailids.reverse())
                 setAcceptedBy([...AcceptedBy].reverse())
                 setItems(i.reverse())
                 setQuantities(j.reverse());
                 setStatus(k.reverse())
                 setFilterIds(ids)
                setFilterItems(i)
                setFilterQuantities(j)
                setFilterStatus(k)
                setFilterTimestamps(timestamps)
                setFilterMailIds(mailids)
                setFilterAcceptedBy(AcceptedBy)
                
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
         setFilterAcceptedBy(()=>{
            return acceptedBy.filter((data,index)=>{
                
                 return (data).toLowerCase().includes(searchQuery.toLowerCase())
             })
         })

   },[searchQuery])
  return (
    <>
        <div className='text-center'>
       <h2 className="mt-5" >{DGSTMail} Accepted Requests</h2>
       </div>
       {console.log(filterMailIds,filterIds,filterQuantities,filterItems,"filter")}
        {
            
            Items.length>0 && Items.map((data,index)=>{
                if(filterItems.includes(data) || filterQuantities.includes(Quantities[index]) || filterIds.includes(Ids[index]) || filterStatus.includes(Status[index]) || filterTimestamps.includes(Timestamps[index]) || filterMailIds.includes(mailIds[index]) || filterAcceptedBy.includes(acceptedBy[index])) {
            return(
                <>   
                <TableDGSTtoDDSTaccepted Items={data} Quantities={Quantities[index]} Status={Status[index]} Ids={Ids[index]} ddstMail={DDSTMail} mailid={MailId} Timestamps={Timestamps[index]} AcceptedBy={acceptedBy[index]} mailIds={mailIds[index]}  />
                </>
            
            )
            }
        })
    }
    </>
  )
}

export default FromDGSTaccepted