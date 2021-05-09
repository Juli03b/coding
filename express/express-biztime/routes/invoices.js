const ExpressError = require("../expressError")
const express = require("express");
const router = new express.Router();
const db = require("../db");

router.get("/", async (req, res, next) => {
    try {
        const query = await db.query("SELECT id, comp_code FROM invoices;");
        
        if (!query.rows.length){
            throw new ExpressError("Invoice not found!", 404);
        }

        return res.json({invoices: query.rows});
    } catch (e) {
        return next(e);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params
        const invoiceQuery = await db.query("SELECT * FROM invoices WHERE id = $1;", [id]);
        const compQuery = await db.query("SELECT code, name, description FROM companies WHERE code = $1;", [invoiceQuery.rows[0].comp_code]);

        invoiceQuery.rows[0].company = compQuery.rows[0]

        if (!invoiceQuery.rows.length || !compQuery.rows.length){
            throw new ExpressError("Info not found!", 404);
        }

        return res.json({invoice: invoiceQuery.rows[0]});
    } catch (e) {

        return next(e);
    }
});

router.post("/" , async (req, res, next) => {
    try{
        const { comp_code, amt } = req.body;
        const result = await db.query(
            `INSERT INTO invoices (comp_code, amt) 
            VALUES ($1, $2) 
            RETURNING comp_code, amt`,
         [comp_code, amt]);

        return res.json({invoice: result.rows[0]});
    }catch (e){
        return next(e);
    }
});

router.put("/:id" , async (req, res, next) => {
    try{
        const { id } = req.params;
        const { amt } = req.body;
        const result = await db.query(
            `UPDATE invoices
             SET amt = $2
             WHERE id = $1
             RETURNING *;`,
         [id, amt]);
        
        if (!result.rows.length){
            throw new ExpressError("invoice not found!", 404);
        }

        return res.json({invoice: result.rows[0]});
    }catch (e){
        return next(e);
    }
});

router.delete("/:id", async (req, res, next) => {
    try{
        const { id } = req.params;
        const result = await db.query(
            `DELETE FROM invoices 
            WHERE id = $1 
            RETURNING id;`, [id]);
        
        if (!result.rows.length){
            throw new ExpressError("Invoice not found!", 404);
        }

        return res.json({message: `Deleted!`});
    }catch (e){
        return next(e);
    }
})

module.exports = router;