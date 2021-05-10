const ExpressError = require("../expressError")
const express = require("express");
const router = new express.Router();
const db = require("../db");
const slugify = require("slugify")

router.get("/", async (req, res, next) => {
    try {
        const query = await db.query("SELECT * FROM industries;");
        
        return res.json({industries: query.rows});
    } catch (e) {
        return next(e);
    }
});

router.get("/:code", async (req, res, next) => {
    try {
        const { code } = req.params;
        const query = await db.query("SELECT * FROM industries WHERE code = $1;", [code]);
        
        return res.json({industry: query.rows});
    } catch (e) {
        return next(e);
    }
});

router.post("/" , async (req, res, next) => {
    try{
        let { code, name, description } = req.body;
        code = slugify(code);
        const result = await db.query(
            `INSERT INTO industries (code, name, description) 
            VALUES ($1, $2, $3)
            RETURNING code, name, description`,
         [code, name, description]);

        return res.status(201).json({industry: result.rows[0]});
    }catch (e){
        return next(e);
    }
});

module.exports = router;