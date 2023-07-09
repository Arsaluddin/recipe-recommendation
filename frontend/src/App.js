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
          <label>ingridients</label>
          <input type='text' value={query} onChange={(e) => setQuery(e.target.value)}></input>
          <button type='submit'>Submit</button>
        </form>
        
          { recipe && recipe.map((data,i) => (
           
            <div key={i}>
              
              <img src={data.image}/>
              <h5><h4>Recipe name</h4> {data.title}</h5>
              <h4>{data.calories}</h4>
            </div>
          ))}
        
        
    </div>
  );
}

export default App;
