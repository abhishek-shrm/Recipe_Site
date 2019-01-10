import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements,renderLoader,removeLoader,elementStrings} from './views/base';
import Recipe from './models/recipe';
/*Global State conatining:
  Search object
  Current recipe object
  shopping list object
  liked recipe object*/

const state={};

// Search Controller

const controlSearch=async ()=>{
  //get search query from view
  const query=searchView.getInput();
  console.log(query);
  if(query){
    //new search object and add to state
    state.search=new Search(query);
    //loading spinner and clear previous result
    searchView.clearInput();
    searchView.clearResult();
    renderLoader(elements.searchRes);
    //search for recipes
    try{
    await state.search.getResults();
    //render result on UI
    removeLoader();
    searchView.renderResult(state.search.recipes);
    }catch(error){
      alert('Something wrong with search!!!');
      removeLoader();
    }
  }
}

elements.searchSubmit.addEventListener('submit',(element)=>{
  element.preventDefault();
  controlSearch();
});

elements.searchResultPages.addEventListener('click',(e)=>{
  const btn=e.target.closest('.btn-inline');
  if(btn){
    const goToPage=parseInt(btn.dataset.goto,10);
    searchView.clearResult();
    searchView.renderResult(state.search.recipes,goToPage);
  }
});

// Recipe Controller

const controlRecipe=async ()=>{
  //for accessing ID in the url
  const id=window.location.hash.replace('#','');
  console.log(id);
  if(id){
    //preparing UI for changes

    //create new recipe object
    state.recipe=new Recipe(id);
    //get recipe data
    try{
    await state.recipe.getRecipe();
    state.recipe.parseIngredients();
    //calculate servings and time
    state.recipe.calcTime();
    state.recipe.calcServings();
    //render the recipe
    console.log(state.recipe);
    }catch(error){
      alert('Error! in processing recipe');
    }
  }
};

// multiple event listeners in same line
['hashchange','load'].forEach((event)=>{
  window.addEventListener(event,controlRecipe);
});