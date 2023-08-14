import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app

import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Home from "./components/home";
import Fridge from "./components/fridge";
import Recipes from "./components/recipes";
import About from "./components/about";
import SignIn from "./components/signin";
import Register from "./components/register";
import RecipeDetails from "./components/recipedetails";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";





const App = () => {
  const [mode, setMode] = React.useState("light");

  const main = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: '#1b5e20',
      },
      secondary: {
        main: '#f9e076',
      },
      error: {
        main: '#b71c1c',
      },
    },
    typography: {
      fontFamily: 'Oswald',
    },
  })

 return (
   <div>
    <ThemeProvider theme={main} >
    <ResponsiveAppBar setMode={setMode} mode={mode} />
     <Routes >
       <Route path="/" element={<Home />}  />
       <Route path="/recipes" element={<Recipes />} />
       <Route path="/fridge" element={<Fridge />} />
       <Route path="/about" element={<About />} />
       <Route path="/signin" element={<SignIn />} />
       <Route path="/register" element={<Register />} />
       <Route path="/recipes/:_id" element={<RecipeDetails />} />
       <Route path="/list" element={<RecordList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
     </Routes>
    </ThemeProvider>
   </div>
 );
};

export default App;