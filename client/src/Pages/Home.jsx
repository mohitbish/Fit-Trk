import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState({});
  console.log(user)
  useEffect(() => {
    (async () => {
      if (!localStorage.getItem("current-user")) {
        navigate("/");
      } else {
        setuser(
          await JSON.parse(localStorage.getItem("current-user"))
        );
        
      }
    })();
  }, [navigate]);

  return (
    <div>
      <h1>hello {user.username} </h1>
    </div>
  );
};

export default Home;
