import React, { useState } from "react";
import { Link } from "react-router-dom";
import Register from "../Components/Register";
import Login from "../Components/Login";
import logo from "../Assests/1.png";

const Welcome = () => {
  const [logincheck, setlogincheck] = useState(false);
  const changelogincheck = () => {
    setlogincheck(!logincheck);
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-[#202124]">
      <div className=" h-[10vh] flex flex-row space justify-between px-5 sm:px-10   text-white border-2 border-gray-500">
        <img src={logo} alt="Girl in a jacket" width="100" height="80" />
        {logincheck ? (
          <Link
            className="sm:text-xl py-4 sm:py-5 py-x sm:px-10 mt-5 sm:mt-0 font-bond uppercase underline hover:bg-[#323639]"
            onClick={changelogincheck}
          >
            sign-up
          </Link>
        ) : (
          <Link
            className="sm:text-xl py-4 sm:py-5 py-x sm:px-10 mt-5  sm:mt-0 font-bond uppercase underline hover:bg-[#323639]"
            onClick={changelogincheck}
          >
            Log In
          </Link>
        )}
      </div>
      <div className=" w-full h-[90vh] flex flex-col sm:flex-row space justify-between px-5 sm:px-10 py-10 sm:py-15 my-10 text-white ">
        <div>
          <p className=" text-2xl font-bold text-center uppercase">
            welcome to fit-trk
          </p>
          <p className=" text uppercase text-center  mt-2 mb-10">
            [workouts and diet managing tool]
          </p>
          <p className=" uppercase my-1"> # Create your own workout-split</p>
          <p className=" uppercase my-1">
            # Structure daily workouts to your personal needs
          </p>
          <p className=" uppercase my-1">
            # Get calorie and macro data for your goals
          </p>
        </div>

        <div className=" sm:w-1/2 h-3/5 sm:h-full mx-2 items-center">
          {logincheck ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
