const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const router = require('express').Router();
const CryptoJS = require('crypto-js');
const User = require('../models/User');

// update user
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET_KEY).toString(); 
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, 
            { $set: req.body }, 
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});


// delete user
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("The user has been deleted.");
    } catch (err) {
        res.status(500).json(err);
    }
});


// get user
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id); 

        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});


// get all users
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const users = query ? await User.find().sort({ createdAt: -1 }).limit(5) : await User.find();

        const infoOnly = users.map(user => {
            const { password, ...others } = user._doc;
            return others;
        });
    
        res.status(200).json(infoOnly);
    } catch (err) {
        res.status(500).json(err);
    }
});


// get user stats
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const stats = await User.aggregate([
            {
                $match: { 
                    createdAt: { $gte: lastYear } 
                },
            },
            {
                $project: { 
                    month: { $month: "$createdAt" } 
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(stats);
    } catch (err) {
        res.status(500).json(err);
    }
});


// create a user
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const password = CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET_KEY);
    const newUser = new User({ ...req.body, password });

    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;