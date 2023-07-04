const express = require('express');
const body = require('body-parser');
const axios = require('axios');
const apikey = '';

const app = express();
app.use(express.json());





app.listen(9000,()=>{
    console.log("listening")
})