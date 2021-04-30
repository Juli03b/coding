process.env.NODE_ENV = "test";

const request = require('supertest');
const app = require('./app');
const items = require('./fakeDb');

const item = {name: "banana", "price": 2.50};

beforeEach(function(){
    items.push(item);
});

afterEach(function(){
    items.length = 0;
});

describe('GET /items', () => {
    test('should get all items', async () => {
        const res = await request(app)
            .get('/items')

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(items);
    });

    test('should get one item', async () => {
        const res = await request(app)
            .get('/items/banana')
        const [item] = items

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(item);
    });
});
    
describe('POST /items', () => {
    test('should add item to list', async () => {
        const item = {name: "car", price: 150};
        const res = await request(app)
            .post('/items')
            .send(item);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({'added': item});
    });
});
    
describe('PATCH /items', () => {
    test(`should change item's price and price`, async () => {
        const item = {name: "apple", price: 255};
        const res = await request(app)
            .patch('/items/banana')
            .send(item);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({'updated': item});
    });
});
    