const express = require("express");
const app = express();

const router = express.Router();
const {
  protect,
  updatePassword,
  updateMe,
  deleteMe,
  getAllUsers,
  verifyToken,
} = require("./../controllers/userControllers");

router.use(protect);

// GET ALL USERS

router.route("/getAllUsers").get(getAllUsers);

//Update
router.route("/updatePassword").patch(protect, updatePassword);

router.route("/updateMe").patch(protect, updateMe);

router.route("/deleteMe").delete(protect, deleteMe);

router.route("/protected").get(verifyToken)

module.exports = router;
