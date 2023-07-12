import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { infoupdateroute } from "../Routes/dbroute";

const Profile = () => {
  const navigate = useNavigate();
  const [height, setheight] = useState(0);
  const [weight, setweight] = useState(0);
  const [age, setage] = useState(0);
  const [gender, setgender] = useState("");
  const [username, setusername] = useState("");
  const [activity, setactivity] = useState("");
  const [goals, setgoals] = useState("");
  const [workoutsplit, setworkoutsplit] = useState("");
  const [experience, setexperience] = useState("");
  const [btnchange, setbtnchange] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("current-user") === null) {
      navigate("/");
    } else {
      setusername(JSON.parse(localStorage.getItem("current-user")).username);

      if (JSON.parse(localStorage.getItem("current-user")).height !== 0) {
        setheight(JSON.parse(localStorage.getItem("current-user")).height);
        setweight(JSON.parse(localStorage.getItem("current-user")).weight);
        setage(JSON.parse(localStorage.getItem("current-user")).age);
        setgender(JSON.parse(localStorage.getItem("current-user")).gender);
        setactivity(JSON.parse(localStorage.getItem("current-user")).activity);
        setgoals(JSON.parse(localStorage.getItem("current-user")).goals);
        setworkoutsplit(
          JSON.parse(localStorage.getItem("current-user")).workoutsplit
        );
        setexperience(
          JSON.parse(localStorage.getItem("current-user")).experience
        );
        setbtnchange(false);
      }
    }
  }, []);

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
  const handlegoalsChange = (event) => {
    setgoals(event.target.value);
  };
  const handleworkoutsplitChange = (event) => {
    setworkoutsplit(event.target.value);
  };

  const handleexperienceChange = (event) => {
    setexperience(event.target.value);
  };

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
    } else if (activity === "") {
      alert("select activiy level");
      return false;
    } else if (goals === "") {
      alert("select goals");
      return false;
    } else if (workoutsplit === "") {
      alert("select workoutsplit");
      return false;
    } else if (experience === "") {
      alert("select experience");
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
        goals: goals,
        workoutsplit: workoutsplit,
        experience: experience,
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

  return (
    <div className=" relative w-[100vw] h-[100vh] flex flex-col justify-evenly bg-[#202124] items-center">
      <Link
        className={
          btnchange
            ? "hidden"
            : "sm:text-xl py-4 sm:py-5 py-x sm:px-10 absolute left-0 top-0 font-bond uppercase underline text-white hover:bg-[#323639]"
        }
        to="/home"
      >
        Home
      </Link>
      <div className="w-3/5">

        <h1 className="uppercase  text-xl text-center text-white font-bold my-5">
          personal details
        </h1>

        <p className="text-gray-500 text-center">
          This information helps in calculating your calorie requirments and
          suggesting appropiate workoutsplit
        </p>
      </div>

      <form
        className="flex flex-col mx-20 mt-8 py-10 text-white"
        action=""
        onSubmit={(event) => handleinfosubmit(event)}
      >
        <div className=" grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label>Height [cm]</label>
            <input
              className="my-2 bg-[#D6D6D7] p-2  text-black"
              type="number"
              placeholder="Height in cm"
              name="height"
              value={height}
              onChange={(e) => handleheightChange(e)}
            />
          </div>
          <div className="flex flex-col">
            <label>Weight [kg]</label>
            <input
              className="my-2 p-2  bg-[#D6D6D7]  text-black"
              type="number"
              placeholder="weight in cm"
              name="weight"
              value={weight}
              onChange={(e) => handleweightChange(e)}
            />
          </div>
          <div className="flex flex-col">
            <label>Age</label>
            <input
              className="my-2 p-2  bg-[#D6D6D7]  text-black"
              type="number"
              placeholder="age"
              name="age"
              value={age}
              onChange={(e) => handleageChange(e)}
            />
          </div>
          <div className="flex flex-col">
            <label>Gender</label>
            <select
              className="my-2 p-2  bg-[#D6D6D7]  text-black"
              value={gender}
              onChange={(e) => handlegenderChange(e)}
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label>Activity level</label>
            <select
              className="my-2 p-2  bg-[#D6D6D7]  text-black"
              value={activity}
              onChange={(e) => handleactivityChange(e)}
            >
              <option value="">Activity-level</option>
              <option value="low">Low(1-2 times per week)</option>
              <option value="moderate">Moderate(3-4 times per week)</option>
              <option value="high">High(5-6 times per week)</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label>Goals</label>
            <select
              className="my-2 p-2  bg-[#D6D6D7]  text-black"
              value={goals}
              onChange={(e) => handlegoalsChange(e)}
            >
              <option value="">Goals</option>
              <option value="Weight loss">Weight loss</option>
              <option value="Weight gain">Weight gain</option>
              <option value="maintain weight">Maintain weight</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label>Workout-split</label>
            <select
              className="my-2 p-2  bg-[#D6D6D7]  text-black"
              value={workoutsplit}
              onChange={(e) => handleworkoutsplitChange(e)}
            >
              <option value="">Workout-split</option>
              <option value="2">1-2 day/week</option>
              <option value="4">3-4 day/week</option>
              <option value="5">5 day/week</option>
              <option value="6">6 day/week</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label>Experience</label>
            <select
              className="my-2 p-2  bg-[#D6D6D7]  text-black"
              value={experience}
              onChange={(e) => handleexperienceChange(e)}
            >
              <option value="">Level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
            </select>
          </div>
        </div>
        {btnchange ? (
          <button
            className="text-white text-xl uppercase border-2 hover:bg-[#323639] px-4 py-2 mt-10 mx-auto flex items-center"
            type="submit"
          >
            submit
          </button>
        ) : (
          <button
            className="text-white text-xl uppercase border-2 hover:bg-[#323639] px-4 py-2 mt-10 mx-auto flex items-center"
            type="submit"
          >
            update
          </button>
        )}
      </form>
    </div>
  );
};

export default Profile;
