import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { registerroute } from "../Routes/dbroute";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, seteamil] = useState("");
  const [password, setpassword] = useState("");

  const handleusernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleemailChange = (event) => {
    seteamil(event.target.value);
  };
  const handlepasswordChange = (event) => {
    setpassword(event.target.value);
  };

  const inputvalidation = () => {
    if (username.length < 3) {
      alert("Username should be greater than 3 characters.");
      return false;
    } else if (email === "") {
      alert("Email is required.");
      return false;
    } else if (password.length < 8) {
      alert("Password should be equal or greater than 8 characters.");
      return false;
    }
    return true;
  };

  const handleregistersubmit = async (event) => {
    event.preventDefault();
    if (inputvalidation) {
      const { data } = await axios.post(registerroute, {
        username: username,
        email: email,
        password: password,
      });
      if (data.status === false) {
        alert(data.msg);
      }
      if (data.status === true) {
        localStorage.setItem("current-user", JSON.stringify(data.user));
        navigate("/home");
      }
    }
  };
  return (
    <>
      <h1 className="uppercase text-center">new to app?</h1>
      <form
        className="flex flex-col mx-20 mt-10 text-black"
        action=""
        onSubmit={(event) => handleregistersubmit(event)}
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
          className="my-2 p-2  bg-[#D6D6D7]"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => handleemailChange(e)}
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
          sign-up
        </button>
      </form>
    </>
  );
};

export default Register;
