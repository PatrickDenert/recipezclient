import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";



const Recipe = (props) => (
 <tr>
   <td>{props.recipe.name}</td>
   <td>{props.recipe.servings}</td>
   <td>{props.recipe.time}</td>
   <td>{props.recipe.rating}</td>
   <td><img src={`data:image/png;${props.recipe.base64Img}`} alt="Recipe" /></td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.recipe._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteRecipe(props.recipe._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);

export default function RecipeList() {
 const [recipes, setRecipes] = useState([]);

 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecipes() {
     const response = await fetch(`http://localhost:5050/record/`);

     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }

     const recipes = await response.json();
     setRecipes(recipes);
   }

   getRecipes();

   return;
 }, [recipes.length]);

 // This method will delete a record
 async function deleteRecipe(id) {
   await fetch(`http://localhost:5050/record/${id}`, {
     method: "DELETE"
   });

   const newRecipes = recipes.filter((el) => el._id !== id);
   setRecipes(newRecipes);
 }

 // This method will map out the records on the table
 function recipeList() {
   return recipes.map((recipe) => {
     return (
       <Recipe
         recipe={recipe}
         deleteRecipe={() => deleteRecipe(recipe._id)}
         key={recipe._id}
       />
     );
   });
 }

 // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>Recipe List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Name</th>
           <th>Servings</th>
           <th>Time</th>
           <th>Rating</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody >{recipeList()}</tbody>
     </table>
   </div>
 );
}