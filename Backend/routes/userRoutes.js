const userController = require("../controllers/userController");


const express = require("express");

const router = express.Router();

//  Post method
router.post("/register", userController.registerUser);
router.post("/login", userController.login);



// Get Method
router.get("/all-users", userController.allUser)
router.get("/:id", userController.singleUser)


// Delete Methode
router.delete("/:id", userController.deleteUser)



module.exports = router;