import {elements} from './base';

export const getInput=()=>elements.searchInput.value;

export const clearInput=()=>{
  elements.searchInput.value='';
};

export const clearResult=()=>{
  elements.searchResultList.innerHTML='';
  elements.searchResultPages.innerHTML='';
};
//for limiting length of the title
const limitRecipeTitle=(title,limit=17)=>{
  const newTitle=[];
  if(title.length>limit){
    title.split(' ').reduce((acc,cur)=>{
      if(acc+cur.length<=limit){
        newTitle.push(cur);
      }
      return acc+cur.length;
    },0);
    return `${newTitle.join(' ')}...`;
  }
  return title;
}
//displays recipe on the website
const renderRecipe=(recipe)=>{
  const markup=`
  <li>
  <a class="results__link results__link--active" href="#${recipe.recipe_id}">
      <figure class="results__fig">
          <img src="${recipe.image_url}" alt="Test">
      </figure>
      <div class="results__data">
          <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
          <p class="results__author">${recipe.publisher}</p>
      </div>
  </a>
</li>
  `;
  elements.searchResultList.insertAdjacentHTML('beforeend',markup);
};
//type:prev or next
const createButton=(page,type)=>`
<button class="btn-inline results__btn--${type}" data-goto=${type==='prev'?page-1:page+1}>
<svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${type==='prev'?'left':'right'}"></use>
</svg>
<span>Page ${type==='prev'?page-1:page+1}</span>
</button>
`;

const renderButtons=(page,numResult,resultPerPage)=>{
  const pages=Math.ceil(numResult/resultPerPage);
  let button;
  if(page===1&&pages>1){
    //button to go to next page
    button=createButton(page,'next');
  }
  else if(page<pages&&pages>1){
    //both buttons
    button=`${createButton(page,'prev')}
            ${createButton(page,'next')}`;
  }
  else if(page===pages && pages>1){
    //button to goto previous page
    button=createButton(page,'prev');
  }
  
  elements.searchResultPages.insertAdjacentHTML('afterbegin',button);
};

export const renderResult=(recipes,page=1,resultPerPage=10)=>{//render result of current page
  const start=(page-1)*resultPerPage;
  const end=page*resultPerPage;
  //slice doesn't include end
  recipes.slice(start,end).forEach(renderRecipe);
  //render pagination button
  renderButtons(page,recipes.length,resultPerPage);
};