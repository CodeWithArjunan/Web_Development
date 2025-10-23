import {cart, removeFromCart} from '../data/cart.js';///// the ("../") represent the outside of the folter it is called NAMED EXPORT


import {products} from '../data/products.js';//// the ("../") represent the outside of the folter

import {formatCurrency} from './utils/money.js';////current folter represent the single (".") doat.

//import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.js'; //USINFG URL IN ONLINE WEBSIDE

//import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; //// it is called DEFAULT EXPORT

import {deliveryOption} from '../data/deliveryOptions.js';

hello();
const today=dayjs(); 
const del=today.add(7,'days');
console.log(del.format('dddd,MMMM D'));

let cartSummeryHTML='';

cart.forEach((cartItem)=>{
  const productId=cartItem.productId;
  let matchingProduct;

  products.forEach((product) => {
   if(product.id === productId){
    matchingProduct = product;
   }
  });

   // set a date in frend of the box
  const deliveryOptionId =  cartItem.deliveryOptionId;

  let deliveryOptions;

  deliveryOption.forEach((option)=>{
     if(option.id === deliveryOptionId){
      deliveryOptions = option;
     };
  });

    let today=dayjs(); 

    const deliveryDay = today.add(7,'days');

    const dateString = deliveryDay.format('dddd, MMMM D');
   console.log(dateString);
  //ADD THE ORDER AND QUANTITY CHECH

  cartSummeryHTML += `<div class="cart-item-container 
  js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: ${dateString}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
        ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link  link-primary    js-delete-link"          data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
          ${deliveryOptionsHTML(matchingProduct,cartItem)}
      </div>
    </div>
  </div>`;
});

  function deliveryOptionsHTML(matchingProduct,cartItem){
      let html='';

       deliveryOption.forEach((deliveryOption) =>{  
        const today=dayjs(); 

        const deliveryDay = today.add(deliveryOption.deliveryDays,'days');

        const dateString =deliveryDay.format('dddd, MMMM D');

        const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;  

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        html += `
        <div class="delivery-option">
          <input type="radio"
          ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
             ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
          `  
       });
       return html;
  }


document.querySelector('.js-order-summary').innerHTML=cartSummeryHTML;

//REMOVE THE ADDED IREMS WHEN DELETE BUTTON CLICKED

document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click', () => { 
    const productId = link.dataset.productId;
    removeFromCart(productId);
//delete the prduct in and display
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`);
         console.log(container);
         container.remove();
  });
});