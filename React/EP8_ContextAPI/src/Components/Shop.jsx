import { useState } from "react";
import ProductItem from "./ProductItem";
function Shop(){

    let [product,setProduct]=useState({
        name:"HP",
        price: "40K",
        Decription:"HP 2010 model"
    })
    return(
        <ProductItem product={product}/>
    );
}
export default Shop;