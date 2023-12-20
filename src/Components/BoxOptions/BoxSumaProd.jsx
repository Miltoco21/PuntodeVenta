/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import {
  Paper,
  Container,
  Grid,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  TextField,
  IconButton,
  BottomNavigation,
  BottomNavigationAction,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Input,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import TecladoPLU from "../Teclados/TecladoPLU";
import TecladoPeso from "../Teclados/TecladoPeso";
import { SelectedOptionsContext } from "../Context/SelectedOptionsProvider";

const BoxSumaProd = () => {
  const {
    selectedOptions,
    salesData,
    grandTotal,
    addToSalesData,
    removeFromSalesData,
    incrementQuantity,
    decrementQuantity,
    clearSalesData,
    salesDataTimestamp
  
  } = useContext(SelectedOptionsContext);

  const [count, setCount] = useState(1);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [productInfo, setProductInfo] = useState(null);

  const [plu, setPlu] = useState("");
  const [peso, setPeso] = useState("");
  const [open, setOpen] = useState(false);
  // const [grandTotal, setGrandTotal] = useState(0);

  const [openPeso, setOpenPeso] = useState(false);

  const calculateTotalPrice = (quantity, price) => {
    return quantity * price;
  };
  const calculateGrandTotal = () => {
    return salesData.reduce((total, sale) => {
      return total + calculateTotalPrice(sale.quantity, sale.precio);
    }, 0);
  };
  useEffect(() => {
    // Logic to render products based on salesData
    // Update the renderedProducts state accordingly
    setRenderedProducts([]);
  }, [salesData]);
  


 
  const handlePluSubmit = (productInfo) => {
    console.log("Product Info in handlePluSubmit:", productInfo);
    setPlu(productInfo.idProducto); // Assuming idProducto is the product ID
    handleClose(); // Close the PLU dialog
    if (productInfo) {
      addToSalesData(productInfo, selectedQuantity);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenPeso = () => {
    setOpenPeso(true);
  };

  const handleClosePeso = () => {
    setOpenPeso(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (productInfo) {
      addToSalesData(productInfo, selectedQuantity);
    }
  };

  const handlePluChange = (event) => {
    setPlu(event.target.value);
  };

  const handlePesoSubmit = (pesoValue) => {
    setPeso(pesoValue);
    handleClose();
    if (productInfo) {
      addToSalesData(productInfo, selectedQuantity);
    }
  };
  const handleClearSalesData = () => {
    // Clear the sales data using the context function
    clearSalesData();
  };

  const [renderedProducts, setRenderedProducts] = useState([]);

  useEffect(() => {
    // Logic to render products based on salesData
    // Update the renderedProducts state accordingly
    // ...

  }, [salesData, salesDataTimestamp]);

  

  const handlePluButtonClick = () => {
    // Open the PLU dialog when the PLU button is clicked
    handleOpen();
  };

  return (
    <Paper
      elevation={13}
      lg={11}
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "1200px",
        margin: "0 auto",
        marginBottom: "10px",
        marginLeft: "5px",
        marginTop: "-340px",
        justifyContent: "center",
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} lg={12}>
          {/* Main Sales Display */}
          
        </Grid>
        <Grid item xs={4} lg={12}>
          <Paper
            elevation={14}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "5px",
              margin: "5px",
              marginTop: "-6px",
            }}
          >
            <Grid container spacing={1}>
             
              <Grid item xs={3} lg={9}>
                <div style={{ marginLeft: "10px" }} className="product-box">
                  <TextField
                    fullWidth
                    focused
                    placeholder="Ingresa Código"
                    value={searchTerm}
                    onChange={handleSearch}
                  ></TextField>
                </div>
              </Grid>
              <Grid item xs={3} lg={2}>
                <div style={{ display: "flex" }} className="product-box">
                  <Button size="large" variant="outlined" onClick={handleOpen}>
                    PLU
                  </Button>
                  <Button
                    size="large"
                    variant="outlined"
                    onClick={handleOpenPeso}
                  >
                    Peso
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper
            elevation={14}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              margin: "5px",
              marginTop: "-6px",
            }}
          >
            {/* Sales Table */}
            <TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Cantidad</TableCell>
        <TableCell>Descripción</TableCell>
        <TableCell>Precio</TableCell>
        <TableCell>Total</TableCell>
        <TableCell>Eliminar</TableCell>
      </TableRow>
    </TableHead>
    <TableBody  style={{ maxHeight: "300px", overflowY: "auto" }}>
      {salesData.map((sale, index) => {
        return (
          <TableRow key={index}>
            <TableCell>
              <IconButton onClick={() => incrementQuantity(index, productInfo)}>
                +
              </IconButton>
              {sale.quantity}
              <IconButton onClick={() => decrementQuantity(index, productInfo)}>
                -
              </IconButton>
            </TableCell>
            <TableCell>{sale.descripcion}</TableCell>
            <TableCell>{sale.precio}</TableCell>
            <TableCell>
              {calculateTotalPrice(sale.quantity, sale.precio)}
            </TableCell>
            <TableCell>
              <IconButton
                onClick={() => removeFromSalesData(index)}
                color="secondary"
              >
                <RemoveIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      })}
    
    </TableBody>
  </Table>

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
    <Typography>Total: {grandTotal}</Typography>
   
  </Paper>
</TableContainer>

          </Paper>
        </Grid>
        <Dialog sx={{ width: "500px" }} open={open} onClose={handleClose}>
          <DialogContent>
            <TecladoPLU
              plu={plu}
              setPlu={setPlu}
              onClose={handleClose}
              onPluSubmit={handlePluSubmit}
            />
          </DialogContent>
        </Dialog>
        <Dialog
          sx={{ width: "500px" }}
          open={openPeso}
          onClose={handleClosePeso}
        >
          <DialogContent>
            <TecladoPeso
              peso={peso}
              setPeso={setPeso}
              onClose={handleClosePeso}
              onPesoSubmit={handlePesoSubmit}
            />
          </DialogContent>
        </Dialog>
      </Grid>
    </Paper>
  );
};

export default BoxSumaProd;
