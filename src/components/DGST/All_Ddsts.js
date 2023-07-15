import React, { useContext } from 'react'
import TableGetDiviions from "../TableGetDivisions"
import { useEffect,useState } from 'react'
import { SolidityContext } from '../../App'
function All_Ddsts({Auth}) {
  const contextUser=useContext(SolidityContext)
  const [MailId,setMailId]=useState();
  const [DdstMails,setDdstMails]=useState([])
  const [pending,setPending]=useState([]);
  const [detailsList,setDetailsList]=useState([]);
  const [idsList,setIdsList]=useState([]);
  const [timestamps,setTimestamps]=useState([]);
  useEffect(()=>{
    
    const getPending=async ()=>{
        let contract=contextUser.contract;
        console.log(contract,"000")
        
        let DgstMail=JSON.parse(localStorage.getItem("Mail"));
        setMailId(DgstMail)
        console.log(DgstMail)
        if(contract!=[]){
        try{
             let all_Ddsts= await contract.methods.getDDSTs_underMe(DgstMail[0]).call();
             console.log(all_Ddsts,"Ddsts")
             setDdstMails(all_Ddsts)
             let  detailsL=[],idsL=[],pendingL=[],timestampsL=[];
             for(let i=0;i<all_Ddsts.length;i++){
              let {0:details,1:ids,2:timestamps}= await contract.methods.grtPendingDDST(all_Ddsts[i]).call();
              console.log(timestamps,"tm",ids)
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
    <TableGetDiviions DdstMails={DdstMails} pending={pending}  />
      
    </>
  )
}

export default All_Ddsts