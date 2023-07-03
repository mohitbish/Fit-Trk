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

  return (
    <div className="w-[100vw] h-[100vh] flex sm:flex-row bg-[#202124]">
      <div className="sm:w-3/5">
        <h1 >Workouts</h1>
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
            <td className="py-2 px-4 border-b border-gray-500">Maintain Weight</td>
            <td className="py-2 px-4 border-b border-gray-500">{calories} cal</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b border-gray-500">Lose Weight</td>
            <td className="py-2 px-4 border-b border-gray-500">{calories-100} cal</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b border-gray-500">Gain Weight</td>
            <td className="py-2 px-4 border-b border-gray-500">{calories+100} cal</td>
          </tr>
        </tbody>
      </table>
      <h2 className="uppercase text-center text-white mt-10">
          Dialy Macros
        </h2>
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
            <td className="py-2 px-4 border-b border-gray-500">{(weight*2)} gm</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b border-gray-500">Carbs</td>
            <td className="py-2 px-4 border-b border-gray-500">{Math.round((calories-((weight*8)+ (calories*0.25)))/4)} gm</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b border-gray-500">Fats</td>
            <td className="py-2 px-4 border-b border-gray-500"> {Math.round(calories/36)} gm</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Home;
