/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Box,
  Typography,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const BoxVendedor = () => {
  const vendedores = [
    { codigo: "cod1", nombre: "Nombre ", caja: "Caja 1", boleta: "Boleta 1", operacion: "Operacion 1" }]
    
  const [vendedor, setVendedor] = useState([]);

  useEffect(() => {
    // Simulate a fetch operation after 2 seconds
    const fetchData = () => {
      setTimeout(() => {
        setVendedor(vendedores);
      }, 2000);
    };

    fetchData();
  }, []);

  return (
    <div>
      {vendedor.map((vend) => (
        <Paper
          key={vend.codigo}
          elevation={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "450px",
            height: "135px",
            marginBottom: "10px",
            padding: "10px",
            justifyContent: "center",
            alignItems: "center",

          }}
        >
          <Box>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop:"2px",
                marginBottom:"-27px"
               
                
              }}
            >
              <p
              style={{marginLeft:"-20px",marginRight:"11px",}}>Vendedor</p>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "30px",
                  width: "150px",
                  borderRadius: "8px",
                  border: "2px solid #ccc",
                  justifyContent: "center",
                  padding: "10px",
                }}
              >
                <span>{vend.codigo}</span>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "30px",
                  width: "150px",
                  borderRadius: "8px",
                  border: "2px solid #ccc",
                  justifyContent: "center",
                  padding: "5px",
                  marginLeft:"7px"
                  
                }}
              >
                <span
                >{vend.nombre}</span>
              </Box>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop:"2px",
                marginBottom:"-27px"
               
                
              }}
            >
              <p
              style={{marginLeft:"-20px"}}>Nº Caja:</p>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "30px",
                  width: "150px",
                  borderRadius: "8px",
                  border: "2px solid #ccc",
                  justifyContent: "center",
                  padding: "5px",
                }}
              >
                <span>{vend.caja}</span>
              </Box>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop:"2px",
                marginBottom:"-27px"
                
              }}
            >
              <p style={{marginLeft:"-20px"}}>Nº Última Boleta:</p>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "30px",
                  width: "150px",
                  borderRadius: "8px",
                  border: "2px solid #ccc",
                  justifyContent: "center",
                  padding: "5px",
                }}
              >
                <span>{vend.boleta}</span>
              </Box>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop:"2px",
                
                
                
              }}
            >
              <p style={{marginLeft:"-20px"}}>Nº Última Operación:</p>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "30px",
                  width: "150px",
                  borderRadius: "8px",
                  border: "2px solid #ccc",
                  justifyContent: "center",
                  padding: "5px",
                }}
              >
                <span>{vend.operacion}</span>
              </Box>
            </Grid>
          </Box>
        </Paper>
      ))}
    </div>
  );
};

export default BoxVendedor;
