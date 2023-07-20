import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { registerroute } from "../Routes/dbroute";
import { loginroute } from "../Routes/dbroute";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, seteamil] = useState("");
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
  const handleemailChange = (event) => {
    seteamil(event.target.value);
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
    } else if (email === "") {
      toast.error(
        "Email is required.",
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

  const handleregistersubmit = async (event) => {
    event.preventDefault();
    if (inputvalidation()) {
      toast.success("Registering",toastOptions)
      const { data } = await axios.post(registerroute, {
        username: username,
        email: email,
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

  const handledemo = async()=>{
    toast.success("Registering",toastOptions)
    const { data } = await axios.post(loginroute, {
      username: "Mohit",
      password: "12345678"
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
          className="text-white  uppercase border-2 hover:bg-[#323639] px-4 py-2 my-4 mx-auto flex items-center"
          type="submit"
        >
          sign-up  
        </button>
      </form>
      <button
          className="text-white  uppercase border-2 hover:bg-[#323639] px-4 py-2 my-4 mx-auto flex items-center"
          onClick={()=>handledemo()}
        >
          Demo login 
      </button>
    </>
  );
};

export default Register;
