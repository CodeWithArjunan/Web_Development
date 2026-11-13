import { useState } from 'react';
import Header from './Components/Header.jsx';
import Content from './Components/Content.jsx';
import Footer from './Components/Footer.jsx';

function App() {
 let user ='K7';

 return(
  <div className='app'>
    <Header />
    <Content/>
    <Footer/>
  </div>
 );

}

export default App
