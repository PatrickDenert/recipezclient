import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    name: "",
    servings: "",
    time: "",
    rating: "",
  });
 const params = useParams();
 const navigate = useNavigate();

 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5050/record/${params.id.toString()}`);

     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }

     const recipe = await response.json();
     if (!recipe) {
       window.alert(`Recipe with id ${id} not found`);
       navigate("/list");
       return;
     }

     setForm(recipe);
   }

   fetchData();

   return;
 }, [params.id, navigate]);

 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }

 async function onSubmit(e) {
   e.preventDefault();

   const editedRecipe = {
    name: form.name,
    servings: form.servings,
    time: form.time,
    rating: form.rating,
   };

   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5050/record/${params.id}`, {
     method: "PATCH",
     body: JSON.stringify(editedRecipe),
     headers: {
       'Content-Type': 'application/json'
     },
   });

   navigate("/list");
 }
 // This following section will display the form that takes input from the user to update the data.
 return (
  <div>
  <h3>Update Record</h3>
  <form onSubmit={onSubmit}>
    <div className="form-group">
      <label htmlFor="name">Name: </label>
      <input
        type="text"
        className="form-control"
        id="name"
        value={form.name}
        placeholder={form.name}
        onChange={(e) => updateForm({ name: e.target.value })}
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="servings">Servings: </label>
      <input
        type="text"
        className="form-control"
        id="position"
        value={form.servings}
        onChange={(e) => updateForm({ servings: e.target.value })}
        required
      />
    </div>
    <div className="form-group">
    <label htmlFor="time">Time: </label>
      <input
        type="text"
        className="form-control"
        id="time"
        value={form.time}
        onChange={(e) => updateForm({ time: e.target.value })}
        required
      />
    </div>
    <div className="form-group">
    <label htmlFor="rating">Rating: </label>
      <input
        type="text"
        className="form-control"
        id="rating"
        value={form.rating}
        onChange={(e) => updateForm({ rating: e.target.value })}
        required
      />
    </div>
    <br />

    <div className="form-group">
      <input
        type="submit"
        value="Update Record"
        className="btn btn-primary"
      />
    </div>
  </form>
</div>
 );

}

