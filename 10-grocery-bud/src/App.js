import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      //display alert
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      //display edit
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      showAlert(true, "success", "successfully edited");
    } else {
      //add item
      //show alert
      showAlert(true, "success", "successfully added");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const inputHandler = (e) => {
    setName(e.target.value);
  };

  const deleteHandler = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    showAlert(true, "success", "successfully deleted");
  };

  const editHandler = (itemId) => {
    const specificItem = list.find((item) => item.id === itemId);
    setName(specificItem.title);
    setIsEditing(true);
    setEditID(itemId);
  };

  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} list={list} removeAlert={showAlert} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="eg. eggs"
            value={name}
            onChange={inputHandler}
          />
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>
      <div className="grocery-container">
        <List
          items={list}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
        />
        <button className="clear-btn" onClick={clearList}>
          clear items
        </button>
      </div>
    </section>
  );
}

export default App;
