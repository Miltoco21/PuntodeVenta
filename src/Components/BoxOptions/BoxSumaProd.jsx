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

const BoxSumaProd = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };
  const [plu, setPlu] = useState('');

  const handlePluChange = (event) => {
    setPlu(event.target.value);
  };

  const handlePluSubmit = () => {
    // You can handle the PLU submission here, e.g., send it to the server.
    console.log('PLU submitted:', plu);
  };

  return (
    <Paper
      elevation={13}
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "1200px",
        margin: "0 auto",
        marginBottom: "10px",
        marginLeft: "5px",
        marginTop: "-340px",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Grid
        container
        spacing={1}
        
      >
        <Grid item xs={12}>
          <Paper>
            {/* Main Sales Display */}
            <div className="sales-display">
              {/* You can put your main sales data here */}
              <p>descripcion - valor - producto</p>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={4} lg={4} >
          <Paper elevation={3} sx={{ display: "flex", flexDirection: "row" }}>
            <Grid className="product-box">
              <p>Count: {count}</p>
              
            </Grid>
            <Grid sx={{ display: "flex",flexDirection:"column-reverse"}}>
              <ButtonGroup size="medium">
                <Button aria-label="reduce" onClick={decrement}>
                  <RemoveIcon fontSize="small" />
                </Button>
                <Button aria-label="increase" onClick={increment}>
                  <AddIcon fontSize="small" />
                </Button>
              </ButtonGroup>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            {/* Product Box 2 */}
            <div className="product-box">
              {/* You can put product information or buttons here */}
              <Typography></Typography>
              <Input placeholder="Ingrese código"></Input>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={4} lg={4}>
          <Paper sx={{ display: "flex", flexDirection: "row" }}>
            {/* Product Box 3 */}
            <div className="product-box">
        <TextField
          placeholder="Cod PLU3455"
          value={plu}
          onChange={handlePluChange}
        />
        <Button
          variant="outlined"
          onClick={handlePluSubmit}
        >
          PLU
        </Button>
      </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
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
      </Grid>
    </Paper>
  );
};

export default BoxSumaProd;
