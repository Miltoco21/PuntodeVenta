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
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };
  const [plu, setPlu] = useState("");

  const handlePluChange = (event) => {
    setPlu(event.target.value);
  };

  const handlePluSubmit = () => {
    // You can handle the PLU submission here, e.g., send it to the server.
    console.log("PLU submitted:", plu);
  };

  return (
    <Paper
      elevation={13}
      item
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
            {count}
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
              marginTop:"-6px"
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={3} lg={1}>
                <div className="product-box"  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent:"space-around",
                    alignItems: "center",
                  }}>
                  <Typography>{count}</Typography>
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
              <Grid item fullWidth xs={3} lg={4}>
                <div className="product-box">
                  <TextField focused placeholder="Ingrese código" />
                </div>
              </Grid>
              <Grid item xs={3} lg={4}>
                <div style={{ display: "flex" }} className="product-box">
                  <TextField placeholder=" PLU..." />
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={handlePluSubmit}
                  >
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
              marginTop:"-6px"
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
      </Grid>
    </Paper>
  );
};

export default BoxSumaProd;
