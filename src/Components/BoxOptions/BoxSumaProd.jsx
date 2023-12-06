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
    
    addToSalesData,
    removeFromSalesData,
    incrementQuantity,
    decrementQuantity,
    // Other values/functions you need
  } = useContext(SelectedOptionsContext);

  const [count, setCount] = useState(1);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [productInfo, setProductInfo] = useState(null);

  const [plu, setPlu] = useState("");
  const [peso, setPeso] = useState("");
  const [open, setOpen] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);


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
    setGrandTotal(calculateGrandTotal());
  }, [salesData]);

  const handlePluSubmit = (productInfo) => {
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

  // Busqueda plu
  useEffect(() => {
    const fetchProductInfo = async () => {
      try {
        if (searchTerm) {
          const response = await axios.get(
            `https://www.easyposdev.somee.com/api/ProductosTmp/GetProductosByCodigo?idproducto=${searchTerm}`
          );
          console.log("API Response:", response.data);
  
          if (response.data.cantidadRegistros > 0) {
            // If there are products, set the first one in the state
            const newProductInfo = response.data.productos[0];
            setProductInfo(newProductInfo);
            // Remove the addToSalesData if you don't want to add this product to sales data immediately
          } else {
            // If no products found, clear the product information
            setProductInfo(null);
          }
        } else {
          setProductInfo(null);
        }
      } catch (error) {
        console.error("Error fetching product information:", error);
      }
    };
  
    fetchProductInfo(); 
  }, [searchTerm]);



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
            Cantidad:{count} - Plu:
            {searchTerm}- Código:{searchTerm}-Peso:{peso}
            Producto:{" "}
            {selectedOptions.selectedProduct &&
              selectedOptions.selectedProduct.nombre}
            descripcion:
            {selectedOptions.subFamily && selectedOptions.subFamily.descripcion}
            {productInfo && (
              <>
                <Typography>Nombre: {productInfo.nombre}</Typography>
                <Typography>Categoría: {productInfo.categoria}</Typography>
                <Typography>
                  Subcategoría: {productInfo.subCategoria}
                </Typography>
                {/* Check if precioVenta exists before accessing it */}
                {productInfo.precioVenta && (
                  <Typography>
                    Precio de Venta: {productInfo.precioVenta}
                  </Typography>
                )}
                {/* Add more product information fields as needed */}
              </>
            )}
          </Paper>
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
              <Grid item xs={3} lg={1}>
                <div
                  className="product-box"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center",
                    padding: "15px",
                  }}
                >
                  <Typography>{count} </Typography>
                </div>
              </Grid>
              <Grid item xs={3} lg={1}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  size="small"
                >
                  <Button
                    sx={{}}
                    size="small"
                    variant="outlined"
                    aria-label="reduce"
                    onClick={decrementQuantity}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    aria-label="increase"
                    onClick={incrementQuantity}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </div>
              </Grid>
              <Grid item xs={3} lg={7}>
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
                <TableBody>
                 {salesData.map((sale, index) => {
 

  return (
    <TableRow key={index}>
      <TableCell>
        <IconButton onClick={() => incrementQuantity(index)}>
          +
        </IconButton>
        {sale.quantity}
        <IconButton onClick={() => decrementQuantity(index)}>
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
