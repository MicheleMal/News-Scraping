// Navbar.js
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { HomeIcon, NewspaperIcon } from "lucide-react";

const Navbar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: "#212121" }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    News Scraping
                </Typography>

                {/* Utilizza NavLink per la navigazione */}
                <NavLink
                    to="/"
                    style={({ isActive }) => ({
                        textDecoration: "none",
                        color: isActive ? "#bbbdbb" : "white" // Cambia il colore del testo
                    })} 
                >
                    <Button
                        color="inherit"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            "&:hover": { backgroundColor: "#424242" },
                        }}
                    >
                        <HomeIcon size={24} color="white" />
                        <span style={{ marginLeft: "8px" }}>Home</span>
                    </Button>
                </NavLink>

                <NavLink
                    to="/news"
                    style={({ isActive }) => ({
                        textDecoration: "none",
                        color: isActive ? "#bbbdbb" : "white" // Cambia il colore del testo
                    })} 
                >
                    <Button
                        color="inherit"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            "&:hover": { backgroundColor: "#424242" },
                        }}
                    >
                        <NewspaperIcon size={24} color="white" />
                        <span style={{ marginLeft: "8px" }}>News</span>
                    </Button>
                </NavLink>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
