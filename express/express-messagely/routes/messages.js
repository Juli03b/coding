const express = require("express");
const router = new express.Router();
const Message = require("../models/message");
const {ensureCorrectUser, ensureLoggedIn} = require("../middleware/auth");
const ExpressError = require("../expressError");


/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/

router.get("/:id", ensureCorrectUser, async (req, res, next) => {
    try {
        const id = req.params;
        const message = await message.get(id);

        return res.json({message});
    } catch (e) {
        return next(e);
    }
});

/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/

router.post("/", ensureLoggedIn, async (req, res, next) => {
    try {
        const {to_username, body} = req.body;
        
        const from_username = req.user.username;
        const message = await Message.create({from_username, to_username, body});

        return res.json({message: message});
    } catch (e) {
        return next(e);
    }
});

/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/

router.post("/:id/read", ensureLoggedIn, async (req, res, next) => {
    try {
        const {id} = req.params;
        const message = await Message.get(id);

        if(req.user.username !== message.to_user.username){
            throw new ExpressError("you are not authorized", 403);
        }

        const messageRead = await Message.markRead(id);

        return res.json({message: messageRead});
    } catch (e) {
        return next(e);
    }
});

module.exports = router;