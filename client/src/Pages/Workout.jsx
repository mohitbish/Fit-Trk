import React, { useEffect, useState } from "react";
import axios from "axios";
import { workoutupdateroute } from "../Routes/dbroute";
import { Link } from "react-router-dom";
import loadimg from '../Assests/loader.gif'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Workout = () => {
  const toastOptions = {
    position: "top-right",
    autoClose: 9000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  const [username, setusername] = useState("");
  const [workoutsplit, setworkoutsplit] = useState("");
  const [days, setdays] = useState([]);
  const [day, setday] = useState("");
  const [muscle, setmuscle] = useState("");
  const [workout, setworkout] = useState([]);
  const [srcharry, setsrcharry] = useState([]);
  const [daycheck, setdaycheck] = useState(false);
  const [experience, setexperience] = useState("");
  const [searchcheck, setsearchcheck] = useState(false);
  const[isloading,setisloading]=useState(true)
  const [muscles, setmuscles] = useState([
    "abdominals",
    "abductors",
    "adductors",
    "biceps",
    "calves",
    "chest",
    "forearms",
    "glutes",
    "hamstrings",
    "lats",
    "middle_back",
    "neck",
    "quadriceps",
    "traps",
    "triceps",
  ]);

  useEffect(() => {
    setworkoutsplit(
      JSON.parse(localStorage.getItem("current-user")).workoutsplit
    );
    setusername(JSON.parse(localStorage.getItem("current-user")).username);
    setexperience(JSON.parse(localStorage.getItem("current-user")).experience);
    setdays(JSON.parse(localStorage.getItem("current-user")).Workouts);
  }, []);

  useEffect(() => {
    if (workoutsplit === "6" && days.length === 0) {
      for (let i = 0; i < 6; i++) {
        setdays((days) => [...days, { name: `Day ${i + 1}`, workoutarry: [] }]);
      }
    }
    if (workoutsplit === "2" && days.length === 0) {
      for (let i = 0; i < 2; i++) {
        setdays((days) => [...days, { name: `Day ${i + 1}`, workoutarry: [] }]);
      }
    }
    if (workoutsplit === "4" && days.length === 0) {
      for (let i = 0; i < 4; i++) {
        setdays((days) => [...days, { name: `Day ${i + 1}`, workoutarry: [] }]);
      }
    }
    if (workoutsplit === "5" && days.length === 0) {
      for (let i = 0; i < 5; i++) {
        setdays((days) => [...days, { name: `Day ${i + 1}`, workoutarry: [] }]);
      }
    }
  }, [workoutsplit]);

  const excercisesearch = async (m) => {
    setisloading(true)
    setsearchcheck(true);
    const res = await axios({
      method: "GET",
      url: `https://api.api-ninjas.com/v1/exercises?muscle=${m}&difficulty=${experience}`,
      headers: { "X-Api-Key": "5Gi2Spg6yLQb9wyKC4zKGA==dnbXycfZszOK3KAf" },
      contentType: "application/json",
    });
    setsrcharry(res.data);
    setisloading(false)
    setmuscle(m);
  };

  const handledayChange = (value) => {
    setday(value);
    setworkout([]);
    if (daycheck === false) {
      setdaycheck(!daycheck);
    }
  };

  const handlebtnclick = async (x) => {
    if (workout.includes(x)) {
      toast.warning("Already added",toastOptions);
    } else {
      setworkout((workout) => [...workout, x]);
    }
  };

  const handlebtn2click = (x) => {
    setworkout(workout.filter((item) => item.name !== x.name));
  };

  const saveworkout = async () => {
    const x = { name: day, workoutarry: workout };
    const index = await days.findIndex((item) => item.name === day);
    const newarry = days;
    newarry[index] = x;
    setdays(newarry);

    const { data } = await axios.post(workoutupdateroute, {
      username: username,
      workouts: days,
    });
    if (data.status === false) {
      toast.error(data.msg,toastOptions)
    }
    if (data.status === true) {
      localStorage.clear();
      localStorage.setItem("current-user", JSON.stringify(data.user));
      toast.success("Saved",toastOptions)
    }
  };

  return (
    <div
      className={
        daycheck
          ? "w-[100vw] h-[130vh] sm:h-[100vh] relative flex flex-col bg-[#202124]"
          : "w-[100vw] h-[100vh] relative flex flex-col bg-[#202124]"
      }
    >
      <Link
        className="sm:text-xl py-4 sm:py-5 py-x sm:px-10 absolute left-0 top-0 font-bond uppercase underline text-white hover:bg-[#323639]"
        to="/home"
      >
        Home
      </Link>
      <h1 className="text-2xl text-center uppercase font-bold text-white  sm:mb-8 mt-12 sm:mt-4">
        Workout planner for {workoutsplit} day/week
      </h1>
      <h2 className="text-gray-500 text-center  uppercase  mt-2 sm:mt-4 ">
        select a day to edit
      </h2>
      <div className="flex flex-row justify-evenly  my-2 sm:my-4 text-white sm:mx-10">
        {days.map((d, index) => (
          <button
            onClick={() => handledayChange(d.name)}
            key={index}
            className="uppercase font-semibold hover:bg-gray-500 border-2 border-gray-500 px-2"
          >
            {d.name}
          </button>
        ))}
      </div>
      <h1 className="uppercase text-center text-gray-500 mt-4 sm:mt-10">
        select a muscle to see exercises
      </h1>
      <div className="grid  grid-cols-3 sm:grid-cols-5 gap-4 text-white  mx-4 my-2 sm:my-4">
        {muscles.map((m, index) => (
          <button
            onClick={() => excercisesearch(m)}
            key={index}
            className="uppercase  hover:bg-gray-500 border-2 border-gray-500"
          >
            {m}
          </button>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row  mx-2">
        {isloading?(<img src={loadimg} width={300} alt="loader" className={searchcheck ?("mx-2"):("hidden")}/>):(<div className={searchcheck ? "sm:w-1/2 mx-2" : "hidden"}>
          <h1 className="uppercase text-center text-white mt-8 mb-2">
            Exercise for {muscle}
          </h1>
          <div className="border-2 border-gray-500 grid grid-cols-2 sm:flex flex-col">
            {srcharry.map((x, index) => (
              <div key={index} className="flex flex-row gap-1 sm:gap-2 mx-2">
                <h2 className="text-white">{x.name}</h2>{" "}
                <button
                  className="text-white font-bold"
                  onClick={() => handlebtnclick(x)}
                >
                  [+]
                </button>
              </div>
            ))}
          </div>
        </div>)}
        {daycheck ? (
          <div className="sm:w-1/2 mx-2 ">
            <div className="flex flex-row justify-between">
            <h1 className="uppercase text-center text-white mt-8 mb-2">
                Workout for {day}
              </h1>
              <button
                onClick={() => saveworkout()}
                className="text-white uppercase border-2 border-gray-500  font-bold  mt-8 px-3 hover:bg-gray-400"
              >
                save
              </button>
             
            </div>
            <div className="border-2 border-gray-500">
              {workout.map((x, index) => (
                <div
                  key={index}
                  className="flex fel-row gap-4  justify-center items-center"
                >
                  <h2 className="text-white">{x.name}</h2>{" "}
                  <button
                    className="text-white font-bold"
                    onClick={() => handlebtn2click(x)}
                  >
                    [-]
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Workout;
