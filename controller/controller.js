const { createToken } = require("../middleware/jsonwebtoken");
const UserModel = require("../model/user.Schema");
const bcrypt = require("bcrypt");

exports.loginpage = (req,res) => {
    try {
        res.render("loginpage");
    } catch (error) {
        res.status(404).send(error.message);
    }
}

exports.loginprocess =async (req,res) => {
    const validUser = await UserModel.findOne({ username: req.body.username });
    if (!validUser) {
         res.status(404).send("Invalid User");
    } else {
      if (validUser.password === req.body.password) {
        const token = createToken(validUser);
        res.cookie("token", token);
        return res.render("index"); // Redirect to the homepage or dashboard
      } else {
        return res.redirect('/');
      }
    }
}

exports.registrationpage = (req,res) => {
    try {
        res.render("registration");
    } catch (error) {
        res.status(404).send("Issue while redirecting to registration page");
    }
}

exports.createUser = async (req,res) => {
    try {
        const userexists = await UserModel.findOne({
            username : req.body.username,
            email : req.body.email
        });
        if(userexists) {
            res.status(400).send("User already exists");
        }
            const userData = await UserModel.create(req.body);
            console.log(userData);
            res.render("loginpage");
        } catch (error) {
        res.status(404).send("unable to create user");
    }
} 


exports.indexpage = (req,res) => {
    try {
        res.render("index");
    } catch (error) {
        res.send("error on index",error)
    }
}