import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login(props){
  const {setUser,setEmail,setAuth}=props;
  const [message,setMessage]=useState("");
  const [color,setColor]=useState("white");
  const Navigate=useNavigate()
  const [Login,setLogin]=useState({
    email:"",
    password:""
  })
  function onChangeevent(e){
    console.log(e);
    let {name,value}=e.target;
    setLogin((prev)=>({
      ...prev,[name]:value
    }))
    console.log(name,value)
  }
  async function Onclickhandler(e){
    e.preventDefault();
    console.log(Login);
    const response=await fetch("http://localhost:5000/",{
      method:"post",
      headers:{
        "Content-type":"application/json",
      },
      body:JSON.stringify(Login)
    });
    const role= await response.json()
    if(role.flag==false){
      console.log(role)
      setMessage("invalid login details");
      setColor("tomato");
      console.log("wrong details");
    }
    else{
      console.log(role.role,Login.email)
      localStorage.setItem('Auth',JSON.stringify([true]));
      localStorage.setItem('Mail',JSON.stringify([Login.email]));
      localStorage.setItem('User',JSON.stringify([role.role]));
      localStorage.setItem('Account',JSON.stringify([role.account]));
      console.log(role.account)
      props.setAuth(true)
      Navigate("/")
      
    }
    console.log(role)

  }
    return(
        <>
    <section>
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img src="https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg?w=740&t=st=1670456438~exp=1670457038~hmac=84efe46ec8fef668dbc39af2c9742e193eae2354be3ad808ec4e594befc074cb"
                className="img-fluid" alt="cffcx"/>
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form>
                <div className="form-outline mb-4">
                  <input type="email" id="form1Example13" name="email" style={{backgroundColor: color}} className="form-control form-control-lg mt-3" onChange={onChangeevent} />
                  <label className="form-label"  htmlFor="form1Example13" >Email address</label>

                </div>
                <div className="form-outline mb-4">
                  <input type="password" style={{backgroundColor: color}} id="form1Example23" name="password" className="form-control form-control-lg" onChange={onChangeevent}/>
                  <label className="form-label"  htmlFor="form1Example23" >Password</label>
                </div>
                <div>
                <p id="warning">{message} </p>
                </div>
      
                <div className="d-flex justify-content-around align-items-center mb-4">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="form1Example3"  />
                    <label className="form-check-label" htmlFor="form1Example3"> Remember me </label>
                  </div>
                  
                  <a href="#">Forgot password?</a>
                </div>
      
                <button type="submit"  className="btns btn btn-primary " onClick={Onclickhandler}>Sign in</button>
      
                {/* <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                </div>
    
                <a className="btn btn-primary btn-lg btn-block" id="b1" href="/"
                  role="button">
                  <i className="fab fa-facebook-f me-2"></i>Continue with Facebook
                </a>
                <br/>
                  <br/>
                <a className="btn btn-primary btn-lg btn-block" id="b2" href="/"
                  role="button">
                  <i className="fab fa-twitter me-2"></i>Continue with Twitter</a>
                  <br/>
                  <br/>
                  <a className="btn btn-primary btn-lg btn-block" id="b3" href="/"
                  role="button">
                  <i className="fab fa-twitter me-2"></i>Continue with Google</a>
                 */}
              </form>

          </div>
        </div>
        </div>
        
      </section>
    
      </>
      


    );
}