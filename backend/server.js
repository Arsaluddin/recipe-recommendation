const express = require('express');
const body = require('body-parser');
const axios = require('axios');
const EdamamApiClient = require('edamam-api');

const app = express();
app.use(express.json());

app.get('/',(req,res) => {
   const apiClient = new EdamamApiClient.RecipeSearchClient({
    appId : '948beb25',
    appKey: 'f08715f706df82289cad8488e53129f7',
   })
//    const ingridients = req.query.ingridients;
const ingridients = 'chicken';

   apiClient.search({
    query: ingridients,
   }).then((data) =>{
      console.log(data.recipe.image)
      res.json(data.hits)
   })
})



app.listen(9000,()=>{
    console.log("listening")
})