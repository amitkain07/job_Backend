import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        minlength: 3,
        maxlength: 40
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please provide a valid email'],
        unique: true // Note: Mongoose does not validate uniqueness automatically
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6 // No need for max length if storing hashed passwords
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

const User = mongoose.model("User", UserSchema);
export default User;
