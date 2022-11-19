import { useState } from "react";

function Modal(props) {
  let [name, setName] = useState(props.name);
  let [username, setUsername] = useState(props.username);

  function handleSubmit(event) {
    event.preventDefault();
    props.setModalIsOpen(false);
    props.setUserList((prevState) => {
      let newState = [...prevState];
      newState[prevState.findIndex((user) => user.id === props.id)] = {
        id: props.id,
        name,
        username,
      };
      return newState;
    });
  }

  return (
    <div className="modal">
      <i
        className="fas fa-circle-xmark"
        onClick={() => props.setModalIsOpen(false)}
      ></i>
      <form onSubmit={(event) => handleSubmit(event, props.id)}>
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
        <input type="submit" value="Edit User" />
      </form>
    </div>
  );
}

export default Modal;
