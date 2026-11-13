import { useState } from 'react'
import './App.css'

function App() {

  let divbox={
    backgroundColor: 'aqua',
    color: "black",
    height: "fit-content",
    width: "fit-content",
    padding: "10px",
    borderRadius: "8%",
    textAlign: "center",
}
   let button = {
    backgroundColor: "red",
    color: "white",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "20%",
    margin: "1px",
  };


  let [count,setCount]=useState(0); 
  
  
  let [price,setprice]=useState(priceVal); 
  function priceVal(){
    return 100;
  }

  
   let data='Loading';

  function inc(){
     setCount( (preVal) => preVal+5);
    console.log("Inc"+count);
   if(count>=99){   //if-else 
        alert("you are too high"); 
         setCount(count=0);
    }else{
       "";
    }    //Ternary Operation
  }
  function dec(){
    setCount( (preVal) => preVal-10);
    console.log("Dec"+count);
    if(count<=-20){   //if-else 
        alert("you are too low"); 
        setCount(count=0);
    }else{
       "";
    }  
  }

 //Switth case
  function displayfun(data){
    switch(data){
    case 'Loading':
      return <p>Loading price</p>;break;
    case 'Download':
      return <p>Download price</p>;break;
    case 'error':
      return <p>Error price</p>;break;
  }
}

  

  return (
    <>
      <div style={divbox} >
        <p>Click the button to unlock the price {count}</p>
        <button onClick={inc} style={button}>Inc</button>
        <button onClick={dec} style={button}>Dec</button>
        { 
         count>=50 && <p>You almost reached ,only {100-count}</p>    //Logical AND operation
         }
      </div>
    </>
  )
}

export default App
