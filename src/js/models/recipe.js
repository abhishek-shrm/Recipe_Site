import axios from 'axios';

export default class Recipe{
  constructor(id){
    this.id=id;
  }
  async getRecipe(){
    const key='8c0abafa984910e38d70a9da2a67ebde';
    try{
      const recipe= await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
      this.title=recipe.data.recipe.title;
      this.author=recipe.data.recipe.publisher;
      this.img=recipe.data.recipe.image_url;
      this.url=recipe.data.recipe.source_url;
      this.ingredients=recipe.data.recipe.ingredients;
    }catch(error){
      console.log(error);
      alert('Something went wrong!!');
    }
  }

  calcTime(){
    const numIngredients=this.ingredients.length;
    const periods=Math.ceil(numIngredients/3);
    this.time=periods*15;
  }

  calcServings(){
    this.servings=4;
  }
}