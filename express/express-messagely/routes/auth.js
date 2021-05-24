const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const ExpressError = require("../expressError");

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

router.post("/login", async (req, res, next) => {
    try {
        const {username, password} = req.body;
        if(username && password){
            if(!await User.authenticate(username, password)){
                throw new ExpressError("Invalid username/password", 400);
            }
        }else{
            throw new ExpressError("username and password required", 400)
        }
        
        const token = jwt.sign({username}, SECRET_KEY);
        await User.updateLoginTimestamp(user.username);

        return res.json(token);
    } catch (e) {
        return next(e);
    }
});

/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */

router.post("/register", async (req, res, next) => {
    try {
        const {username, password, first_name, last_name, phone} = req.body;
        const user = await User.register({username, password, first_name, last_name, phone});
        User.updateLoginTimestamp(username);
        const token = jwt.sign(user, SECRET_KEY);

        return res.json({token: token});
    } catch (e) {

        return next(e);
    }
});

module.exports = router;