import React, { useState,useContext } from 'react'
import { SolidityContext } from '../../App';
export default function DDSTRegistrationForm() {
  let contextUser=useContext(SolidityContext);
  const [details,setDetails]=useState({"DivisionId":"","DGSTId":"","Account":"","Password":""})
    async function Onclickhandler(e){
      e.preventDefault()
      console.log(contextUser.currentAccount)
      await contextUser.contract.methods.addDDST(details.DivisionId,details.DGSTId).send({from:contextUser.currentAccount});
      const response=await fetch("http://localhost:5000/RegisterDDST",{
      method:"post",
      headers:{
        "Content-type":"application/json",
      },
      body:JSON.stringify({...details,role:"DDST"})
    });
    
    
    
    console.log(response)
    setDetails({"DivisionId":"","DGSTId":"","Account":"","Password":""})

    console.log(details)
  }
  
    function onChangeevent(e){
      let {name,value}=e.target;
      console.log(name,value)
      setDetails((prev)=>{
        return {...prev,[name]:value}
      })
    }
  return (
   <>
    <div>
        <section >
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?w=740&t=st=1688624457~exp=1688625057~hmac=76fbf029097ddef58004e1e0ff9d2c89ea4ccf5126054f6607b44dc2e71a1e7c"
                className="img-fluid" alt="cffcx"/>
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form onSubmit={Onclickhandler}>
              <div className="form-outline mb-4">
                  <input type="text"  id="form1Example33" value={details.Account} name="Account" className="form-control form-control-lg mt-5" required='true' onChange={onChangeevent}/>
                  <label className="form-label"  htmlFor="form1Example33" >Account Number</label>
                </div>
                <div className="form-outline mb-4">
                  <input type="text" id="form1Example13" value={details.DivisionId} name="DivisionId"  className="form-control form-control-lg mt-3" required='true'  onChange={onChangeevent} />
                  <label className="form-label"  htmlFor="form1Example13" >Division Id</label>

                </div>
                <div className="form-outline mb-4">
                  <input type="text" id="form1Example43" value={details.DGSTId} name="DGSTId"  className="form-control form-control-lg mt-3" required='true'  onChange={onChangeevent} />
                  <label className="form-label"  htmlFor="form1Example43" >DGST Id</label>

                </div>
                <div className="form-outline mb-4">
                  <input type="password" id="form1Example23" value={details.Password} name="Password" className="form-control form-control-lg" required='true'  onChange={onChangeevent}/>
                  <label className="form-label"  htmlFor="form1Example23" >Password</label>
                </div>
                <div>
                <p id="warning"> </p>
                </div>
      
               
      
                <button type="submit"  className="btns btn btn-primary " >Register</button>
      
                
              </form>

          </div>
        </div>
        </div>
        
      </section>
      </div>
   </>
  )
}
