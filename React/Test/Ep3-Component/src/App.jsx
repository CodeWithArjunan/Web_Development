import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Content from "./Components/Content";

function App() {

  let user ="K7";
  let islogged=true;

  return (
    <>
    <Header user={user}/>
    <Footer val='muruga'/>
    <Content/>
    </>
   
  );
}

export default App
