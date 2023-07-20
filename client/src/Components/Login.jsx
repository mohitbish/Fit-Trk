import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginroute } from "../Routes/dbroute";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const handleusernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlepasswordChange = (event) => {
    setpassword(event.target.value);
  };

  const inputvalidation = () => {
    if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    }
    return true;
  };

  const handleloginsubmit = async (event) => {
    event.preventDefault();
    if (inputvalidation) {
      toast.success("Loading",toastOptions)
      const { data } = await axios.post(loginroute, {
        username: username,
        password: password,
      });
      if (data.status === false) {
        alert(data.msg);
      }
      if (data.status === true) {
        if (data.user.height === 0) {
          localStorage.clear();
          localStorage.setItem("current-user", JSON.stringify(data.user));
          navigate("/profile");
        } else {
          localStorage.clear();
          localStorage.setItem("current-user", JSON.stringify(data.user));
          navigate("/home");
        }
      }
    }
  };
  return (
    <>
      <h1 className="uppercase text-center">enter details</h1>
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
          className="text-white  uppercase border-2 hover:bg-[#323639] px-4 py-2 my-4 mx-auto flex items-center"
          type="submit"
        >
          log-in
        </button>
      </form>
    </>
  );
};

export default Login;
