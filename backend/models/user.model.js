const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: String,
        surname: String,
        email: {type: String, unique: true},
        password: {type: String, required: true},
        image: String,
        following: [{type: mongoose.Types.ObjectId, ref: "User"}],
        followers: [{type: mongoose.Types.ObjectId, ref: "User"}],
        userType: String,
        fieldsOfActivity: [{type: String}],
        companyType: String,
        commercialTitle: String,
        city: String,
        town: String,
        address: String,
        tcNo: String,
        phone: String,
        rate: [
            {
                
                ratedBy: {type: mongoose.Types.ObjectId, ref: "User"},
                rate: String,
                comment: String,
            }
        ],
    },
    {timestamps: true}
);
module.exports = mongoose.model("User", userSchema);
