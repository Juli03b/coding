process.env.NODE_ENV = "test";

const app = require("./app");
const request = require("supertest");
const db = require("./db");
const e = require("express");

let company;
let invoice;

beforeEach(async () => {
    company = await db.query(
        `INSERT INTO companies (code, name, description) 
        VALUES ('mcd', 'McDonnalds', 'burger') 
        RETURNING code, name, description;`
    );
    company = company.rows[0];

    invoice = await db.query(
        `INSERT INTO invoices (comp_code, amt) 
        VALUES ('mcd', 422123) 
        RETURNING *;`
    );
    invoice = await db.query(
        `SELECT * FROM invoices WHERE id = $1`, [invoice.rows[0].id]
    );
    invoice = invoice.rows[0];
});

afterEach(async () => {
    await db.query(`DELETE FROM companies`);
});

afterAll(async () => {
    db.end();
});

describe('companies', function() {

    describe('GET /companies', function() {
        test('Return all companies', async () => {
            const res = await request(app).get("/companies");

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual({companies: [{code: company.code, name :company.name}]});
        });

        test('GET /companies/:code', async () => {
            const res = await request(app).get(`/companies/${company.code}`);

            company.invoices = [invoice];

            delete res.body.company.invoices[0].add_date;
            delete company.invoices[0].add_date;

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual({company: company});
        });

        test('404 Company not found', async () => {
            const res = await request(app).get(`/companies/notfound`);

            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual({error: { message: 'Company not found!', status: 404 }, message: 'Company not found!'});
        });
    });

    test('POST /companies', async () => {
        company = {code: "sam", name:"Samsung", description:"techmology"}
        const res = await request(app).post(`/companies`).send(company);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({company: company});
    });

    describe('PUT /companies', () => {
        test('PUT /companies', async () => {   
            const res = await request(app).put(`/companies/${company.code}`).send({ name:"Samsung", description:"techmology"});

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual({company: { code: 'mcd', name: 'Samsung', description: 'techmology' }});
        })

        test('404 Company not found', async () => {
            const res = await request(app).put(`/companies/notfound`);

            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual({error: { message: 'Company not found!', status: 404 }, message: 'Company not found!'});
        });
    });


    describe('DELETE /companies', function() {
        test('Delete a company', async () => {
            const res = await request(app).delete(`/companies/${company.code}`);
        
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual({message: `${company.code} Deleted!`});
        })

        test('404 Company not found', async () => {
            const res = await request(app).delete(`/companies/notfound`);

            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual({error: { message: 'Company not found!', status: 404 }, message: 'Company not found!'});
        });
    });
});

describe('Invoices', function() {

    describe('GET /invoices', function() {
        test('GET /invoices', async () => {
            const res = await request(app).get("/invoices");

            expect(res.statusCode).toEqual(200)
            expect(res.body).toEqual({invoices: [{id: expect.any(Number), comp_code: invoice.comp_code}]});
        });

        test('GET /invoices/:id', async () => {
            const res = await request(app).get(`/invoices/${invoice.id}`);
            invoice.company = company;

            delete res.body.invoice.add_date;
            delete invoice.add_date;

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual({invoice: invoice});
        });

        test('404 Invoice not found', async () => {
            const res = await request(app).get(`/invoices/101019911`);

            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual({error: { message: 'Invoice not found!', status: 404 }, message: 'Invoice not found!'});
        }); 
    });
    test('POST /invoices', async () => {
        const res = await request(app).post(`/invoices`).send({comp_code: company.code, amt: 444});

        expect(res.body).toEqual({invoice: {id:expect.any(Number), comp_code:company.code, amt:444, paid:false, add_date:expect.any(String), paid_date:null}});
    });

    test('PUT /invoices', async () => {
        const res = await request(app).put(`/invoices/${invoice.id}`).send({amt: 999});
        
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({invoice: {id:expect.any(Number), comp_code:company.code, amt:999, paid:false, add_date:expect.any(String), paid_date:null}});
    });

    test('DELETE /invoices/:id', async () => {
        const res = await request(app).delete(`/invoices/${invoice.id}`);
        
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: 'Deleted!' });
    });
});

