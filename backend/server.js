const express = require('express');
const body = require('body-parser');
const axios = require('axios');
const EdamamApiClient = require('edamam-api');
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config()


const app = express();
app.use(express.json());

app.use(cors())



app.get('/', (req, res) => {
    // const { q } = req.query; // Search query from the frontend (optional)
    const { q } = req.query; 
    // Make a request to the Edamam API
    axios.get(process.env.Api_url , {
      params: {
        q: q || 'recipe', // Use the search query if provided, otherwise default to 'recipe'
        app_id: process.env.app_id,
        app_key: process.env.app_key,
      },
    })
      .then(response => {
         
        const recipes = response.data.hits.map(hit => ({
          id: hit.recipe.uri,
          title: hit.recipe.label,
          calories: hit.recipe.calories,
          image: hit.recipe.image,
        }));
        // console.log(recipes[0].image)
        // res.json(recipes[0]);
        res.send(recipes)
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while fetching recipes' });
      });
  });



app.listen(9000,()=>{
    console.log("listening")
})