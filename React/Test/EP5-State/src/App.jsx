import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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


  let [count,setCount]=useState(1); 
//const  [State,setState]=useState(initialVal);
  
  
  let [price,setprice]=useState(priceVal); //also use function as a initialval
  function priceVal(){
    return 100;
  }

  function inc(){
    //setCount(count+1); =1
    //setCount(count+1); =1
    //setCount(count+1); =1 -->Same Value not changed , So we can use the parameter to pass the value and update
    setCount( (preVal) => preVal+1);
    setCount( (preVal) => preVal+1); // don't use the {preVal+1} , inc 2 val  
    console.log("Inc");
    count >20? alert("you reach over 10") : "";
  }

  function dec(){
    // setCount(count-1);
    setCount( (preVal) => preVal-1);
    setCount( (preVal) => preVal-1);
    console.log("Dec");
    count <-20? alert("you are too low") : "";
  }

  return (
    <>
      <div style={divbox} >
        <p>Click the button to unlock the price {count}</p>
        <button onClick={inc} style={button}>Inc</button>
        <button onClick={dec} style={button}>Dec</button>
      </div>
    </>
  )
}

export default App
