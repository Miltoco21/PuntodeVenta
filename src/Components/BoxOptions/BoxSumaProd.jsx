/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
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

const BoxSumaProd = () => {
  const [count, setCount] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [plu, setPlu] = useState("");

  const increment = () => {
    setCount(count + 1);
  };
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const decrement = () => {
    setCount(count - 1);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePluChange = (event) => {
    setPlu(event.target.value);
  };

  const handlePluSubmit = (pluValue) => {
    setPlu(pluValue);
    handleClose;
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
            {plu} 
             - Código:{searchTerm}
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
              <Grid item xs={3} lg={2}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  size="small"
                >
                  <Button
                    size="small"
                    variant="outlined"
                    aria-label="reduce"
                    onClick={decrement}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    aria-label="increase"
                    onClick={increment}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </div>
              </Grid>
              <Grid item xs={3} lg={7}>
                <div className="product-box">
                  <TextField
                    fullWidth
                    focused
                    placeholder="Ingresa Código"
                    label="Buscar Código..."
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
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Cantidad</TableCell>
                    <TableCell>Descripción</TableCell>
                    <TableCell>Precio</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* You can map through your sales data and create rows here */}
                  <TableRow>
                    <TableCell>Cantidad 1</TableCell>
                    <TableCell>Descripcion....</TableCell>
                    <TableCell>5.000</TableCell>
                    <TableCell>5.000</TableCell>
                  </TableRow>
                  {/* Add more rows as needed */}
                </TableBody>
              </Table>
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
      </Grid>
    </Paper>
  );
};

export default BoxSumaProd;
