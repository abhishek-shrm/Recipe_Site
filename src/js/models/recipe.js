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

  parseIngredients(){
    const unitsLong=['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups','pounds'];
      const unitsShort=['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];
    const newIngredients=this.ingredients.map((element)=>{
      //Uniform units
      let ingredient=element.toLowerCase();
        // replaces element in array
      unitsLong.forEach((unit,i)=>{
        ingredient=ingredient.replace(unit,unitsShort[i]);
      });
      //remove parenthesis
      ingredient=ingredient.replace(/ *\([^)]*\) */g, ' ');
      //parse ingredients into count,unit,ingredient
      const arrIngredient=ingredient.split(' ');
       //we used findIndex() because we don't know what we want to find
      const unitIndex=arrIngredient.findIndex(element2=>{
        unitsShort.includes(element2);
      });
      let objIngredient;
      if(unitIndex>-1){
        //there is a unit
        const arrCount=arrIngredient.slice(0,unitIndex);//separates the number out of ingredient
        let count;
        if(arrCount.length===1){
          count=eval(arrIngredient[0].replace('-','+'));
        }
        else{
          //eval() evaluates the string eg:4+1/2-->4.5
          count=eval(arrIngredient.slice(0,unitIndex).join('+'));
        }

        objIngredient={
          count,
          unit:arrIngredient[unitIndex],
          ingredient:arrIngredient.slice(unitIndex+1).join(' ')
        }
      }else if(unitIndex==-1){
        //there is no unit
        objIngredient={
          count:1,
          unit:'',
          ingredient
        }
      }else if(parseInt(arrIngredient[0],10)){
        //there is no unit, but 1st element is number
        objIngredient={
          count:parseInt(arrIngredient[0],10),
          unit:'',
          ingredient:arrIngredient.slice(1).join(' ')
        }
      }
      return objIngredient;
    });
    this.ingredients=newIngredients;
  }
}