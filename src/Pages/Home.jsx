/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React from "react";
import PantallaPrincipal from "../Components/PantallaPrincipal";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavBar from "../Components/Navbar/Navbar";
import BoxVendedor from "../Components/BoxOptions/BoxVendedor";

export const defaultTheme = createTheme;

const Home = () => {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />

        <Grid container spacing={1}>
          {/* Navbar */}
          <Grid item xs={12}>
            <NavBar />
          </Grid>

          {/* Main Content */}
          <Grid sx={{marginTop:"60px"}}item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <BoxVendedor />
              </Grid>
              <Grid item xs={6}>
                <BoxVendedor />
                <BoxVendedor />

              </Grid>
              <Grid sx={{marginTop:"6px"}}item xs={6}>
                <BoxVendedor />
              </Grid>
              <Grid item xs={6}>
                <BoxVendedor />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default Home;
