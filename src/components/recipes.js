import React, { useEffect, useState } from "react";
import {Stack, Grid} from "@mui/material";
import RecipeCard from "./recipecard";

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
   async function getRecipes() {
     const response = await fetch(`https://recipez-server-c8z1.onrender.com/record/`);           //get recipes from MongoDB

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

    return(
        <Stack sx={{ml: -1, mr: -1}} paddingTop='75px' textAlign='center' color={"text.primary"} bgcolor={"background.default"}>
            <h1>Recipes</h1>
            <Grid container spacing={2}>
                {recipes.map((recipe) => (
                    <Grid item xs={12} lg={4}>
                        <RecipeCard recipe={recipe}>
                        </RecipeCard>
                    </Grid>
                ))}
            </Grid>
        </Stack>
        );
}

export default Recipes;