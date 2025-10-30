import { createContext, useState } from 'react';
import Header from './Components/Header.jsx';
import Content from './Components/Content.jsx';
import Footer from './Components/Footer.jsx';

 export let UserContext = createContext();   //it must be export on the outside of the funtion & one of the props method 

function App() {
//  let user ='K7';
   //Data to be stored in global
  let [user,setUser]=useState({
    name:"HP",
    price: "40K",
    Decription:"HP 2010 model's"
  });

 return(
  <UserContext.Provider value={{user}}>
  <div className='app'>
    <Header />
    <Content/>
    <Footer/>
  </div>
  </UserContext.Provider>
 );

}

export default App
