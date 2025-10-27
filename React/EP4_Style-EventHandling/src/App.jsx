import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  //Style method 1
  let button = {
    backgroundColor: "red",
    color: "white",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "20%",
  };

  let inputstyle={
    padding: '8px',
    marginLeft: '5px',
    outline: 'none',
    borderRadius: '10%'
  }
let divbox={
    backgroundColor: 'aqua',
    color: "black",
    height: "fit-content",
    width: "fit-content",
    padding: "10px",
    borderRadius: "8%",
    textAlign: "center"
}

    //Style method 2
    //npm install style-Component,
    //gitdagruy/react_style_Components -->index.css /git repos


    //Event Hangling
    function name(){
        console.log("Name is clicked")
    }
    function password(pass){
        console.log("Password is clicked "+pass);
    }
    function gmail(e){
        console.log("Email is clicked");
        console.log(e.target.placeholder);
    }


  return (
    <>
      <div style={divbox}>
        <form action="">
          <h2>Login Form</h2>
          <table>
            <tr>
              <td>
                <h3>User Name</h3>
              </td>
              <td>
                <input type="text" 
                style={inputstyle} 
                placeholder="Enter your Name"
                onClick={name}
                />
              </td>
            </tr>
            <tr>
              <td>
                <h3>Password</h3>
              </td>
              <td>
                <input 
                type="password" 
                style={inputstyle} 
                placeholder="Enter the Password"
                 onClick={()=>password("123")}
                 />
              </td>
            </tr>
            <tr>
              <td>
                <h3>Gmail</h3>
              </td>
              <td>
                <input type="text" style={inputstyle} placeholder="Gmail" 
                onClick={(e)=>{gmail(e)}}/>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button type="submit" 
                style={button} 
                >
                  {" "}
                  Submit
                </button>
              </td>
            </tr>
          </table>
        </form>
      </div>
    </>
  );
}

export default App;
