
import React, { useMemo } from 'react';
import "./App.css"

import Web3 from 'web3';
import { useEffect, useState } from 'react';
import { RequestForm } from './components/ADST/RequestForm';
import { Routes ,Route, useNavigate} from 'react-router-dom';
import Login from './components/Login/Login';
import Loginnav from './components/Login/Loginnav';
import {Table} from './components/Table'
import Adstnav from './components/ADST/Adstnav';
import Pending from './components/ADST/Pending';
import Ddstnav from './components/DDST/Ddstnav';
import All_Adsts from './components/DDST/All_Adsts';
import ADSTpending from './components/DDST/ADSTpending';
import FromDdstPending from './components/ADST/FromDdstPending';
import FromDdstAccepted from './components/ADST/FromDdstAccepted';
import Accepted from './components/ADST/Accepted';
import ADSTaccepted from "./components/DDST/ADSTaccepted"
import DGSTnav from './components/DGST/DGSTnav';
import All_Ddsts from './components/DGST/All_Ddsts';
import DDSTpending from './components/DGST/DDSTpending'
import DDSTaccepted from './components/DGST/DDSTaccepted'
import FromDGSTpending from './components/DDST/FromDGSTpending';
import Tracking from './components/Tracking';
import Transactions from './components/Transactions';
import ADSTRegistrationForm from './components/Login/ADSTRegistrationForm';
import FromDGSTaccepted from './components/DDST/FromDGSTaccepted';
import Footer from './components/Footer';
import DDSTRegistration from './components/Login/DDSTRegistration';

export const SolidityContext=React.createContext();

export const AuthContext=React.createContext();
function App() {
  const [user,setUser]=useState("");
  const [emil,setEmail]=useState("")
  const [Auth,setAuth]=useState(false); 
  const [currentAccount,setCurrentAccount]=useState(null)
  const [contract,setContract]=useState([])
  const [searchQuery,setSearchQuery]=useState("");
  const Navigate=useNavigate()
  const [ABI,setABI]=useState({
    Abi:[
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_ourDDST",
            "type": "string"
          }
        ],
        "name": "addADST",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_ourDGST",
            "type": "string"
          }
        ],
        "name": "addDDST",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "dgst_email",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "ddst_email",
            "type": "string"
          }
        ],
        "name": "DGSTaccept",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_items",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_quantity",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_email",
            "type": "string"
          }
        ],
        "name": "getADSTrequest",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "ddst_email",
            "type": "string"
          }
        ],
        "name": "sendtoASC",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "dgst_email",
            "type": "string"
          }
        ],
        "name": "sendToDivisions",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "ddst_email",
            "type": "string"
          }
        ],
        "name": "sendToUnits",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "ddst_email",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "email",
            "type": "string"
          }
        ],
        "name": "updateStatus",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "email",
            "type": "string"
          }
        ],
        "name": "AcceptedbyRequest",
        "outputs": [
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "ddst_email",
            "type": "string"
          }
        ],
        "name": "DDGSTinfo",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "DDST_mail",
            "type": "string"
          }
        ],
        "name": "DDSTgetAccepted",
        "outputs": [
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "ddst_email",
            "type": "string"
          }
        ],
        "name": "DGSTacceptedbyDDST",
        "outputs": [
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_email",
            "type": "string"
          }
        ],
        "name": "getAccepted",
        "outputs": [
          {
            "internalType": "string[][3]",
            "name": "",
            "type": "string[][3]"
          },
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          },
          {
            "internalType": "string[]",
            "name": "",
            "type": "string[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "dgst_email",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "ddst_email",
            "type": "string"
          }
        ],
        "name": "getAcceptedByDgst",
        "outputs": [
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_email",
            "type": "string"
          }
        ],
        "name": "getAcceptedDDST",
        "outputs": [
          {
            "internalType": "string[][3]",
            "name": "",
            "type": "string[][3]"
          },
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          },
          {
            "internalType": "string[]",
            "name": "",
            "type": "string[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "ddst_email",
            "type": "string"
          }
        ],
        "name": "getAcceptedFromDgst",
        "outputs": [
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "ddst_email",
            "type": "string"
          }
        ],
        "name": "getADSTs_underMe",
        "outputs": [
          {
            "internalType": "string[]",
            "name": "",
            "type": "string[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getCurrentId",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "dgst_email",
            "type": "string"
          }
        ],
        "name": "getDDSTs_underMe",
        "outputs": [
          {
            "internalType": "string[]",
            "name": "",
            "type": "string[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          }
        ],
        "name": "getDetailsById",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_email",
            "type": "string"
          }
        ],
        "name": "getPending",
        "outputs": [
          {
            "internalType": "string[][3]",
            "name": "",
            "type": "string[][3]"
          },
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_ddstemail",
            "type": "string"
          }
        ],
        "name": "getSentToASC",
        "outputs": [
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "DGST_email",
            "type": "string"
          }
        ],
        "name": "getSentToDivisions",
        "outputs": [
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_ddstemail",
            "type": "string"
          }
        ],
        "name": "getSentToUnits",
        "outputs": [
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          }
        ],
        "name": "getTracking",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "string[]",
            "name": "",
            "type": "string[]"
          },
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_email",
            "type": "string"
          }
        ],
        "name": "grtPendingDDST",
        "outputs": [
          {
            "internalType": "string[][3]",
            "name": "",
            "type": "string[][3]"
          },
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          },
          {
            "internalType": "string[]",
            "name": "",
            "type": "string[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_email",
            "type": "string"
          }
        ],
        "name": "myDDST",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "ddst_email",
            "type": "string"
          }
        ],
        "name": "myDGST",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    Address:"0xC296bf541dA9E3354E5BA14F84cD0A1FDC466598"
  });
  useEffect(()=>{
    const load=async ()=>{
    if(!window.ethereum){
      alert("Please insert metamask");
      console.log("ping")
    }
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    console.log(accounts)
    window.web3=new Web3(window.ethereum);
    
    let contract= await new window.web3.eth.Contract(ABI.Abi,ABI.Address)

    setContract(contract)
    console.log(contract,"app")    
  }
  load();
},[Auth]) 
  useEffect(()=>{
      let auth=JSON.parse(localStorage.getItem('Auth'))
      let usr=JSON.parse(localStorage.getItem('User'))
      let mail=JSON.parse(localStorage.getItem('Mail'))
      let Account=JSON.parse(localStorage.getItem('Account'))
      console.log(Account)
      if(auth!==null && auth[0]==true){
        console.log(auth[0],mail[0],usr[0])
      setAuth(auth[0]);
      setEmail(mail[0]);
      setUser(usr[0])
      setCurrentAccount(Account[0])
      }
  },[Auth])
  const Logout=()=>{
    localStorage.setItem('Auth',JSON.stringify([false]));
      localStorage.setItem('Mail',JSON.stringify([""]));
      localStorage.setItem('User',JSON.stringify([""]));
      localStorage.setItem('Account',JSON.stringify([""]));
      setAuth(false)

      Navigate("/")
  }
  console.log(user,"hii",Auth)
 if(Auth==false){
  
  return (  
    <>
    
    <Loginnav/>
    
    <Login setAuth={setAuth}  />
    <Footer/>
    </>
  );
 }
 
 else if(user=="ADST"){
  return(
    
  <>
  
  <SolidityContext.Provider value={{currentAccount,contract}}>
  <Adstnav Logout={Logout} setSearchQuery={setSearchQuery} /> 
 
    <Routes>
    <Route path='/FromDDSTPending' element={<FromDdstPending searchQuery={searchQuery}/>}  ></Route>
    <Route path='/FromDDSTAccepted' element={<FromDdstAccepted searchQuery={searchQuery}/>}  ></Route>
    <Route path='/' element={<Pending searchQuery={searchQuery}/>} ></Route>
    <Route path='/AcceptedRequests' element={<Accepted searchQuery={searchQuery}/>} ></Route>
    <Route path="/RequestForm" element={<RequestForm/>}></Route>
    <Route path="/Tracking" element={<Tracking/>}></Route>
    <Route path="/TransactionDetails" element={<Transactions/>}></Route>
    
    </Routes>
    </SolidityContext.Provider>
    <Footer/>
    </>
    
  )
 }
 else if(Auth==true && user=="DDST"){
  return(
  <>
  <SolidityContext.Provider value={{currentAccount,contract}}>
  <Ddstnav Logout={Logout} setSearchQuery={setSearchQuery}/> 
    <Routes>
    
    <Route path='/' element={ <All_Adsts  />} >Pending Requests</Route>
    <Route path='/Adstpending' element={ <ADSTpending searchQuery={searchQuery}  />} ></Route>
    <Route path='/Adstaccepted' element={ <ADSTaccepted searchQuery={searchQuery}  />} ></Route>
    <Route path='/FromDGSTpending' element={ <FromDGSTpending searchQuery={searchQuery}  />} ></Route>
    <Route path='/FromDGSTaccepted' element={ <FromDGSTaccepted searchQuery={searchQuery}  />} ></Route>
    <Route path="/Tracking" element={<Tracking/>}></Route>
    <Route path="/TransactionDetails" element={<Transactions/>}></Route>

    </Routes>

    </SolidityContext.Provider>
    <Footer/>
    </>
    
  )
 }
 else if(Auth==true && user=="DGST"){
  return(
   
  <>
  <SolidityContext.Provider value={{currentAccount,contract}}>
  <DGSTnav Logout={Logout} setSearchQuery={setSearchQuery}/> 
    <Routes>
    
    <Route path='/' element={ <All_Ddsts  />} >Pending Requests</Route>
    <Route path='/Ddstpending' element={ <DDSTpending searchQuery={searchQuery}  />} ></Route>
    <Route path='/Ddstaccepted' element={ <DDSTaccepted searchQuery={searchQuery}  />} ></Route>
    <Route path="/TransactionDetails" element={<Transactions/>}></Route>
    <Route path="/Tracking" element={<Tracking/>}></Route>
    <Route path="/ADSTRegistrationForm" element={<ADSTRegistrationForm/>}></Route>
    <Route path="/DDSTRegistrationForm" element={<DDSTRegistration/>}></Route>
    

    </Routes>
    
    </SolidityContext.Provider>
    <Footer/>
    </>
    
  )
 }
 
}

export default App;
