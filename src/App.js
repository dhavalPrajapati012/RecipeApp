import React, { Component } from 'react'
import Recipe from './Recipe';
import "./App.css"

class App extends Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
      search: '',
      query: 'chicken'
    }
  }

  componentDidMount() {
    this.getRecipes();
  }

  getRecipes = async () => {
    let appId = "367284a8";
    let appKey = "b4b85fb4ada443bcc5772b9e5547ed11";
    let url = ''
    if (this.state.search) {
      url = `https://api.edamam.com/search?q=${this.state.search}&app_id=${appId}&app_key=${appKey}`
    } else {
      url = `https://api.edamam.com/search?q=${this.state.query}&app_id=${appId}&app_key=${appKey}`
    }
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      recipes: data.hits,
      search: ''
    })
  }

  updateSearch = (e) => {
    this.setState({ search: e.target.value })
  }

  render() {
    return (
      <div className="App">
        <form className="search-form">
          <input type="text" className="search-bar" value={this.state.search} onChange={(evt) => this.updateSearch(evt)} />
          <button type="button" className="search-button" onClick={() => this.getRecipes()} click={(e) => this.getSearch(e)}>Search</button>
        </form>
        <div className="recipes">
          {this.state.recipes.map(recipe => (
            <Recipe key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients} />
          ))}
        </div>
      </div>
    )
  }
}
export default App

// Function based Component  :

// const App = () => {
//   const appId = "367284a8";
//   const appKey = "b4b85fb4ada443bcc5772b9e5547ed11";


//   const [recipes, setRecipes] = useState([]);
//   const [search, setSearch] = useState('');
//   const [query, setQuery] = useState('chicken');

//   useEffect(async () => {
//     getRecipes();
//   }, [query]);

//   const getRecipes = async () => {
//     const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`);
//     const data = await response.json();
//     setRecipes(data.hits);
//   }

//   const updateSearch = e => {
//     setSearch(e.target.value)
//     console.log(search);
//   }

//   const getSearch = e => {
//     e.preventDefault();
//     setQuery(search);
//     setSearch('');
//   }

//   return (
//     <div className="App">
//       <form onSubmit={getSearch} className="search-form">
//         <input type="text" className="search-bar" value={search} onChange={updateSearch} />
//         <button type="submit" className="search-button">Search</button>
//       </form>
//       <div className="recipes">
//         {recipes.map(recipe => (
//           <Recipe key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients} />
//         ))}
//       </div>
//     </div>
//   )
// }
// export default App



