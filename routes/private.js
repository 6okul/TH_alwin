const { authorize } = require("../middleware/auth");
const { getUser, uploadPhoto } = require("../controllers/private");

const router = require("express").Router();

router.route("/getuser").get(authorize, getUser);
router.route("/upload").post(authorize, uploadPhoto);

module.exports = router;
