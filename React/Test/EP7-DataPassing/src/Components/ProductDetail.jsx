import React from 'react'
import PropType from 'prop-types';  // npm install prop-types

function ProductDetail({na,pri,des}){
    console.log("----"+na);
    console.log("----"+pri);

  return (
        <div><h3>Dec:{des}</h3></div>
  )
}

export default ProductDetail;

//react default val
ProductDetail.defaultProps={
  na:"HP",
  pri:2000,
  des:"HP old version"
}
//PropType checking 
ProductDetail.prototype={
  na: PropType.string.isRequired,
  pri: PropType.number.isRequired,
  des: PropType.string.isRequired
}