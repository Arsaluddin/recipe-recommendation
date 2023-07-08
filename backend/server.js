const express = require('express');
const body = require('body-parser');
const axios = require('axios');
const EdamamApiClient = require('edamam-api');
const cors = require('cors');


const app = express();
app.use(express.json());

app.use(cors())



app.get('/', (req, res) => {
    // const { q } = req.query; // Search query from the frontend (optional)
    const { q } = req.query; 
    // Make a request to the Edamam API
    axios.get('https://api.edamam.com/search', {
      params: {
        q: q || 'recipe', // Use the search query if provided, otherwise default to 'recipe'
        app_id: '948beb25',
        app_key: 'f08715f706df82289cad8488e53129f7',
      },
    })
      .then(response => {
         
        const recipes = response.data.hits.map(hit => ({
          id: hit.recipe.uri,
          title: hit.recipe.label,
          calories: hit.recipe.calories,
          image: hit.recipe.image+'',
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