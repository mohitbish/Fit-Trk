import React, { useState } from "react";
import { Link } from "react-router-dom";
import Register from "../Components/Register";
import Login from "../Components/Login";

const Welcome = () => {
  const [logincheck, setlogincheck] = useState(false);
  const changelogincheck = ()=>{
    setlogincheck(!logincheck)
  }

  return (
    <div className="w-[100vw] h-[100vh] bg-[#202124]">
      <div className=" h-[10vh] flex flex-row space justify-between px-5 sm:px-10   text-white border-2 border-gray-500">
        <Link
          className="sm:text-xl py-5 sm:py-10 py-x sm:px-10 font-bond uppercase hover:bg-[#323639]"
          to="/"
        >
          fit-trk
        </Link>

        {logincheck ? (
          <Link className="sm:text-xl py-5 sm:py-10 py-x sm:px-10 font-bond uppercase underline hover:bg-[#323639]"
          onClick={changelogincheck}>
            sign-up
          </Link>
        ) : (
          <Link
            className="sm:text-xl py-5 sm:py-10 py-x sm:px-10 font-bond uppercase underline hover:bg-[#323639]"
            onClick={changelogincheck}
          >
            Log In
          </Link>
        )}
      </div>
      <div className=" w-full h-[90vh] flex flex-col sm:flex-row space justify-between px-5 sm:px-10 py-10 sm:py-15  text-white border-2 border-gray-500">
        <p className=" sm:w-2/5 h-2/5 sm:h-full  aling-centre">
          Some welcome text add passport js auth down in row for md and icons
          for sm
        </p>
        <div className=" sm:w-3/5 h-3/5 sm:h-full mx-2 items-center">
          
          {logincheck?(<Login />):(<Register />)}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
