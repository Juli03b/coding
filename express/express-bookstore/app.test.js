process.env.NODE_ENV = "test";
const app = require("./app");
const db = require("./db");
const client = require("supertest");
const Book = require("./models/book");
const bookData = {
    "isbn": "0691161518",
    "amazon_url": "http://a.co/eobPtX2",
    "author": "Matthew Lane",
    "language": "english",
    "pages": 264,
    "publisher": "Princeton University Press",
    "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
    "year": 2017
}
const bookData2 = {
    "isbn": "99928332",
    "amazon_url": "http://a.co/fakebook",
    "author": "MURKSUker",
    "language": "english",
    "pages": 1,
    "publisher": "fakebook",
    "title": "REal book",
    "year": 1393
}
let book;

beforeEach(async () => {
    book = await Book.create(bookData);
});

afterEach(async () => {
    await db.query("DELETE FROM books");
})

describe('GET /books', () => {
    test('GET /books', async () => {
        const res = await client(app).get(`/books`);

        expect(res.body).toEqual({books: [book]})
        expect(res.statusCode).toBe(200);
    });
    
    test('GET /books/:id', async () => {
        const res = await client(app).get(`/books/${bookData["isbn"]}`);

        expect(res.body).toEqual({book: book});
        expect(res.statusCode).toBe(200);
    });

    test('GET /books/:id (wrong id)', async () => {
        const res = await client(app).get(`/books/NOTTRU3`);

        expect(res.statusCode).toBe(404);
    });
});

describe('POST /books', () => {
    test('POST /books', async () => {
        const res = await client(app).post(`/books`).send(bookData2);

        expect(res.body).toEqual({book: bookData2});
        expect(res.statusCode).toBe(201);
    });

    test('POST /books (invalid data)', async () => {
        bookData2["isbn"] = 323;
        delete bookData2["author"];
        const res = await client(app).post(`/books`).send(bookData2);

        expect(res.body).toEqual({
          error: {
            message: [
              'instance requires property "author"',
              'instance.isbn is not of a type(s) string'
            ],
            status: 400
          },
          message: [
            'instance requires property "author"',
            'instance.isbn is not of a type(s) string'
          ]
        });
        expect(res.statusCode).toBe(400);
    });
});


describe('PUT /books', () => {
    test('PUT /books', async () => {
        bookData2["author"] = bookData["author"]
        bookData2["isbn"] = bookData["isbn"]

        const res = await client(app).put(`/books/${book["isbn"]}`).send(bookData2);

        expect(res.body).toEqual({book: bookData2});
        expect(res.statusCode).toBe(200);
    });

    test('PUT /books (wrong id)', async () => {
        bookData2["author"] = bookData["author"]
        bookData2["isbn"] = bookData["isbn"]

        const res = await client(app).put(`/books/11111111`).send(bookData2);

        expect(res.statusCode).toBe(404);
    });
});


describe('DELETE /books', () => {
    test('DELETE /books/:id', async () => {
        const res = await client(app).delete(`/books/${bookData["isbn"]}`);

        expect(res.body).toEqual({message: "Book deleted"});
        expect(res.statusCode).toBe(200);
    });

    test('DELETE /books/:id (wrong id)', async () => {
        const wrongId = 111112111;
        const res = await client(app).delete(`/books/${wrongId}}`);

        expect(res.statusCode).toBe(404);
    });
});
    

afterAll(async () => await db.end());