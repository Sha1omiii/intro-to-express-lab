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
        return res.send(collectibles[inputIdx]);
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
    const typeShoes = [];
    const maxPriceShoes = [];
    const minPriceShoes = [];

    const noParams = Object.keys(req.query).length;
    if (noParams === 0) { 
        res.send(shoes);
    } 
    else {
        for (let j = 0; j < shoes.length; j++) {
            if (shoes[j].price > req.query.minprice) {
                minPriceShoes.push(shoes[j].name);
            }
            if (shoes[j].price < req.query.maxprice) {
                maxPriceShoes.push(shoes[j].name);
            }

            if (shoes[j].type === req.query.type) {
                typeShoes.push(shoes[j].name)
            }    
        }
        res.send(`shoes above ${req.query.minprice}: ` + minPriceShoes + 
            `\n shoes undre ${req.query.maxprice}: ` + maxPriceShoes +
            `\n ${req.query.type} type shoes: ` + typeShoes
        );
    }   
        

});


app.listen(8000, () => {
})