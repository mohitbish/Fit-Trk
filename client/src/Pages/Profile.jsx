import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { infoupdateroute } from "../Routes/dbroute";

const Profile = () => {
  const navigate = useNavigate();
  const [height, setheight] = useState(0);
  const [weight, setweight] = useState(0);
  const [age, setage] = useState(0);
  const [gender, setgender] = useState("");
  const [username, setusername] = useState("");
  const [activity, setactivity] = useState("");
  const[goals,setgoals]= useState("");

  const handleheightChange = (event) => {
    setheight(event.target.value);
  };

  const handleweightChange = (event) => {
    setweight(event.target.value);
  };

  const handlegenderChange = (event) => {
    setgender(event.target.value);
  };
  const handleageChange = (event) => {
    setage(event.target.value);
  };

  const handleactivityChange = (event) => {
    setactivity(event.target.value);
  };
  const handlegoalsChange =(event)=>{
    setgoals(event.target.value)
  }

  const inputvalidation = () => {
    if (height <= 20) {
      alert("Enter correct height");
      return false;
    } else if (weight <= 20) {
      alert("Enter correct weight");
      return false;
    } else if (age <= 10 || age >= 110) {
      alert("Enter correct weight");
      return false;
    } else if (gender === "") {
      alert("select a gender");
      return false;
    }else if (activity === "") {
      alert("select activiy level");
      return false;
    }else if (goals === "") {
      alert("select goals");
      return false;
    }
    return true;
  };

  const handleinfosubmit = async (event) => {
    event.preventDefault();
    if (inputvalidation()) {
      const { data } = await axios.post(infoupdateroute, {
        username: username,
        height: height,
        weight: weight,
        gender: gender,
        age: age,
        activity: activity,
        goals:goals

      });
      if (data.status === false) {
        alert(data.msg);
      }
      if (data.status === true) {
        localStorage.clear();
        localStorage.setItem("current-user", JSON.stringify(data.user));
        navigate("/home");
      }
    }
  };

  useEffect(() => {
    setusername(JSON.parse(localStorage.getItem("current-user")).username);
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] flex flex-row bg-[#202124]">
      <h1 className="uppercase text-center text-white">
        Pls complete your profile
      </h1>
      <form
        className="flex flex-col mx-20 mt-10 text-white"
        action=""
        onSubmit={(event) => handleinfosubmit(event)}
      >
        <label>Height [cm]</label>
        <input
          className="my-2 bg-[#D6D6D7] p-2  text-black"
          type="number"
          placeholder="Height in cm"
          name="height"
          value={height}
          onChange={(e) => handleheightChange(e)}
        />

        <label>Weight [kg]</label>
        <input
          className="my-2 p-2  bg-[#D6D6D7]  text-black"
          type="number"
          placeholder="weight in cm"
          name="weight"
          value={weight}
          onChange={(e) => handleweightChange(e)}
        />

        <label>Age</label>
        <input
          className="my-2 p-2  bg-[#D6D6D7]  text-black"
          type="number"
          placeholder="age"
          name="age"
          value={age}
          onChange={(e) => handleageChange(e)}
        />

        <label>Gender</label>
        <select
          className="my-2 p-2  bg-[#D6D6D7] text-xs text-black"
          value={gender}
          onChange={(e) => handlegenderChange(e)}
        >
          <option value="">gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label>Activity level</label>
        <select
          className="my-2 p-2  bg-[#D6D6D7] text-xs text-black"
          value={activity}
          onChange={(e) => handleactivityChange(e)}
        >
          <option value="">activity-level</option>
          <option value="low">low(1-2 times per week)</option>
          <option value="moderate">moderate(3-4 times per week)</option>
          <option value="high">high(5-6 times per week)</option>
        </select>

        <label>Goals</label>
        <select
          className="my-2 p-2  bg-[#D6D6D7] text-xs text-black"
          value={goals}
          onChange={(e) => handlegoalsChange(e)}
        >
          <option value="">goals</option>
          <option value="Weight loss">weight loss</option>
          <option value="Weight gain">weight gain</option>
          <option value="maintain weight">maintain weight</option>
        </select>

        <button
          className="text-white text-xs uppercase border-2 hover:bg-[#323639] px-3 py-1 my-4 mx-auto flex items-center"
          type="submit"
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default Profile;


