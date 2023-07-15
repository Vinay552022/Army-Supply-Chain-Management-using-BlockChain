import React, { useContext } from 'react'
import TableGetUnits from '../TableGetUnits'
import { useEffect,useState } from 'react'
import { SolidityContext } from '../../App'
function All_Adsts({Auth}) {
  const contextUser=useContext(SolidityContext)
  const [MailId,setMailId]=useState();
  const [AdstMails,setAdstMails]=useState([])
  const [pending,setPending]=useState([]);
  const [detailsList,setDetailsList]=useState([]);
  const [idsList,setIdsList]=useState([]);
  const [timestamps,setTimestamps]=useState([]);
  useEffect(()=>{
    
    const getPending=async ()=>{
        let contract=contextUser.contract;
        console.log(contract,"000")
        
        let DdstMail=JSON.parse(localStorage.getItem("Mail"));
        setMailId(DdstMail)
        console.log(DdstMail)
        if(contract!=[]){
        try{
             let all_Adsts= await contract.methods.getADSTs_underMe(DdstMail[0]).call();
             console.log(all_Adsts,"adsts")
             setAdstMails(all_Adsts)
             let  detailsL=[],idsL=[],pendingL=[],timestampsL=[];
             for(let i=0;i<all_Adsts.length;i++){
              let {0:details,1:ids,2:timestamps}= await contract.methods.getPending(all_Adsts[i]).call();
              console.log(timestamps)
              timestamps=timestamps.map((data,index)=>parseInt(data))
              timestamps=[...new Set(timestamps)]
              console.log(timestamps)
              let index=timestamps.indexOf(0);
              console.log(index)
              if(index!=-1){
                timestamps.splice(index,1)
              }
              console.log(timestamps,"s")
              pendingL.push(timestamps.length)
                    
             }
             setPending(pendingL)
            
        }
        catch(e){
            console.log(e)
        }  
    }
}

    getPending();
},[contextUser.contract])




  return (
    <>
    <TableGetUnits AdstMails={AdstMails} pending={pending}  />
      
    </>
  )
}

export default All_Adsts