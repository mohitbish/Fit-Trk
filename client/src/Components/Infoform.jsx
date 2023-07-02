import React, { useState } from "react";

const Infoform = () => {
  const [height, setheight] = useState(0);
  const [weight, setweight] = useState(0);
  const [gender, setgender] = useState("");

  const handleheightChange = (event) => {
    setheight(event.target.value);
  };

  const handleweightChange = (event) => {
    setweight(event.target.value);
  };

  const handlegenderChange = (event) => {
    setgender(event.target.value);
  };

  const handleinfosubmit = () => {};
  return (
    <>
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

        <label>Gender</label>
        <select
          className="my-2 p-2  bg-[#D6D6D7] text-xs text-black"
          value={gender}
          onChange={(e) => handlegenderChange(e)}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <button
          className="text-white text-xs uppercase border-2 hover:bg-[#323639] px-3 py-1 my-4 mx-auto flex items-center"
          type="submit"
        >
          submit
        </button>
      </form>
    </>
  );
};

export default Infoform;
