const { register, login, infoupdate,workoutupdate, getinfo} = require("./Controllers/Usercontroller");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/infoupdate", infoupdate);
router.post("/workoutupdate", workoutupdate);
router.post("/getinfo", getinfo);


module.exports = router;
