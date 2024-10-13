import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

export const register = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });

    if (checkUser) {
      return res.json({
        success: false,
        message: "User is already exits! Please try again",
      });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });
    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Registration is successful",
    });
  } catch (error) {
    console.log("Error in register controller", error);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });

    if (!checkUser) {
      return res.json({
        success: false,
        message: "User is doesn't exit! please register first",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );

    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "Incorrect Password! please try again",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "clientsecretkey",
      { expiresIn: "60m" }
    );

    // res.cookie("token", token, { httpOnly: true, secure: true }).json({
    //   success: true,
    //   message: "login successful",
    //   user: {
    //     email: checkUser.email,
    //     role: checkUser.role,
    //     id: checkUser._id,
    //     userName: checkUser.userName,
    //   },
    // });

    res.status(200).json({
      success: true,
      message: "Logged in succesfull",
      token,
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (error) {
    console.log("Error in login controller", error);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully ",
  });
};

// export const middleware = async(req, res, next) => {
//   const token = req.cookies.token;
//   if(!token) {
//     return res.status(401).json({
//       success: false,
//       message: 'Unauthorized user'
//     })
//   }

//   try {
//     const decoded = jwt.verify(token, "clientsecretkey");
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.log('error in middleware', error.message);
//     res.status(401).json({
//       success: false,
//       message: 'Unauthorized user'
//     })
//   }
// }

export const middleware = async(req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]
  if(!token) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized user'
    })
  }

  try {
    const decoded = jwt.verify(token, "clientsecretkey");
    req.user = decoded;
    next();
  } catch (error) {
    console.log('error in middleware', error.message);
    res.status(401).json({
      success: false,
      message: 'Unauthorized user'
    })
  }
}
