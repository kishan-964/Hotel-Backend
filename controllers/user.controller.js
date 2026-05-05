import { User } from "../models/user.model.js";

//get all users
export const getUsers = async (req, res) => {
    try{
      const users = await User.find().select("-password");

      if (users.length ===0) {
        return res.status(404).json({message: "No users found"});
      }

      res.status(200).json(users);
    }catch (error) {
        res.status(500).json({
            message:"Error frtching users",
        });

    }

 };

 //user by id 
 export const getProfile = async (req, res) => {
    try{
        const id = req.user.userId;
        const user = await User.findById(id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json
    } catch (error) {
        res.status(500).json({
            message:"Error fetching user",
        });
    }
 };

 //update user
 export const updateProfile = async (req, res) => {
    try{
    const id = req.user.userId;
    const {name, email} = req.body;

    const user = await User.findById(id);

    if (!user){
        return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();
    res.status(200).json({
        message: "User update successfully",
        user,
    });
    } catch (error) {
        res.status(500).json({
            message: "Error updating user",
        });
    }
 };

 //delete user
 export const deleteProfile = async (req, res) => {
    try {
        const id = req.user.userId;
        console.log("User ID froom token:", id);

        const user = await User.findByIdAndDelete(id);

        if(!user) {
            return res.status(404).json({ mssage: "User not found"});
        }

        res.status(200).json({ message:"User deleted successfully"});
    } catch (error) {
        res.status(500).json({
            message: error.message || " Error deleting user",
        });
        console.log(" Error detail:", error);
    }
 };
