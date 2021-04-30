const items = require('./fakeDb');
const express = require('express');
const router = new express.Router();

router.get('/', (req, res) => {
    return res.json(items);
});

router.get('/:name', (req, res) => {
    let item;

    items.forEach((itm) => {
        if (itm.name === req.params.name){
            item = itm;
            return itm;
        }
    });

    return res.json(item)
});

router.post('/', (req, res) => {
    const item = req.body;
    items.push(item);

    return res.json({'added': item});
});

router.patch('/:name', (req, res) => {
    let item;
    const {name, price} = req.body

    items.forEach((itm, idx) => {
        if (itm.name === req.params.name){
            items[idx].name = name || itm.name;
            items[idx].price = price || itm.price;
            item = itm;

            return item;
        }
    });

    return res.json({'updated': item});
});

router.delete('/:name', (req, res) => {
    items.forEach((itm, idx) => {
        if (itm.name === req.params.name){
            items.splice(idx, 1)
            return itm;
        }
    });

    return res.json({'message': 'Deleted'});
});

module.exports = router;