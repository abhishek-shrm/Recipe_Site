import axios from 'axios';
async function getResults(query){
  const key='8c0abafa984910e38d70a9da2a67ebde';
  try{
  const result= await axios(`https://www.food2fork.com/api/search?key=${key}&q=${query}`);
  const recipes=result.data.recipes;
  console.log(recipes);
  } catch(error){
    alert(error);
  }
}
getResults('pizza');