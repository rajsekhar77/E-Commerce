import express from "express";
import {
  register,
  login,
  logout,
  middleware,
} from "../../controllers/auth/auth-controller.js";

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check-auth", middleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "User is authenticated",
    user,
  });
});

export default router;