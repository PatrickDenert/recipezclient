import { Button, Stack } from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";

const Home = () => {
    return(
    <div>
    <Stack sx={{ml: -1, mr: -1}} paddingTop='75px' textAlign='center' color={"text.primary"} bgcolor={"background.default"}>
        <h1>Welcome</h1>
        <p>Thank you for visiting my website. You can use the links above or below to browse recipes or upload your own recipe. For more information, you can visit the about page.</p>
        <Stack sx={{margin: "10px auto"}} textAlign='center' direction="row" spacing={5}>
            <Button variant="contained">
                <Link style={{textDecoration: "none", color:"white"}} to={`/recipes`}>
                    View Recipes
                </Link>
            </Button>
            <Button variant="contained">
                <Link style={{textDecoration: "none", color:"white"}} to={`/create`}>
                    Create A Recipe
                </Link>
            </Button>
            <Button variant="contained">
                <Link style={{textDecoration: "none", color:"white"}} to={`/about`}>
                    About
                </Link>
            </Button>
        </Stack>
    </Stack>

    </div>
    );
}

export default Home;