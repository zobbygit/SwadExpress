import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register=async(req,res)=>{
    try {
        const {name,email,password}=req.body
if(!name || !email || !password){
    return res.json({success:false , message :'Missing Details'})
}
const existingUser=await User.findOne({email})
if(existingUser)
    return res.json({success:false ,message :'User Already exists'})
const hashedPassword=await bcrypt.hash(password,10)
const user=await User.create({name,email,password:hashedPassword})
const token=jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
res.cookie('token',token,{
    httpOnly:true,
    secure:process.env.NODE_ENV === 'production',
    sameSite:process.env.NODE_ENV === 'production' ? 'none' :'lax',
    maxAge:7*24*60*60*1000,
})
return res.json({success :true , user:{email : user.email,name:user.name}})
    } catch (error) {
        console.log(error.message)
        res.json({success:false , message:error.message})
    }
}
export const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password)
            return res.json({success:false,message:'Email and password are required'})
        const user=await User.findOne({email});
        if(!user){
            return res.json({success:false ,message:'Invalid Email and password'})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch)
            return res.json({success:false , message :'Invalid Email or Password'})

const token=jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
res.cookie('token',token,{
    httpOnly:true,
    secure:process.env.NODE_ENV === 'production',
    sameSite:process.env.NODE_ENV === 'production' ? 'none' :'lax',
    maxAge:7*24*60*60*1000,
})
return res.json({success :true , user:{email : user.email,name:user.name}})

    } catch (error) {
          console.log(error.message)
        res.json({success:false , message:error.message})
    }
}

//check auth
export const isAuth = async (req, res) => {
  try {
    const userId = req.userId;  // Changed this line
    const user = await User.findById(userId).select("-password");
    return res.json({ success: true, user });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


export const logout = async (req,res)=>{

try {
    res.clearCookie('token',{
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    })
    return res.json({success:true,message:"Logged Out"})
} catch (error) {
      console.log(error.message)
        res.json({success:false , message:error.message})
}
}



// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// /* =========================
//    COOKIE CONFIG
// ========================= */
// const cookieOptions = {
//   httpOnly: true,
//   secure: false,        // false for localhost
//   sameSite: "none",    // REQUIRED for cross-port
//   maxAge: 7 * 24 * 60 * 60 * 1000,
// };


// /* =========================
//    REGISTER
// ========================= */
// export const register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.json({ success: false, message: "Missing details" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.json({ success: false, message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hashedPassword });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     res.cookie("token", token, cookieOptions);

//     return res.json({
//       success: true,
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.error(error.message);
//     return res.json({ success: false, message: error.message });
//   }
// };

// /* =========================
//    LOGIN
// ========================= */
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.json({
//         success: false,
//         message: "Email and password are required",
//       });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     res.cookie("token", token, cookieOptions);

//     return res.json({
//       success: true,
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.error(error.message);
//     return res.json({ success: false, message: error.message });
//   }
// };

// /* =========================
//    CHECK AUTH (PERSIST LOGIN)
// ========================= */
// export const isAuth = async (req, res) => {
//   try {
//     const userId = req.userId; // from authUser middleware

//     const user = await User.findById(userId).select("-password");

//     return res.json({ success: true, user });
//   } catch (error) {
//     console.error(error.message);
//     return res.json({ success: false, message: error.message });
//   }
// };

// /* =========================
//    LOGOUT
// ========================= */
// export const logout = async (req, res) => {
//   try {
//     res.clearCookie("token", cookieOptions);

//     return res.json({
//       success: true,
//       message: "Logged out successfully",
//     });
//   } catch (error) {
//     console.error(error.message);
//     return res.json({ success: false, message: error.message });
//   }
// };
