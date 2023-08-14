import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {Divider, Grid, Paper, Stack} from "@mui/material";
import Rating from '@mui/material/Rating';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


const RecipeDetails = () => {
    const [form, setForm] = useState({                              //store recipe from mongodb
        name: "",
        servings: "",
        time: "",
        rating: "",
        base64Img: "",
        ingredients: [{}],
      });

     const { _id } = useParams();                                   //get id from route
     const navigate = useNavigate();
    useEffect(() => {
    async function fetchData() {                                    //get recipe from mongodb
        const response = await fetch(`https://recipez-v63x.onrender.com/record/${_id.toString()}`);
        if (!response.ok) {
           const message = `An error has occurred: ${response.statusText}`;
           window.alert(message);
           return;
        }

        const recipe = await response.json();
        console.log("hello");
        if (!recipe) {
            window.alert(`Recipe with id ${_id} not found`);
           navigate("/recipes");
           return;
         }
         setForm(recipe);
         console.log(recipe);
       }
       fetchData();
       return;
    }, [_id, navigate]);
    return(
        <Stack sx={{ml: -1, mr: -1,}} paddingTop='75px' textAlign='center' color={"text.primary"} bgcolor={"background.default"} >
            <Stack sx={{mt: 3, ml: 5, mr: 5, border: 2, borderRadius: '16px'}} bgcolor={"action.selected"} >
            <h1>{form.name}</h1>
            <Divider sx={{ borderBottomWidth: 1, backgroundColor: "black", width: "33%", ml: "33%"}}/>
                <Grid container>
                    <Grid item xs={12} lg={4}><h2>Servings: {form.servings}</h2></Grid>
                    <Grid item xs={12} lg={4}><h2>Time: {form.time}</h2></Grid>
                    <Grid item xs={12} lg={4}><Grid><h2>Rating: {form.rating}/5</h2><Rating value={form.rating} readOnly></Rating></Grid></Grid>
                </Grid>
                <div sx={{textAlign: "center"}}><img src={form.base64Img} alt={form.name} height="400px" width="400px"></img></div>
                <h1>Ingredients </h1>
                <TableContainer component={Paper} sx={{width:"33%", margin:"auto"}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Ingredient</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Measurement</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {form.ingredients.map(ingredient => (
                                <TableRow>
                                    <TableCell>{ingredient.ingredient}</TableCell>
                                    <TableCell>{ingredient.amount}</TableCell>
                                    <TableCell>{ingredient.measurement}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <h1>Instructions </h1>
                <Table component={Paper} sx={{width:"33%", margin:"auto", textAlign: "justify"}}>
                    <pre>{form.instructions}</pre>
                </Table>
            </Stack>
        </Stack>
        );
}

export default RecipeDetails;