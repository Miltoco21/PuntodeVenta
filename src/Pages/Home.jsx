/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React from "react";

import CssBaseline from "@mui/material/CssBaseline";

import { Grid } from "@mui/material";


import BoxVendedor from "../Components/BoxOptions/BoxVendedor";
import BoxDatosCaja from "../Components/BoxOptions/BoxDatosCaja";
import BoxGestionCaja from "../Components/BoxOptions/BoxGestionCaja";
import BoxBotonesSecundarios from "../Components/BoxOptions/BoxBotonesSecundarios";
import BoxSumaProd from "../Components/BoxOptions/BoxSumaProd";
import NavBar from "../Components/Navbar/Navbar"



const Home = () => {
  return (
    <>
      <>
        <CssBaseline />

        <Grid container spacing={1}>
         
          <Grid item xs={12}sx={{ height:"66px" }}>
            <NavBar  />
          </Grid>

          {/* Main Content */}
          <Grid sx={{ marginTop: "6px" }} item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6} xl={1}>
                <Grid sx={{ display: "flex" }}>
                 {/* /////codigo vendedor //// */}
                  <BoxDatosCaja /> {/* /////codigo caja boleta //// */}
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <BoxGestionCaja /> {/* /////botones gestion caja //// */}
              </Grid>
              {/* /////Half //// */}
              <Grid  item xs={6} >
                {/* <BoxBotonesSecundarios/> */}
                <BoxSumaProd/> {/* /////pantalla suma //// */}
                
              </Grid>
              
            </Grid>
          </Grid>
        </Grid>
      </>
    </>
  );
};

export default Home;
