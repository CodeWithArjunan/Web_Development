import React from 'react'

function ProductDetail({na,pri,des}){
    console.log("----"+na);
    console.log("----"+pri);

  return (
        <div><h3>Dec:{des}</h3></div>
  )
}

export default ProductDetail;