import axios from 'axios';
export default class Search{
  constructor(query){
    this.query=query;
  }

  async getResults(){
   const key='8c0abafa984910e38d70a9da2a67ebde';
   try{
    const result= await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
    this.recipes=result.data.recipes;
    //console.log(this.recipes);
    } 
   catch(error){
     alert(error);
    }
  }
}
