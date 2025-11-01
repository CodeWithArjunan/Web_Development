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

  //store a edit id state
  //CheckBox Handling
  let [currentIndex, setCurrentIndex] = useState(null);
  let handChecked = (id) => {
    console.log("li" + id);
    let newListItem = items.map((item) => {
      return item.id === id ? { ...item, checked: !item.checked } : item;
    });
    setItems(newListItem);
    console.log("li" + id);
  };

  //Edit button handling
  let [isEditing, setIsEditing] = useState(false);
  let handleUpdate = (id) => {
    let ListItem = items.find((item) => item.id === id);
    setNewItem(ListItem.lable);
    setCurrentIndex(id);
    console.log(setCurrentIndex(id));
    setIsEditing(true);
  };

  //Handle Delete
  let handleDalete = (id) => {
    let newItems = items
      .filter((item) => item.id !== id)
      .map((item, index) => {
        return { ...item, id: index + 1 };
      });
    setItems(newItems);
  };
  //Handling a Add and Save Button
  let handleAddorSave = () => {
    if (isEditing) {
      let newItems = items.map((item) => {
        return item.id === currentIndex ? { ...item, lable: newItem } : item;
      });
      setItems(newItems);
      setIsEditing(false);
      setNewItem("");
      setCurrentIndex(null);
    } else {
      setItems([
        ...items,
        { id: items.length + 1, lable: newItem, checked: false },
      ]);
      setNewItem("");
    }
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
        <button onClick={handleAddorSave}>{isEditing ? "Save" : "Add"}</button>
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
              <FaEdit
                className="edit"
                role="button"
                tabIndex={0}
                onClick={() => handleUpdate(item.id)}
              />
              <FaRegTrashAlt
                className="dalete"
                role="button"
                tabIndex={0}
                onClick={() => handleDalete(item.id)}
              />
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default Content;
