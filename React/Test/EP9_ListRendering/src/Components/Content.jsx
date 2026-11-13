import React, { Component, useState } from 'react'
import Shop from './Shop'
import { FaRegTrashAlt } from "react-icons/fa";

const Content=()=>{
  let [items, setItems] = useState([
  { id: 1, lable:"Html&Css",checked:true },
   { id: 2, lable:"JavaScript",checked:true },
    { id: 3, lable:"React",checked:false}
]);

    return (
      <main>
        <div>
          <input type="text"/>
          <button>Add</button>
        </div>
        <ul>
          {
            items.map((item)=>{
              return(
                <li key={item.id} className="item">
                    <input type="checkbox" checked={item.checked}/>
                    <label>{item.lable}</label>
                    <FaRegTrashAlt />
                </li>
              );
            })
            }
        </ul>
        </main>
    )
};

export default Content;