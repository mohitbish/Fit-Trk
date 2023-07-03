const { register, login, infoupdate} = require("./Controllers/Usercontroller");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/infoupdate", infoupdate);

module.exports = router;
