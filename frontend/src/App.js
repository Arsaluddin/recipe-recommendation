import {useEffect,useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
 
const [recipe,setRecipe] = useState([]);
const [query,setQuery] = useState('');

//  useEffect(()=>{
//     fetchRecipes();
//  },[])

 const fetchRecipes = () => {
  axios
  .get('http://localhost:9000', {
    params: {
      q: query // Pass the query as a parameter in the API request
    }
  })
  .then((res) => {
    setRecipe(res.data);
  })
  .catch((error) => {
    console.log(error);
  });
 }

 const handleSubmit = (e) => {
     
     e.preventDefault();
     fetchRecipes();
 }


  return (
    <div className="App">
      <h1>Recipe Recommandation</h1>
        <form onSubmit={handleSubmit}>
          <label><h3>Enter the main ingridients</h3></label>
          <input type='text' value={query} onChange={(e) => setQuery(e.target.value)}></input>
          <button type='submit'>Get Recipe</button>
        </form>
        
          { recipe && recipe.map((data,i) => (
           
            <div className='Recipe' key={i}>
              
              <img src={data.image}/>
              
              <h5> Recipe Name : {data.title}</h5>
              <h4>Calories : {data.calories} Kcal</h4>
            </div>
          ))}
        
        
    </div>
  );
}

export default App;
