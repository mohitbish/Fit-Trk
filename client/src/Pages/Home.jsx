import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [username, setusername] = useState("");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [activity, setactivity] = useState("");
  const [calories, setCalories] = useState(0);
  const [workout, setworkout] = useState([{}]);
  const [srch, setsrch] = useState("");
  const [srcharry, setsrcharry] = useState([{}]);

  useEffect(() => {
    setusername(JSON.parse(localStorage.getItem("current-user")).username);
    setHeight(JSON.parse(localStorage.getItem("current-user")).height);
    setWeight(JSON.parse(localStorage.getItem("current-user")).weight);
    setAge(JSON.parse(localStorage.getItem("current-user")).age);
    setGender(JSON.parse(localStorage.getItem("current-user")).gender);
    setactivity(JSON.parse(localStorage.getItem("current-user")).activity);
  }, []);

  useEffect(() => {
    const calculateCalories = () => {
      let BMR = 0;

      if (gender === "male") {
        BMR = 66.5 + 13.75 * weight + 5 * height - 6.75 * age;
      } else {
        BMR = 655.1 + 9.56 * weight + 1.85 * height - 4.68 * age;
      }
      if (activity === "high") {
        setCalories(BMR + 1200);
      }
      if (activity === "moderate") {
        setCalories(BMR + 1000);
      }
      if (activity === "low") {
        setCalories(BMR + 600);
      }
    };
    calculateCalories();
    console.log(calories);
  }, [username, calories]);

  useEffect(() => {
    console.log(workout);
  }, []);

  const handlesearchChange = (event) => {
    setsrch(event.target.value);
  };

  const excercisesearch = async (event) => {
    event.preventDefault();
    const res = await axios({
      method: "GET",
      url: `https://api.api-ninjas.com/v1/exercises?muscle=${srch}`,
      headers: { "X-Api-Key": "5Gi2Spg6yLQb9wyKC4zKGA==dnbXycfZszOK3KAf" },
      contentType: "application/json",
    });
    setsrcharry(res.data);
  };

  const handlebtnclick = (x) => {
    setworkout((workout) => [...workout, x]);
    console.log(workout);
  };
  const handlebtn2click = (x) => {
    setworkout(workout.filter(item => item.name !== x.name));
  };

  return (
    <div className="w-[100vw] h-[100vh] flex sm:flex-row bg-[#202124]">
      <div className="sm:w-3/5">
        <form
          className="flex flex-col mx-20 mt-10 text-black"
          action=""
          onSubmit={(event) => excercisesearch(event)}
        >
          <input
            className="my-2 p-2 bg-[#D6D6D7]"
            type="twxt"
            placeholder="..."
            name="srch"
            value={srch}
            onChange={(e) => handlesearchChange(e)}
          />
          <button
            className="text-white  uppercase border-2 hover:bg-[#323639] px-4 py-2 my-4 mx-auto flex items-center"
            type="submit"
          >
            Search
          </button>
        </form>

        <h1 className="uppercase text-center text-white mt-10">Workouts</h1>
        {srcharry.map((x, index) => (
          <div key={index} className="flex fel-row justify-around">
            <h2 className="text-white">{x.name}</h2>{" "}
            <button className="text-white" onClick={() => handlebtnclick(x)}>
              add
            </button>
          </div>
        ))}

        {workout.map((x, index) => (
          <div key={index} className="flex fel-row justify-around">
            <h2 className="text-white">{x.name}</h2>{" "}
            <button className="text-white" onClick={() => handlebtn2click(x)}>
              delete
            </button>
          </div>
        ))}
      </div>
      <div className="sm:w-2/5 flex flex-col items-center">
        <h2 className="uppercase text-center text-white mt-10">
          Calorie Information
        </h2>
        <table className="min-w-full border border-gray-500 my-4  text-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-500">Goals</th>
              <th className="py-2 px-4 border-b border-gray-500">Calories</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b border-gray-500">
                Maintain Weight
              </td>
              <td className="py-2 px-4 border-b border-gray-500">
                {calories} cal
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-500">
                Lose Weight
              </td>
              <td className="py-2 px-4 border-b border-gray-500">
                {calories - 100} cal
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-500">
                Gain Weight
              </td>
              <td className="py-2 px-4 border-b border-gray-500">
                {calories + 100} cal
              </td>
            </tr>
          </tbody>
        </table>
        <h2 className="uppercase text-center text-white mt-10">Dialy Macros</h2>
        <table className="min-w-full border border-gray-500 my-4  text-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-500">Macro</th>
              <th className="py-2 px-4 border-b border-gray-500">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b border-gray-500">Proteins</td>
              <td className="py-2 px-4 border-b border-gray-500">
                {weight * 2} gm
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-500">Carbs</td>
              <td className="py-2 px-4 border-b border-gray-500">
                {Math.round((calories - (weight * 8 + calories * 0.25)) / 4)} gm
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-500">Fats</td>
              <td className="py-2 px-4 border-b border-gray-500">
                {" "}
                {Math.round(calories / 36)} gm
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
