import React, { useContext } from 'react'
import {UserContext} from '../App.jsx';

function ProductDetail({na,pri,des}){
    console.log("----"+na);
    console.log("----"+pri);

    // let reciveVal =useContext(UserContext);
    let {user} =useContext(UserContext);

  return (
    // <reciveVal>
    <article>
      <div>
        <h3>Dec:{user.Decription}</h3>
      </div>
    </article>
    // </reciveVal>
  );
}

export default ProductDetail;