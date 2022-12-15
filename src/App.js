import React, { Component, useState } from 'react';
import "./App.css"
class App extends Component {



  constructor(props) {
    super(props); 
    
    if(!localStorage.getItem("token")){
      console.log(localStorage.getItem("token"))
      window.location.replace("/")
    }    

  }

  showFile = async (e) => {
    let vals
    let globallang
    let texty
    setTimeout(()=>{console.log("lala")},5000)
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result)
      console.log(text)
      vals = text.split(";")

      
    
    texty = ""
    console.log("reader done")
    console.log("reader done")
    console.log(vals)
    console.log("reader done")
    console.log("reader done")

  

    const timer = ms => new Promise(res => setTimeout(res, ms))
   for (let index = 0; index < vals.length; index = index+14) {
    console.log("########'''''''''''''''________________'''''''''''''############")
    console.log(index)
    await timer(50);
    console.log("########'''''''''''''''________________'''''''''''''############")
    if(texty.length > 5000){
      texty = ""
    }
    texty = texty + "|||"+vals[index+1]+"::"+vals[index+2]
    document.getElementById("texty").innerText = texty

    let path = vals[index]
    let filename = vals[index+1]
    let masternummer = vals[index+2]
    let size = vals[index+3]
    let suffix = vals[index+4]
    let language = vals[index+6]
    globallang = vals[index+6]
    let filetype = vals[index+7]
    let artikelnummer = vals[index+8]
    let alteartikelnummer =vals[index+9]
    let cat1 = vals[index+10]
    let cat2 = vals[index+11]
    let cat3 = vals[index+12]
    let dopproper = vals[index+14]
    let free1 = "https://q-railing.com/http/cert.php?file="+filename

    let reqbody = JSON.stringify({
      "data": {
        "filename": filename,
        "masternummer":masternummer,
        "size": size,
        "suffix": suffix,
        "language":language,
        "filetype":filetype,
        "artikelnummer":artikelnummer,
        "alteartikelnummer":alteartikelnummer,
        "category1":cat1,
        "category2":cat2,
        "category3":cat3,
        "DOPoProPer":dopproper,
        "free1": free1,
      }
    })


    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: reqbody
      };

    fetch('https://squid-app-9h43v.ondigitalocean.app/api/'+globallang+'-documents', requestOptions)
    .then(response => response.json()).then(setTimeout(()=>{console.log("###########sleep#############")},2000))
    .then(data => this.setState({ postId: data.id }));

  };
}
  reader.readAsText(e.target.files[0])
    
  }

  render = () => {

    return (
    <>
    <div className='Pagewrap'>
    <div className='uploadinput'>
      <div className='Logodiv'>
        <img src="https://www.q-railing.com/files/2200076-qr-instagram-320x320.jpg" width={105}/>
        <h2>Q-RAILING IMPORTER v0.01</h2>
      </div>
    
      <ul><li>remove categories in your CSV-file (first line)</li><li>upload the CSV file (UTF-8) below</li><li>Import starts with choosing a file</li></ul> 
      <br />
      <h3>Choose CSV file for Documents</h3>
      <p>{}</p>
      <div className='Importer'>
      <input type="file" onChange={(e) => this.showFile(e)} />
     </div>
      <div ><p id="texty"></p></div>
    </div>
    </div>
    </>
    )
  }
}

export default App;