const bcrypt = require("bcrypt");
const User = require("../Models/User");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      height: 0,
      weight: 0,
      age: 0,
      gender: "",
      activity: "",
      goals: "",
      workoutsplit: "",
      experience:"",
      Workouts: [],
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.infoupdate = async (req, res, next) => {
  try {
    const username = req.body.username;
    const update = await User.updateOne(
      { username: username },
      {
        $set: {
          weight: req.body.weight,
          height: req.body.height,
          age: req.body.age,
          gender: req.body.gender,
          activity: req.body.activity,
          goals: req.body.goals,
          workoutsplit: req.body.workoutsplit,
          experience: req.body.experience,
        },
        $currentDate: { lastUpdated: true },
      }
    );
    const user = await User.findOne({ username });
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.workoutupdate = async (req, res, next) => {
  try {
    const username = req.body.username;
    const update = await User.updateOne(
      { username: username },
      {
        $set: {
          Workouts:req.body.workouts
        },
        $currentDate: { lastUpdated: true },
      }
    );
    const user = await User.findOne({ username });
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};
