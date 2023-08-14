import React from "react";
import {Card, Typography, Divider, Stack, styled, CardActionArea} from "@mui/material";
import {Link} from "react-router-dom";
import Rating from '@mui/material/Rating';



const RecipeCard = ({recipe}) => {
    const RecipeCard = styled(Card)(() => ({                                //recipe card styling
        backgroundColor: "#eeeeee",
        color: "black",
        margin: "5px",
        width: "100%",
        height: "300px",
        outline: "black",
        transition: "transform 0.15s ease-in-out",
        "&:hover": { transform: "scale(1.03, 1.03)" },
      }));

    return(                                                                        //recipe card object
        <RecipeCard variant="outlined">
            <CardActionArea component={Link} to={`/recipes/${recipe._id}`}>
            <h1>{recipe.name}</h1>
            <Divider sx={{ borderBottomWidth: 2, backgroundColor: "black"}}/>
            <Stack direction='row' spacing={1}>
                <img src={recipe.base64Img} alt={recipe.name} height="220px" width="50%"></img>
                <Stack spacing={6} sx={{alignItems: "start"}}>
                    <Typography variant="h6">Servings: {recipe.servings}</Typography>
                    <Typography variant="h6">Time: {recipe.time}</Typography>
                    <div>
                        <Typography textAlign="left" variant="h6">Rating:</Typography>
                        <Rating value={recipe.rating} readOnly></Rating>
                    </div>
            </Stack>
            </Stack>
            </CardActionArea>
        </RecipeCard>);
}

export default RecipeCard;