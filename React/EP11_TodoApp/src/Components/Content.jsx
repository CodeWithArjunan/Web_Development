import React, { Component, useState } from "react";
import Shop from "./Shop";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const Content = () => {
  let [items, setItems] = useState([
    { id: 1, lable: "Html&Css", checked: true },
    { id: 2, lable: "JavaScript", checked: true },
    { id: 3, lable: "React", checked: false },
  ]);
  //Input Handling
  let [newItem, setNewItem] = useState("");

  //CheckBox Handling
  let handChecked = (id) => {
    console.log("li"+id);
    let newListItem = items.map((item) => {
      return (item.id === id ? { ...item, checked: !item.checked } : item)
    });
    setItems(newListItem);
        console.log("li"+id);
  };

  //Edit button handling
  let [isEditing, setIsEditing] = useState(false);
  let handleUpdate = () => {
    setIsEditing(true);
  };

  return (
    <main>
      <div>
        <input
          type="text"
          placeholder="Add new Value"
          value={newItem}
          onChange={(e) => {
            setNewItem(e.target.value);
          }}
        />
        <button>{isEditing ? "Save" : "Add"}</button>
      </div>
      <ul>
        {items.map((item) => {
          return (
            <li key={item.id} className="item">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handChecked(item.id)}
              />
              <label>{item.lable}</label>
              <FaEdit role="button" tabIndex={0} onClick={handleUpdate} />
              <FaRegTrashAlt role="button" tabIndex={0} />
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default Content;
