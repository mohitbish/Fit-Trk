import React, { useEffect, useState } from "react";
import axios from "axios";
import { workoutupdateroute } from "../Routes/dbroute";
import { Link } from "react-router-dom";

const Workout = () => {
  const [username, setusername] = useState("");
  const [workoutsplit, setworkoutsplit] = useState("");
  const [days, setdays] = useState([]);
  const [day, setday] = useState([]);
  const [muscle, setmuscle] = useState("");
  const [workout, setworkout] = useState([]);
  const [srcharry, setsrcharry] = useState([]);
  const [daycheck, setdaycheck] = useState(false);
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
    const res = await axios({
      method: "GET",
      url: `https://api.api-ninjas.com/v1/exercises?muscle=${m}`,
      headers: { "X-Api-Key": "5Gi2Spg6yLQb9wyKC4zKGA==dnbXycfZszOK3KAf" },
      contentType: "application/json",
    });
    setsrcharry(res.data);
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
      alert("already added");
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
    console.log(days);

    const { data } = await axios.post(workoutupdateroute, {
      username: username,
      workouts: days,
    });
    if (data.status === false) {
      alert(data.msg);
    }
    if (data.status === true) {
      localStorage.clear();
      localStorage.setItem("current-user", JSON.stringify(data.user));
      console.log("saved");
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col bg-[#202124]">
        <Link
          className="sm:text-xl py-4 sm:py-5 py-x sm:px-10 font-bond uppercase text-white hover:bg-[#323639]"
          to="/home"
        >
          Home
        </Link>
      <h1 className="text-xl text-center text-white my-4">
        Workout planner for {workoutsplit} day/week
      </h1>

      <div className="flex flex-row justify-around my-10 text-white">
        {days.map((d, index) => (
          <button
            onClick={() => handledayChange(d.name)}
            key={index}
            className="uppercase underline hover:bg-gray-500 "
          >
            {d.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-4 text-white">
        {muscles.map((m, index) => (
          <button
            onClick={() => excercisesearch(m)}
            key={index}
            className="uppercase hover:bg-gray-500 border-2 border-gray-500"
          >
            {m}
          </button>
        ))}
      </div>
      <div className="flex flex-row  justify-evenly mx-2">
        <div>
          <h1 className="uppercase text-center text-white mt-10">
            Exercise for {muscle}
          </h1>

          <div className="border-2 border-gray-500">
            {srcharry.map((x, index) => (
              <div key={index} className="flex flex-row">
                <h2 className="text-white">{x.name}</h2>{" "}
                <button
                  className="text-white "
                  onClick={() => handlebtnclick(x)}
                >
                  add
                </button>
              </div>
            ))}
          </div>
        </div>
        {daycheck ? (
          <div>
            <h1 className="uppercase text-center text-white mt-10">
              Workout for {day}
            </h1>
            <div className="border-2 border-gray-500">
              {workout.map((x, index) => (
                <div key={index} className="flex fel-row justify-around">
                  <h2 className="text-white">{x.name}</h2>{" "}
                  <button
                    className="text-white"
                    onClick={() => handlebtn2click(x)}
                  >
                    delete
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => saveworkout()}
              className="text-white border-2 border-gray-500 my-4"
            >
              save
            </button>
          </div>
        ) : (
          <h1>select a day</h1>
        )}
      </div>
    </div>
  );
};

export default Workout;
