import React from "react";
import ProductDetail from './ProductDetail.jsx'

function ProductItem({product}){     //props

    // console.log(props);
    console.log(product.name);

    return( 
        <div>
        <h3>Name:{product.name}</h3>
        <h3>Price:{product.price}</h3>
        <ProductDetail 
        na={product.name} 
        pri={product.price} 
        des={product.Decription}
        />
        </div>
        
    );
}

export default ProductItem;