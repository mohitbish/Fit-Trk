import React, { useEffect, useState } from "react";
import axios from "axios";

const Workout = () => {
  const [workoutsplit, setworkoutsplit] = useState("");
  const [days, setdays] = useState([]);
  const [day, setday] = useState([]);
  const [workout, setworkout] = useState([]);
  const [srcharry, setsrcharry] = useState([]);
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
  }, []);

  useEffect(() => {
    if (workoutsplit === "6" && days.length === 0) {
      for (let i = 0; i < 6; i++) {
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
  };

  const handledayChange = (value) => {
    setday(value);
  };

  const handlebtnclick = (x) => {
    if (workout.includes(x)) {
      alert("already added");
    } else {
      setworkout((workout) => [...workout, x]);
      console.log(workout);
    }
  };
  const handlebtn2click = (x) => {
    setworkout(workout.filter((item) => item.name !== x.name));
  };

  const saveworkout= async()=>{
    const x = {name:day, workoutarry:workout}
    const index = await days.findIndex(item => item.name === day);
    const newarry = days;
    newarry[index] = x;
    setdays(newarry)
    console.log(days)
  }

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col bg-[#202124]">
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
          <h1 className="uppercase text-center text-white mt-10">Workouts</h1>

          <div className="border-2 border-gray-500">
            {srcharry.map((x, index) => (
              <div key={index} className="flex fel-row justify-evenly ">
                <h2 className="text-white">{x.name}</h2>{" "}
                <button
                  className="text-white"
                  onClick={() => handlebtnclick(x)}
                >
                  add
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="uppercase text-center text-white mt-10">Workout for {day}</h1>
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
          <button onClick={()=>saveworkout()} className="text-white border-2 border-gray-500 my-4">save</button>
        </div>
      </div>
    </div>
  );
};

export default Workout;
