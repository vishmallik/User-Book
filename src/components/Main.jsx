import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Modal from "./Modal";

function Main() {
  let [name, setName] = useState("");
  let [username, setUsername] = useState("");
  let [userList, setUserList] = useState(
    JSON.parse(localStorage.getItem("userList")) || []
  );

  function handleSubmit(event) {
    event.preventDefault();
    setUserList((prevState) =>
      prevState.concat({ name, username, id: uuid() })
    );
    setName("");
    setUsername("");
  }

  function handleDelete(id) {
    setUserList((prevState) => prevState.filter((user) => user.id !== id));
  }
  useEffect(() => {
    return localStorage.setItem("userList", JSON.stringify(userList));
  }, [userList]);

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          id=""
          placeholder="Enter Name"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <input
          type="text"
          name="username"
          id=""
          placeholder="Enter Username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <input type="submit" value="Add User" />
      </form>
      {userList.length < 1 ? (
        <h3>Hint: Add users to display list of users</h3>
      ) : (
        <h2>List of all Users</h2>
      )}
      <ol>
        {userList.map((user) => (
          <User
            key={user.id}
            user={user}
            handleDelete={handleDelete}
            userList={userList}
            setUserList={setUserList}
          />
        ))}
      </ol>
    </>
  );
}

function User({ user, handleDelete, userList, setUserList }) {
  let [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <li>
      <p>
        <strong>Name: </strong>
        <span>{user.name}</span>
      </p>
      <p>
        <strong>Username: </strong>
        <span>@{user.username}</span>
      </p>
      <button onClick={() => setModalIsOpen(true)}>Edit User</button>
      <button className="delete-btn" onClick={() => handleDelete(user.id)}>
        Delete User
      </button>
      {modalIsOpen && (
        <Modal
          {...user}
          setModalIsOpen={setModalIsOpen}
          setUserList={setUserList}
        />
      )}
    </li>
  );
}

export default Main;
