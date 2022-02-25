const User = require("../models/user.model");
const bcrypt = require("bcrypt");
exports.getSession = async (req, res) => {
    try {
        console.log(req.session.user)
        req.session.user = await User.findById(req.session.user._id);

    } catch (e) {
        res.json("Something went wrong!").status(500);
    }
    res.json(req.session);
};
exports.getStores = async (req, res) => {
    try {
        const result = await User.find({companyType: "2"});
        res.json(result);
    } catch (e) {
        res.json("Something went wrong!").status(500);
    }
}
exports.changeRating = async (req, res) => {
    const {targetId, rate} = req.body;
    console.log(rate)
    const {session} = req;
    try {
        const result = await User.findById(targetId);
        if (result.rate.length > 0) {
            await User.findByIdAndUpdate(targetId, {
                $pull: {
                    rate: {ratedBy: session.user._id}
                }
            });
        }
        await User.findByIdAndUpdate(targetId, {

            $push: {
                rate: {ratedBy: session.user._id, rate}
            }
        });

        res.json("Rated!");
    } catch (e) {
        console.log(e)
        res.json("Something went wrong!").status(500);
    }

}
exports.searchUsers = async (req, res) => {
    const {keyword} = req.body;

    try {
        const users = await User.aggregate([{
            "$match": {
                "name": {
                    $regex: '.*' + keyword + ".*",
                    $options: 'i'
                }
            }
        }, {$sort: {"createdTime": -1}}])
        console.log(users)
        res.json(users)
    } catch (e) {
        console.log(e);
        res.json("Something went wrong!").status(500);
    }
}
exports.followUser = async (req, res) => {
    const user = req.session.user;

    if (req.body.targetId) {
        try {
            await User.find({
                _id: req.session.user._id,
                following: {$in: req.body.targetId},
            }).then((userChecker) => {
                if (userChecker[0]) {
                    res.json("User is already followed!");
                } else {
                    User.findByIdAndUpdate(user._id, {
                        $push: {following: req.body.targetId},
                    })
                        .then(() => {
                            res.json("User is followed!");
                            req.session.user.following.add(targetId)
                        })
                        .catch((err) => {
                            res.json("Something went wrong!");
                            console.log(err);
                        });
                    User.findByIdAndUpdate(req.body.targetId, {
                        followers: {
                            $push: req.session.user._id,
                        }
                    }).then().catch()
                }
            });
        } catch (e) {
            console.log(e)
            res.json("Something went wrong!").status(500);
        }
    } else {
        res.json("Target Id didnt come!");
    }
};
exports.unFollowUser = async (req, res) => {
    const {user} = req.session;
    const {targetId} = req.body;

    if (!targetId) {
        res.json("Target id is missing")
    }
    try {
        await User.findByIdAndUpdate(user._id, {
            $pull: {
                following: targetId
            }
        })
        await User.findByIdAndUpdate(targetId, {
            $pull: {
                followers: req.session.user._id
            }
        })
        res.json("User is unfollowed")
    } catch (e) {
        res.json("Something went wrong!").status(500);
    }
};
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("following followers", "-password");

        user.rate.map((rate) => {
            if (req.session.user._id == rate.ratedBy) {
                return rate
            }

        })

        res.json(user);
    } catch (err) {
        res.json("Something went wrong!").status(500);
        console.log(err);
    }
};
exports.postRegister = async (req, res) => {
    const body = req.body;
    const name = body.name;
    const surname = body.surname;
    const email = body.email;
    const password = body.password;
    const image = req.file.filename;
    const userType = body.userType;
    const fieldsOfActivity = body.fieldsOfActivity;
    const companyType = body.companyType;
    const commercialTitle = body.commercialTitle;
    const city = body.city;
    const town = body.town;
    const address = body.address;
    const tcNo = body.tcNo;
    const landPhone = body.landPhone;

    if (userType === "1") {
        User.findOne({email})
            .then((isSuccess) => {
                if (isSuccess) {
                    res.json("User exists!");
                }
            })
            .catch((err) => console.log(err));
        const user = new User({
            name,
            surname,
            email,
            password,
            image,
            userType,
        });
        user
            .save()
            .then(() => res.json("User is registered"))
            .catch((err) => {
                console.log(err);
                res.json("Something went wrong!");
            });
    } else {
        User.findOne({email})
            .then((isSuccess) => {
                if (isSuccess) {
                    res.json("User exists!");
                }
            })
            .catch((err) => console.log(err));
        const user = new User({
            name,
            surname,
            email,
            password,
            image,
            fieldsOfActivity,
            companyType,
            commercialTitle,
            city,
            town,
            address,
            tcNo,
            landPhone,
            rate: {}
        });
        user
            .save()
            .then(() => res.json("User is registered"))
            .catch((err) => {
                console.log(err);
                res.json("Something went wrong!").status(500);
            });
    }
};
exports.postLogin = (req, res) => {
    //Burda yetki verilecek!
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then((user) => {
            if (user && String(password) == user.password) {
                req.session.user = user;
                req.session.isAuthenticated = true;
                return req.session.save(function (err) {
                    if (err) {
                        console.log(err);
                    }
                    res.json("User is logged!");
                });
            }
            res.json("Something went wrong!").status(500);
        })

        .catch((err) => console.log(err));
};
exports.getLogout = (req, res) => {
    req.session.destroy(function (err) {
        if (err) console.log(err);

        res.json("Logged out");
    });
};
