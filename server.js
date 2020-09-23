const express = require('express');
const bodyParser = require('body-parser');
const axios = require ('axios');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) =>{
    let url = 'https://api.coindesk.com/v1/bpi/currentprice/eur.json';
    let currency = req.body.currency;
    console.log(currency);
    axios.get(url)
    .then(function(response){
        let rate;
        if(currency === 'EUR'){
            rate = response.data.bpi.EUR.rate;
            code= response.data.bpi.EUR.rate;
        } else {
            rate = response.data.bpi.USD.rate;
            code = response.data.bpi.USD.rate;
        }
        let disclaimer = response.data.disclaimer;
        res.write(`<p>${rate} ${code}</p>`);
        res.write(`<p>${disclaimer}</p>`);
        res.send();
    })
    .catch(function(error){
        console.log(error);
    });

});

app.listen(3000, ()=>{
    console.log("server is running on port 3000");
});

