const express = require('express');
const app = express();

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

// 1
app.get('/greeting/:username', (req, res) => {
    return res.send(`What\'s up ${req.params.username}!`);
});

// 2
app.get('/roll/:number', (req, res) => {
    const reqNumber = req.params.number;
    if (isNaN(reqNumber) === true) {
        return res.json ({
            message: 'You must specify a number'
        })
    } else {
        function random (x) {
            return Math.floor(Math.random() * x);
        }
        return res.json ({
            message: `You rolled a ${random(reqNumber)}`
        })
    }
});

// 3
app.get('/collectibles/:index', (req, res) => {

    const inputIdx = req.params.index;
    if (inputIdx < 3) {
        return res.send('name: ' + collectibles[inputIdx].name + '<br> price: ' + collectibles[inputIdx].price);
    } else {
        return res.send('This item is not yet in stock. Check back soon!');
    }    
});

//req.query
// 4
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];
app.get('/shoes', (req, res) => {
    const noParams = Object.keys(req.query).length;
    if (noParams === 0) { 
        res.send(shoes);
    } 
    if (req.query['max-price']) {
        const maxPriceShoes = shoes.filter((s) => s.price < req.query['max-price']);
        res.send(maxPriceShoes);
    }
    if (req.query['min-price']) {
        const minPriceShoes = shoes.filter((s) => s.price > req.query['min-price']);
        res.send(minPriceShoes);
    }
    if (req.query.type) {
        const typeShoes = shoes.filter((s) => s.type === req.query.type);
        res.send(typeShoes);
    }
});

app.get('/', (req, res) => {
    res.send('<h1>Running on 8000</h1>');
});

app.listen(8000, (req, res) => {});