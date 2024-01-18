import { useState } from "react";

import Button from "react-bootstrap/Button";

import styles from "./TodoList.module.css";
const TodoList = () => {
  const [contact, setContact] = useState();
  const [email, setEmail] = useState("");
  const [list, setList] = useState([]);

  const addHandler = () => {
    const newList = [...list];
    const obj = {
      item: { contact: contact, email: email },
      isediting: false,
      editeditem: { contact: contact, email: email },
      isdone: false,
    };
    newList.push(obj);
    setList(newList);
    setContact("");
    setEmail("");
  };

  const onDeleteHandler = (index) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };

  const isEditingHandler = (index) => {
    const newList = [...list];
    newList[index].isediting = true;
    setList(newList);
  };
  const onCancleHandler = (index) => {
    const newList = [...list];
    newList[index].editeditem.contact = newList[index].item.contact;
    newList[index].editeditem.email = newList[index].item.email;
    newList[index].isediting = false;
    setList(newList);
  };
  const inputHandler = (index, newData) => {
    const newList = [...list];
    newList[index].editeditem.contact = newData;
    setList(newList);
  };

  const emailInputHandler = (index, newEmail) => {
    const newList = [...list];
    newList[index].editeditem.email = newEmail;
    setList(newList);
  };
  const saveHandler = (index) => {
    const editList = [...list];
    editList[index].item.contact = editList[index].editeditem.contact;
    editList[index].item.email = editList[index].editeditem.email;
    editList[index].isediting = false;
    setList(editList);
  };

  return (
    <div>
      <style>
        {`body {
                background-image:url(https://cdn.wallpapersafari.com/25/30/0o5rgy.jpg);
                    background-size: cover;
    background-repeat: no-repeat;
            }`}
      </style>

      <div className={styles.inpContent}>
        <label className={styles.inpLabel}>Contact :</label>
        <input
          className={styles.inpt}
          type="number"
          value={contact}
          onChange={(e) => {
            setContact(e.target.value);
          }}
        />
        <br />

        <label className={styles.inpLabel}>Email :</label>
        <input
          className={styles.inpt}
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <Button
          className={`${styles.addbtn} mt-2`}
          variant="primary"
          onClick={addHandler}
        >
          Add
        </Button>
      </div>

      <div className={styles.listBox}>
        {list.map((data, index) => (
          <div className={styles.listItem} key={index}>
            Contact :
            {!data.isediting ? (
              data.item.contact
            ) : (
              <>
                <input
                  type="number"
                  className={styles.inpt}
                  value={data.editeditem.contact}
                  onChange={(e) => {
                    inputHandler(index, e.target.value);
                  }}
                />
              </>
            )}
            <br />
            Email :
            {!data.isediting ? (
              data.item.email
            ) : (
              <>
                <input
                  type="text"
                  className={styles.inpt}
                  value={data.editeditem.email}
                  onChange={(e) => {
                    emailInputHandler(index, e.target.value);
                  }}
                />
              </>
            )}
            <br />
            <Button
              className="ms-2 mt-3"
              variant="warning"
              disabled={data.isdone}
              onClick={() => {
                isEditingHandler(index);
              }}
            >
              Edit
            </Button>
            {data.isediting && (
              <>
                <Button
                  className="ms-2 mt-3"
                  variant="danger"
                  onClick={() => {
                    onCancleHandler(index);
                  }}
                >
                  Cancle
                </Button>
                <Button
                  className="ms-2 mt-3"
                  variant="success"
                  onClick={() => {
                    saveHandler(index);
                  }}
                >
                  Save
                </Button>
              </>
            )}
            <Button
              className="ms-2 mt-3"
              variant="danger"
              onClick={() => {
                onDeleteHandler(index);
              }}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TodoList;
