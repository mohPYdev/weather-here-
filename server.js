const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
require('dotenv').config()

const { request, response } = require('express');
const app =  express();

//listens on port 
const port = process.env.PORT || 3000;
app.listen(port , () => { console.log('listening ... ')});

//specify the folder for the static files.
app.use(express.static('public'));
app.use(express.json({limit : '1mb'}));

//initializing the database
const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', async(request , response) => {
    database.find({} , {_id: 0} , (err , data) =>{
        if (err) throw err;
        response.json(data);
    });
});


app.post('/api' , (request , response) => {
    const data = request.body;
    database.insert(data);
    response.json({
        status : 'successfull',
    });
});


app.get('/weather/:latlon' , async (request , response) =>{
    const api_key = process.env.API_KEY_WEATHER;
    const latlon = request.params.latlon;
    const fetch_response = await fetch(`http://api.weatherstack.com/current?access_key=${api_key}&query=${latlon}`);
    const data = await fetch_response.json();
    response.json(data);
});

app.get('/coords/:ip' , async (request , response) =>{
    const api_key = process.env.API_KEY_COORDS;
    const ip = request.params.ip;
    const fetch_response = await fetch(`http://ipinfo.io/${ip}?token=${api_key}`);
    const data = await fetch_response.json();
    response.json(data);
});

