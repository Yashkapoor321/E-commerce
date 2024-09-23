const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true,
    },
    lastname : {
        type : String,
        required : true 
    },
    email : {
        type : String,
        required : true,
        unique : true 
    },
    mobileNo : {
        type : String,
        required : true,
        unique : true 
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        default : "user"
    }
}, {timestamps : true});

// hash password
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSaltSync(10);
     this.password = await bcrypt.hashSync(this.password, salt);
})
//compare password
userSchema.methods.isPasswordMatched = async function(enteredPassword) {
  return await bcrypt.compareSync(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;