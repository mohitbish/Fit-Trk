import React, { useEffect, useState } from "react";
import axios from "axios";

const Workout = () => {
  const [username, setusername] = useState("");
  const [workout, setworkout] = useState([{}]);
  const [srcharry, setsrcharry] = useState([{}]);
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
    setusername(JSON.parse(localStorage.getItem("current-user")).username);
  }, []);

  const excercisesearch = async (m) => {
    const res = await axios({
      method: "GET",
      url: `https://api.api-ninjas.com/v1/exercises?muscle=${m}`,
      headers: { "X-Api-Key": "5Gi2Spg6yLQb9wyKC4zKGA==dnbXycfZszOK3KAf" },
      contentType: "application/json",
    });
    setsrcharry([]);
    setsrcharry(res.data);
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
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col  bg-[#202124]">
      <h1 className="text-xl-white text-center text-white my-4">
        Workout planner
      </h1>
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
      <div className="mx-2">
        <h1 className="uppercase text-center text-white mt-10">Workouts</h1>

        <div className="border-2 border-gray-500">
          {srcharry.map((x, index) => (
            <div key={index} className="flex fel-row justify-around ">
              <h2 className="text-white">{x.name}</h2>{" "}
              <button className="text-white" onClick={() => handlebtnclick(x)}>
                add
              </button>
            </div>
          ))}
        </div>
        <div className="border-2 border-gray-500">
          {workout.map((x, index) => (
            <div key={index} className="flex fel-row justify-around">
              <h2 className="text-white">{x.name}</h2>{" "}
              <button className="text-white" onClick={() => handlebtn2click(x)}>
                delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workout;
