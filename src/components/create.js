import React, { useState } from "react";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from 'uuid';
import {TextField } from "@mui/material";
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function Create() {

 const navigate = useNavigate();
 const [ingredientFields, setIngredientFields] = useState([
  {  id: uuidv4(), ingredient: "", amount: "", measurement: ""},
 ]);

 const [form, setForm] = useState({
  name: "",
  servings: "",
  time: "",
  rating: "",
  base64Img: "",
  ingredients: ingredientFields,
  instructions: "",
});

 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }

 const handleIngredientInput = (id,event) => {
  const newIngredientFields = ingredientFields.map(i => {
    if(id === i.id) {
      i[event.target.name] = event.target.value
    }
    return i;
  })
  setIngredientFields(newIngredientFields);
  setForm({
    ...form,
    ingredients:  ingredientFields});
  console.log(form);
 }
 const handleAddIngredient = () => {
  setIngredientFields([...ingredientFields, { id: uuidv4(),ingredient: "", amount: "", measurement: ""}])

 }

 const handleRemoveIngredient = (index) => {
  if(index !== 0) {
    const values = [...ingredientFields];
    values.splice(index,1)
    setIngredientFields(values);
    updateForm(values);
  }
 }
 const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  const base64 = await convertToBase64(file);

  updateForm( { base64Img: base64 });

 }

 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newRecipe = { ...form };
   await fetch("https://recipez.onrender.com/record", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newRecipe),
   })
   .catch(error => {
     window.alert(error);
     return;
   });

   setForm({ id: uuidv4(), name: "", servings: "", time: "", rating: "", base64img: "" });
   navigate("/");
 }

 // This following section will display the form that takes the input from the user.
 return (
   <Stack sx={{ml: -1, mr: -1}} paddingTop='75px' paddingLeft="5%" alignItems='center' color={"text.primary"} bgcolor={"background.default"}>
     <h1>Create New Recipe</h1>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <TextField
           required
           sx={{mt:"1%"}}
           label="Recipe Name"
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>

       <div className="form-group">
         <TextField
           required
           sx={{mt:"1%"}}
           label="Servings"
           type="text"
           className="form-control"
           id="servings"
           value={form.servings}
           onChange={(e) => updateForm({ servings: e.target.value })}
         />
       </div>
       <div className="form-group">
         <TextField
           required
           sx={{mt:"1%"}}
           label="Time ex: 30 minutes"
           type="text"
           className="form-control"
           id="time"
           value={form.time}
           onChange={(e) => updateForm({ time: e.target.value })}
         />
       </div>
       <div className="form-group">
       <Typography component="legend">Rating</Typography>
         <Rating
           required
           sx={{mt:"1%"}}
           size="large"
           precision={0.5}
           label="Rating(0-10)"
           type="text"
           className="form-control"
           id="rating"
           value={form.rating}
           onChange={(e) => updateForm({ rating: e.target.value })}
         />
       </div>
       <div>
       { ingredientFields.map(ingredientField => (
         <Stack>
          <div key={ingredientField.id}>
            <TextField
             required
             sx={{mt:"1%", mr:"0.5%", maxWidth:{sm:"20%", lg:"34%"}}}
             label="Ingredient Name"
             type="text"
             className="form-control"
             name="ingredient"
             value={ingredientField.ingredient}
             onChange={(e) => handleIngredientInput(ingredientField.id,e)}
             />
            <TextField
             required
             sx={{mt:"1%", mr:"0.5%", maxWidth:{sm:"20%", lg:"33%"}}}
             label="Amount"
             type="text"
             className="form-control"
             name="amount"
             value={ingredientField.amount}
             onChange={(e) => handleIngredientInput(ingredientField.id,e)}
             />
            <TextField
             required
             sx={{mt:"1%", mr:"0.5%", maxWidth:{sm:"20%", lg:"32%"}}}
             label="Measurement (ex: lb)"
             type="text"
             className="form-control"
             name="measurement"
             value={ingredientField.measurement}
             onChange={(e) => handleIngredientInput(ingredientField.id,e)}
             />
          </div>
          <div>
            <Button variant="contained" type="button" sx={{mt:"1%", width:"33%"}} onClick={() => handleAddIngredient()}>
              + Add Ingredient
            </Button>
            <Button variant="contained" startIcon={<DeleteIcon />} disabled={ingredientFields.length === 1} onClick={() => handleRemoveIngredient()} sx={{backgroundColor:"#660001",mt:"1%", width:"33%"}}>
              Remove Ingredient
            </Button>
          </div>
         </Stack>
          ))}
       </div>
       <div className="form-group">
        <TextField
          required
          label="Recipe Instructions"
          sx={{mt:"1%",width:"75%"}}
          multiline
          minRows={20}
          name="instructions"
          maxLength={200}
          value={form.instructions}
          onChange={(e) => updateForm({ instructions: e.target.value })}
        />
       </div>
       <div className="form-group">
         <Button component="label" variant="contained" sx={{mt: "1%",width: "25%"}}>
          Upload Image
          <input
            hidden
            type="file"
            className="form-control"
            id="file-upload"
            accept=".jpeg, .png, .jpg"
            onChange={(e) => handleFileUpload(e)}
          />
         </Button>
       </div>
       <div className="form-group">
         <Button
           variant="contained"
           type="submit"
           value="Create Recipe"
           endIcon={<SendIcon />}
           sx={{mt:"1%",width: "25%"}}
         >
          Submit Recipe
         </Button>
       </div>


     </form>
   </Stack>
 );
}

function convertToBase64(file){
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };

    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}