import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements,renderLoader,removeLoader,elementStrings} from './views/base';
/*Global State conatining:
  Search object
  Current recipe object
  shopping list object
  liked recipe object*/

const state={};

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
    await state.search.getResults();
    //render result on UI
    removeLoader();
    searchView.renderResult(state.search.recipes);
  }
}

elements.searchSubmit.addEventListener('submit',(element)=>{
  element.preventDefault();
  controlSearch();
});

