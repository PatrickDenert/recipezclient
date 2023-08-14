import React from "react";
import {Stack } from "@mui/material";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const About = () => {
    return(
        <Stack sx={{ml: -1, mr: -1}} paddingTop='75px' textAlign='center' color={"text.primary"} bgcolor={"background.default"} paddingLeft="50px" paddingRight="50px">
            <h1>About</h1>
            <p>This Website is a place to upload recipes and view other people's recipes. This website is developed by Patrick Denert, a recent Computer Engineering Graduate looking for a full time position. If you have any questions or suggestions feel free to contact me below.</p>
            <p>Future Updates planned:</p>

            <Stack sx={{textAlign: "justify", margin:"auto"}}>
                <li>Accounts</li>
                <li>User reviews/comments</li>
                <li>efficiency</li>
            </Stack>

            <h2>Contact Info:</h2>

            <ButtonGroup sx={{textAlign: "justify", margin:"auto"}} variant="contained" aria-label="contact info">
                <Button href="mailto:patrickdenert@gmail.com"><EmailIcon/> Email</Button>
                <Button href="https://www.linkedin.com/in/patrick-denert-4327bb1bb/"><LinkedInIcon/> LinkedIn</Button>
            </ButtonGroup>
        </Stack>
        );
}

export default About;