const ExpressError = require("../expressError")
const express = require("express");
const router = new express.Router();
const db = require("../db");
const slugify = require("slugify")

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
        let { code } = req.params;
        code = slugify(code);
        const query = await db.query("SELECT code, name, industry_code, description FROM companies WHERE code = $1", [code]);

        if (!query.rows.length){
            throw new ExpressError("Company not found!", 404);
        }
        
        const invoiceQuery = await db.query("SELECT * FROM invoices WHERE comp_code = $1;", [query.rows[0].code]);
        
        query.rows[0].invoices = invoiceQuery.rows;

        return res.json({company: query.rows[0]});
    } catch (e) {

        return next(e);
    }
});

router.post("/" , async (req, res, next) => {
    try{
        let { code, name, industry_code,description } = req.body;
        code = slugify(code);
        const result = await db.query(
            `INSERT INTO companies (code, name, industry_code, description) 
            VALUES ($1, $2, $3, $4) 
            RETURNING code, name, industry_code, description`,
         [code, name, industry_code, description]);

        return res.status(201).json({company: result.rows[0]});
    }catch (e){
        return next(e);
    }
});

router.put("/:code" , async (req, res, next) => {
    try{
        let { code } = req.params;
        code = slugify(code);
        const { name, description } = req.body;
        const result = await db.query(
            `UPDATE companies
             SET name = $2, description = $3
             WHERE code = $1
             RETURNING code, name, description;`,
         [code, name, description]);
        
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
        let { code } = req.params;
        code = slugify(code);
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