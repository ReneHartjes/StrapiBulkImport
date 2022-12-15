import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
  import App from './App';
import './App.css'
import { render } from '@testing-library/react';
function Login() {


    let [pw,setpw] = useState("")
    let[login, setlogin] = useState("")
    let[State, setState] = useState("")
    let[Error, setError] = useState("")
    useEffect(()=>{
        console.log(login)
        console.log(pw)
    },[login,pw])

    function handlelogin(){


      axios
      .post('https://squid-app-9h43v.ondigitalocean.app/api/auth/local', {
        identifier: login,
        password: pw,
      })
      .then(response => {
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);
        localStorage.setItem("user", response.data.user)
        localStorage.setItem("token", response.data.jwt)
        setError("success")
        if(localStorage.getItem("token")){
            window.location.replace("/app")
        }
      })
      .catch(error => {
        console.log('An error occurred:', error.response);
        setError("failed")
      });
        
        
    }


    function renderlog(){
        if(localStorage.getItem("token")){
            return(
              <App></App>
            )
        }else{
            return(
                <>
                      <div className='logindiv'>
                        <div className='logindiv-div'>
                            <img src="https://www.q-railing.com/files/2200076-qr-instagram-320x320.jpg" width={105}/>
                            <h3>Q-railing Importer</h3>

                        </div>
                      
                    <p>Login:</p>
                    <input name="login" onChange={(e)=>setlogin(e.target.value)} type="text"/>
                    <p>Username: </p>
                    <input name="pw" onChange={(e)=>setpw(e.target.value)} type="password"/>
                    <br />
                    {Error}
                    <button onClick={()=>handlelogin()}>submit</button>
                    </div>  
                </>
            )
        }
    }
  return (

    <>
    <div className='loginform'>
    {renderlog()}
        
        
    </div>
    <Router>
    <Routes>
    <Route path="/app" element={<App></App>} />
    </Routes>
    </Router>
    </>
  )
}

export default Login