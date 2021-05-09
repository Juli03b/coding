const ExpressError = require("../expressError")
const express = require("express");
const router = new express.Router();
const db = require("../db");

router.get("/", async (req, res, next) => {
    try {
        const query = await db.query("SELECT code, name FROM companies;");
        
        if (!query.rows.length){
            throw new ExpressError("Company not found!", 404);
        }

        return res.json({companies: query.rows});
    } catch (e) {

        return next(e);
    }
});

router.get("/:code", async (req, res, next) => {
    try {
        const { code } = req.params
        const query = await db.query("SELECT code, name, description FROM companies WHERE code = $1", [code]);
        const invoiceQuery = await db.query("SELECT * FROM invoices WHERE comp_code = $1;", [query.rows[0].code]);
        
        query.rows[0].invoices = invoiceQuery.rows

        if (!query.rows.length){
            throw new ExpressError("Company not found!", 404);
        }

        return res.json({company: query.rows[0]});
    } catch (e) {

        return next(e);
    }
});

router.post("/" , async (req, res, next) => {
    try{
        const { code, name, description } = req.body;
        const result = await db.query(
            `INSERT INTO companies (code, name, description) 
            VALUES ($1, $2, $3) 
            RETURNING code, name, description`,
         [code, name, description]);

        return res.json({company: result.rows[0]});
    }catch (e){
        return next(e);
    }
});

router.put("/:code" , async (req, res, next) => {
    try{
        const { code } = req.params;
        const { code: newCode, name, description } = req.body;
        console.log(newCode, name, description)
        const result = await db.query(
            `UPDATE companies
             SET code = $2, name = $3, description = $4
             WHERE code = $1
             RETURNING code, name, description;`,
         [code, newCode, name, description]);
        
        if (!result.rows.length){
            throw new ExpressError("Company not found!", 404);
        }

        return res.json({company: result.rows[0]});
    }catch (e){
        return next(e);
    }
});

router.delete("/:code", async (req, res, next) => {
    try{
        const { code } = req.params;
        const result = await db.query(
            `DELETE FROM companies 
            WHERE code = $1 
            RETURNING code;`, [code]);
        
        if (!result.rows.length){
            throw new ExpressError("Company not found!", 404);
        }

        return res.json({message: `${result.rows[0].code} Deleted!`});
    }catch (e){
        return next(e);
    }
})

module.exports = router;