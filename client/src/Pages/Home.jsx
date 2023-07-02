import React, { useEffect, useState } from "react";

const Home = () => {

    const[user, setuser] = useState({})

  useEffect(() => {
    async function getuserData() {
      try {
         const data =localStorage.getItem("current-user");
        setuser(JSON.parse(data))
        console.log(user)
      } catch (e) {
        console.error(e);
      }
    }
    getuserData();
  }, []);
  return (
    <div>
      <h1>home</h1>
    </div>
  );
};

export default Home;
