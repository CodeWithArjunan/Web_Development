import React from "react";
class Footer extends React.Component{
  render(){   //Render - it return the jsx code like a method
    
    console.log(this.props)
    return(
      <footer>
        <h2>Footer</h2>
      </footer>
    );
  }
}
export default Footer;