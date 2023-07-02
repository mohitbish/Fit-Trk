import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Infoform from "../Components/Infoform";

const Home = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [userht, setuserht] = useState(undefined);
  const [infocheck, setinfocheck] = useState(true);

  useEffect(() => {
    (async () => {
      if (!localStorage.getItem("current-user")) {
        navigate("/");
      } else {
        setusername(
          await JSON.parse(localStorage.getItem("current-user")).username
        );
        setuserht(
          await JSON.parse(localStorage.getItem("current-user")).height
        );
        console.log("1");
      }
    })();
  }, []);

  useEffect(() => {
    console.log(userht);
    if (userht !== 0) {
      setinfocheck(!infocheck);
    }
  }, [username]);

  return (
    <div className="w-[100vw] h-[100vh] flex flex-row bg-[#202124]">
      <div className="w-3/5">
        <h1>bkjnlfck</h1>
      </div>
      <div className="w-2/5">
      <h1 className="uppercase text-center text-white">
        Hello {username}!
      </h1>
        {infocheck ? <p>fgvhjbk</p> : <Infoform />}
      </div>
    </div>
  );
};

export default Home;
