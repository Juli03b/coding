const { json } = require("body-parser");
const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const User = require("../models/user");
const {ensureCorrectUser, ensureLoggedIn} = require("../middleware/auth");
const Message = require("../models/message");

/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/

router.get("/", ensureLoggedIn, async (req, res, next) => {
    try {
        const users = await User.all();

        return res.json({users: users}); 
    } catch (e) {
        return next(e);
    }
});

/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/

router.get("/:username", ensureCorrectUser, async (req, res, next) => {
    try {
        const {username} = req.params;
        const user = await User.get(username);

        return res.json({user: user});
    } catch (e) {
        return next(e);
    }
})

/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

router.get("/:username/to", ensureCorrectUser, async (req, res, next) => {
    try {
        const {username} = req.params;
        const messages = await User.messagesFrom(username);

        return res.json({messages: messages});
    } catch (e) {
        return next(e);
    }
});

/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

router.get("/:username/from", ensureCorrectUser, async (req, res, next) => {
   try {
       const {username} = req.params;
       const messages = await User.messagesTo(username);
       return res.json({messages: messages});
   } catch (e) {
       return next(e);
   }
});

module.exports = router;