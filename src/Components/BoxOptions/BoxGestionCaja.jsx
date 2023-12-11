/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Paper,
  Grid,
  TextField,
  Typography,
  Button,
  DialogContent,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
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
  const { grandTotal, setGrandTotal } = useContext(SelectedOptionsContext);
  const [change, setChange] = useState(0);
  const [value, setValue] = useState(0);
  const [sellerCode, setSellerCode] = useState("");

  const [inputValue, setInputValue] = useState("");

  const [activeField, setActiveField] = useState("sellerCode");

  const handleFieldFocus = (field) => {
    setActiveField(field);
  };
  // const handleNumberClick = (number) => {
  //   if (activeField === "sellerCode") {
  //     setSellerCode(sellerCode + number);
  //   }

  //   // Your logic to update the grandTotal prop
  //   const newTotal = grandTotal - parseInt(number);
  //   setGrandTotal(newTotal);
  //   // Other logic if needed
  // };

  let isExecuting = false;

  const handleNumberClick = (number) => {
    if (isExecuting) {
      return;
    }

    isExecuting = true;

    const payment = parseFloat(number); // Use parseFloat for decimal numbers
    const newTotal = grandTotal - payment;

    // Ensure the newTotal is not negative
    const validNewTotal = Math.max(newTotal, 0);

    setGrandTotal(validNewTotal);
    setChange(Math.max(payment - validNewTotal, 0));

    isExecuting = false;
  };

  const handleDeleteOne = () => {
    if (activeField === "sellerCode") {
      setSellerCode(sellerCode.slice(0, -1));
    } else if (activeField === "code") {
      setCode(code.slice(0, -1));
    }
  };

  useEffect(() => {
    console.log(change);
  }, [change]);

  const handleDeleteAll = () => {
    if (activeField === "sellerCode") {
      setSellerCode("");
    } else if (activeField === "code") {
      setCode("");
    }
  };

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

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    // Reset the seller code, input value, and change
    setSellerCode("");
    setInputValue("");
    setChange(0);

    // Close the dialog
    setOpenDialog(false);
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

        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Grid
        container
        spacing={1}
        sx={{ marginLeft: "5px", marginTop: "5px", marginRight: "-9px" }}
      >
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
            onClick={handleOpenCategoria}
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
            onClick={handleOpenDialog}
            // onClick={() => handleNavigationChange(null, 12)}
          >
            <Typography variant="h7">Pagar</Typography>
          </Button>
        </Grid>
      </Grid>
      <Dialog
        sx={{ width: "1300px" }}
        open={openCategoria}
        onClose={handleCloseCategoria}
      >
        <DialogContent>
          <BotonesCategorias onClose={handleCloseCategoria} />
        </DialogContent>
      </Dialog>
      <Dialog
        sx={{ width: "100%", maxWidth: "1500px" }}
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogContent sx={{ width: "100%" }}>
          <Paper elevation={5} variant="h6">
            Total: {grandTotal}
          </Paper>
          <Paper
            elevation={2}
            sx={{
              height: "100%",
              width: "100%",
              marginLeft: "-20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Grid container spacing={1} sx={{ margin: "2px" }}>
              {/* Dynamic buttons */}
              <TableContainer
                component={Paper}
                sx={{ maxWidth: 400, margin: "auto" }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow></TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Total:</TableCell>
                      <TableCell> {grandTotal}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Selected</TableCell>
                      <TableCell>{sellerCode}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Pagado</TableCell>
                      <TableCell>{inputValue}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Vuelto</TableCell>
                      <TableCell>{change}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Grid item xs={12} lg={4}>
                <Grid container spacing={1} sx={{ margin: "2px" }}>
                  {Array.from({ length: 9 }, (_, i) => (
                    <Grid item xs={4} lg={4} key={i}>
                      <Button
                        variant="outlined"
                        onClick={() => handleNumberClick(i.toString())}
                        fullWidth
                        sx={{ height: "100%" }}
                      >
                        {i + 1}
                      </Button>
                    </Grid>
                  ))}
                  <Grid item xs={4} lg={4}>
                    <Button
                      variant="outlined"
                      onClick={() => handleNumberClick("0")}
                      fullWidth
                      sx={{ height: "100%" }}
                    >
                      0
                    </Button>
                  </Grid>
                  <Grid item xs={4} lg={4}>
                    <Button
                      variant="outlined"
                      onClick={() => handleNumberClick("00")}
                      fullWidth
                      sx={{ height: "100%" }}
                    >
                      00
                    </Button>
                  </Grid>
                  <Grid item xs={4} lg={4}>
                    <Button
                      variant="outlined"
                      onClick={() => handleNumberClick("000")}
                      fullWidth
                      sx={{ height: "100%" }}
                    >
                      000
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              {/* Fixed value buttons */}
              <Grid item xs={12} lg={4}>
                <Grid container spacing={1} sx={{ margin: "2px" }}>
                  <Grid item xs={12} lg={12}>
                    <Button
                      variant="outlined"
                      onClick={() => handleNumberClick("20000")}
                      value={20000}
                      fullWidth
                      sx={{ height: "100%" }}
                    >
                      20.000
                    </Button>
                  </Grid>
                  <Grid item xs={12} lg={12}>
                    <Button
                      variant="outlined"
                      onClick={() => handleNumberClick("10000")}
                      value={10000}
                      fullWidth
                      sx={{ height: "100%" }}
                    >
                      10.000
                    </Button>
                  </Grid>
                  <Grid item xs={12} lg={12}>
                    <Button
                      variant="outlined"
                      onClick={() => handleNumberClick("5000")}
                      value={5000}
                      fullWidth
                      sx={{ height: "100%" }}
                    >
                      5.000
                    </Button>
                  </Grid>
                  <Grid item xs={12} lg={12}>
                    <Button
                      variant="outlined"
                      onClick={() => handleNumberClick("2000")}
                      value={2000}
                      fullWidth
                      sx={{ height: "100%" }}
                    >
                      2.000
                    </Button>
                  </Grid>
                  <Grid item xs={12} lg={12}>
                    <Button
                      variant="outlined"
                      onClick={() => handleNumberClick("1000")}
                      value={1000}
                      fullWidth
                      sx={{ height: "100%" }}
                    >
                      1.000
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={12}>
                  <Grid
                    container
                    direction="row"
                    spacing={1}
                    sx={{ margin: "2px" }}
                  >
                    <Grid item xs={4} lg={12}>
                      <Button
                        variant="outlined"
                        onClick={() => handleNumberClick("Efectivo")}
                        value={1}
                        fullWidth
                        sx={{ height: "100%" }}
                      >
                        Efectivo
                      </Button>
                    </Grid>
                    <Grid item xs={4} lg={12}>
                      <Button
                        variant="outlined"
                        onClick={() => handleNumberClick("Tarjeta")}
                        value={2}
                        fullWidth
                        sx={{ height: "100%" }}
                      >
                        Tarjeta
                      </Button>
                    </Grid>
                    <Grid item xs={4} lg={12}>
                      <Button
                        variant="outlined"
                        onClick={() => handleNumberClick("Cuenta corriente")}
                        value={3}
                        fullWidth
                        sx={{ height: "100%" }}
                      >
                        Cuenta Corriente
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "rowReverse",
                  justifyContent: "space-between",
                }}
                item
                xs={5}
                lg={12}
              >
                <Button
                  sx={{ margin: "5px" }}
                  variant="contained"
                  color="primary"
                  // onClick={handleEnter}
                >
                  Enter
                </Button>
                <Button
                  sx={{ margin: "5px", marginRight: "42px" }}
                  variant="contained"
                  color="primary"
                  onClick={handleCloseDialog}
                >
                  Salir
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </DialogContent>
      </Dialog>
    </Paper>
  );
};

export default BoxGestionCaja;
