import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");

  const [password, setpassword] = useState("");

  const handleusernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlepasswordChange = (event) => {
    setpassword(event.target.value);
  };

  const inputvalidation = () => {
    if (username.length < 3) {
      alert("Username should be greater than 3 characters.");
      return false;
    } else if (password.length < 8) {
      alert("Password should be equal or greater than 8 characters.");
      return false;
    }
    return true;
  };

  const handleloginsubmit = async (event) => {
    event.preventDefault();
    if (inputvalidation()) {
      console.log("vwg");
    }
  };
  return (
    <>
      <h1 className="uppercase text-center">new to app?</h1>
      <form
        className="flex flex-col mx-20 mt-10 text-black"
        action=""
        onSubmit={(event) => handleloginsubmit(event)}
      >
        <input
          className="my-2 bg-[#D6D6D7] p-2"
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={(e) => handleusernameChange(e)}
        />

        <input
          className="my-2 p-2 bg-[#D6D6D7]"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => handlepasswordChange(e)}
        />
        <button
          className="text-white  uppercase border-2 hover:bg-[#323639] px-4 py-3 my-4 mx-auto flex items-center"
          type="submit"
        >
          log-in
        </button>
      </form>
    </>
  );
};

export default Login;
