import USER_SCHEMA from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/token.js";

const registerUser = asyncHandler(async(req,res) => {
    let { email } = req.body;
    let user = await USER_SCHEMA.findOne({email});
    if(user){
        throw new Error("email already exists...");
    }
    let newUser = await USER_SCHEMA.create(req.body);
    res.status(201).json({ message:"user added", newUser }) 
});

const getOneUser = asyncHandler(async(req,res) => {
    let { id } = req.params;
    let findUser = await USER_SCHEMA.findById(id);
    if(!findUser){
        throw new Error("No such user exists...");
    }
    res.status(200).json({ message:"User found", findUser });
});

const getAllUser = asyncHandler(async(req,res) => {
    let allUsers = await USER_SCHEMA.find();
    if(allUsers.length === 0){
        throw new Error("No users present...");
    }
    res.status(200).json({ message: "All users found", allUsers });
});

const updateUser = asyncHandler(async(req,res) => {
    let findUser = await USER_SCHEMA.findById(req.params.id)
    if(!findUser){
        throw new Error("no such user present")
    }

    findUser.name = req.body.name || findUser.name;
    findUser.email = req.body.email || findUser.email;
    findUser.role = req.body.role || findUser.role;

    if(req.body.password){
        findUser.password = req.body.password;
    }

    let updateUser = await findUser.save();
    res.status(200).json({ message: "user updated", updateUser });
});

const deleteUser = asyncHandler(async(req,res) => {
    let { id } = req.params;
    let findUser = await USER_SCHEMA.findOne({_id:id});
    if(!findUser){
        throw new Error("No such user present ");
    }
    await USER_SCHEMA.findByIdAndDelete(id);
    res.status(200).json({ message:"User deleted Successfully" });
});

const loginUser = asyncHandler(async(req,res) => {
    let { email,password } = req.body;
    let findUser = await USER_SCHEMA.findOne({email});
    if(!findUser){
        throw new Error("Email not found");
    }
    let isMatch = await findUser.matchPassword(password);
    if(!isMatch){
        throw new Error("Incorrect Password");
    }
    let token = generateToken(findUser._id);
    res.cookie("myCookie",token, {
        httpOnly:true
    });
    res.status(200).json({message:"User logged in successfully",token});
});

const logoutUser = asyncHandler(async(req,res) => {
    res.clearCookie("myCookie","",{ expiresIn:"0" });
    res.status(200).json({ success:true, message:"User logged out" });
});

export { registerUser,deleteUser, getOneUser, getAllUser,updateUser,loginUser,logoutUser };