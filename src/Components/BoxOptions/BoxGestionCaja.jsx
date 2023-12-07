/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useState , useContext } from "react";
import { Box, Paper, Grid, Typography, Button,DialogContent,Dialog } from "@mui/material";
import { styled } from "@mui/system";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import EditIcon from "@mui/icons-material/Edit";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import CoffeeIcon from "@mui/icons-material/Coffee";
import BotonesCategorias from "./BotonesCategorias";
import { SelectedOptionsContext } from "../Context/SelectedOptionsProvider";

// const ButtonS = styled(Button)({
//   width: "100%",
//   padding: "20px",
//   marginBottom: "10px",
//   backgroundColor: "green",
//   borderRadius: "18px",
//   "& .MuiSvgIcon-root": {
//     fontSize: "80px",
//     color: "coral",
//   },
//   "&:hover": {
//     backgroundColor: "green",
//     color: "coral",
//   },
//   "@media (max-width: 600px)": {
//     padding: "10px",
//     "& .MuiSvgIcon-root": {
//       fontSize: "40px",
//     },
//   },
// });

const BoxGestionCaja = () => {
  const { grandTotal } = useContext(SelectedOptionsContext);
 
  const [value, setValue] = useState(0);

  const [openCategoria, setOpenCategoria] = useState(false);
  const handleOpenCategoria = () => {
    setOpenCategoria(true);
  };
  const handleCloseCategoria = () => {
    setOpenCategoria(false);
  };

  const handleNavigationChange = (event, newValue) => {
    console.log(`Button ${newValue} clicked`);
    setValue(newValue);
  };

  return (
    <Paper
      elevation={13}
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "1000px",
        margin: "0 auto",
        marginBottom: "10px",
        marginLeft: "5px",

        justifyContent:"space-around",
        alignItems: "center",
      }}
    >
      <Grid container spacing={1} sx={{ marginLeft: "5px", marginTop: "5px", marginRight: "-9px"}}>
        <Grid item xs={6} sm={6} md={4} lg={3} xl={2}>
          <Button
            elevation={8}
            sx={{
              width: "100px",
              height: "100px",
              backgroundColor: "lightSalmon",
              color: "white",
              "&:hover": {
                backgroundColor: "coral",
                color: "white",
              },
            }}
            onClick={() => handleNavigationChange(null, 0)}
          >
            {/* <ReceiptLongIcon /> */}
            <Typography variant="h7">Borrar</Typography>
          </Button>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={3} xl={2}>
          <Button
            sx={{
              width: "100px",
              height: "100px",
              backgroundColor: "lightSalmon",
              color: "white",
              "&:hover": {
                backgroundColor: "coral",
                color: "white",
              },
            }}
            onClick={() => handleNavigationChange(null, 1)}
          >
            {/* <EditIcon /> */}
            <Typography variant="h7">Buscar</Typography>
          </Button>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={3} xl={2}>
          <Button
            sx={{
              width: "100px",
              height: "100px",
              backgroundColor: "lightSalmon",
              color: "white",
              "&:hover": {
                backgroundColor: "coral",
                color: "white",
              },
            }}
            onClick={ handleOpenCategoria}
          >
            {/* <LockPersonIcon /> */}
            <Typography variant="h7">Familias</Typography>
          </Button>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={3} xl={2}>
          <Button
           
            sx={{
              width: "100px",
              height: "100px",
              backgroundColor: "lightSalmon",
              color: "white",
              "&:hover": {
                backgroundColor: "coral",
                color: "white",
              },
            }}
            
            onClick={() => handleNavigationChange(null, 3)}
          >
            {/* <PowerSettingsNewIcon /> */}
            <Typography variant="h7">Quitar</Typography>
          </Button>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={3} xl={2}>
          <Button
            sx={{
              width: "100px",
              height: "100px",
              backgroundColor: "lightSalmon",
              color: "white",
              "&:hover": {
                backgroundColor: "coral",
                color: "white",
              },
            }}
            onClick={() => handleNavigationChange(null, 4)}
          >
            <Typography variant="h7">Suspender Venta</Typography>
          </Button>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={3} xl={2} >
          <Button
            sx={{
              width: "100px",
              height: "100px",
              backgroundColor: "lightSalmon",
              color: "white",
              "&:hover": {
                backgroundColor: "coral",
                color: "white",
              },
            }}
            onClick={() => handleNavigationChange(null, 5)}
          >
            <Typography variant="h7">Recuperar Venta</Typography>
          </Button>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={3} xl={2}>
          <Button
            sx={{
              width: "100px",
              height: "100px",
              backgroundColor: "lightSalmon",
              color: "white",
              "&:hover": {
                backgroundColor: "coral",
                color: "white",
              },
            }}
            onClick={() => handleNavigationChange(null, 6)}
          >
            {/* <CoffeeIcon /> */}
            <Typography variant="h7">Devolución</Typography>
          </Button>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={3} xl={2}>
          <Button
            sx={{
              width: "100px",
              height: "100px",
              backgroundColor: "lightSalmon",
              color: "white",
              "&:hover": {
                backgroundColor: "coral",
                color: "white",
              },
            }}
            onClick={() => handleNavigationChange(null, 7)}
          >
            {/* <CoffeeIcon /> */}
            <Typography variant="h7">Ingresos</Typography>
          </Button>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={3} xl={2}>
          <Button
            sx={{
              width: "100px",
              height: "100px",
              backgroundColor: "lightSalmon",
              color: "white",
              "&:hover": {
                backgroundColor: "coral",
                color: "white",
              },
            }}
            onClick={() => handleNavigationChange(null, 8)}
          >
            {/* <CoffeeIcon /> */}
            <Typography variant="h7">Retiros</Typography>
          </Button>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={3} xl={2}>
          <Button
            sx={{
              width: "100px",
              height: "100px",
              backgroundColor: "lightSalmon",
              color: "white",
              "&:hover": {
                backgroundColor: "coral",
                color: "white",
              },
            }}
            onClick={() => handleNavigationChange(null, 9)}
          >
            {/* <CoffeeIcon /> */}
            <Typography variant="h7">Otros</Typography>
          </Button>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={3} xl={2}>
          <Button
            sx={{
              width: "100px",
              height: "100px",
              backgroundColor: "lightSalmon",
              color: "white",
              "&:hover": {
                backgroundColor: "coral",
                color: "white",
              },
            }}
            onClick={() => handleNavigationChange(null, 10)}
          >
            <Typography variant="h7">Búsqueda Rápida</Typography>
          </Button>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={3} xl={2}>
          <Button
            sx={{
              width: "100px",
              height: "100px",
              backgroundColor: "lightSalmon",
              color: "white",
              "&:hover": {
                backgroundColor: "coral",
                color: "white",
              },
            }}
            onClick={() => handleNavigationChange(null, 11)}
          >
            <Typography variant="h7">otro </Typography>
          </Button>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={8} xl={2}>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p>TOTAL:$ </p>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "50px",
                width: "350px",
                borderRadius: "8px",
                border: "2px solid #ccc",
                justifyContent: "center",
                padding: "5px",
              }}
            >
              <span>{grandTotal}</span>
            </Box>
            <Paper
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "21px",
              margin: "5px",
            }}
            elevation={21}
            className="sales-display"
          >
             {/* <Typography>Total:{grandTotal} </Typography> */}
          </Paper>
          </Grid>
          <Button
            sx={{
              marginBottom: "10px",
              width: "200px",
              height: "60px",
              backgroundColor: "green",
              color: "whitesmoke",
              "&:hover": {
                backgroundColor: "red",
                color: "white",
              },
            }}
            onClick={() => handleNavigationChange(null, 12)}
          >
            <Typography variant="h7">Pagar</Typography>
          </Button>
        </Grid>
      </Grid>
      <Dialog sx={{ width: "1300px" }}open={openCategoria} onClose={handleCloseCategoria}>
          <DialogContent>
            <BotonesCategorias
            
              onClose={handleCloseCategoria}
            
            />
          </DialogContent>
        </Dialog>
    </Paper>

    
  );
};

export default BoxGestionCaja;
