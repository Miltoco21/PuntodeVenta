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
  DialogActions,
  DialogTitle,
  TableRow,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import axios from "axios";
import BotonesCategorias from "./BotonesCategorias";
import { SelectedOptionsContext } from "../Context/SelectedOptionsProvider";

const BoxGestionCaja = () => {
  const {
    grandTotal,
    setGrandTotal,
    suspenderVenta,
    salesData,
    calculateTotalPrice,
    clearSalesData,
  } = useContext(SelectedOptionsContext);

  const [clickedDigits, setClickedDigits] = useState([]);
  const [totalAPagar, setTotalAPagar] = useState(0);
  const [change, setChange] = useState(0);
  const [value, setValue] = useState("");
  const [sellerCode, setSellerCode] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [typedNumber, setTypedNumber] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [activeField, setActiveField] = useState(false);
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [recordList, setRecordList] = useState([]);
  const [inputDigits, setInputDigits] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenCategoria, setIsOpenCategoria] = useState(false);
  const [totalPaidAmount, setTotalPaidAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [openDescriptionDialog, setOpenDescriptionDialog] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedSaleEntry, setSelectedSaleEntry] = useState(salesData);

  const PAYMENT_METHODS = [
    "Efectivo",
    "Tarjeta",
    "Cuenta corriente",
    "Transferencia",
  ];
  const handleCloseSuccessSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessSnackbar(false);
  };
  const handleTypedNumberClick = (number) => {
    setActiveField(true);
    setInputDigits((prevDigits) => prevDigits + number);

    // Set the selected amount to the new value directly
    const newAmount = parseFloat(inputDigits + number) || 0;
    setSelectedAmount(newAmount);

    // Update totalPaidAmount in real-time
    setTotalPaidAmount(newAmount);
  };

  const handleZeroClick = () => {
    setActiveField(true);
    setInputDigits((prevDigits) => prevDigits + "0");
    updateSelectedValues("0");
  };
  const updateSelectedValues = (digit) => {
    // Convert the concatenated string to a number
    const newAmount = parseFloat(digit) || 0;

    // Concatenate the selected amount
    setSelectedAmount((prevAmount) => prevAmount + newAmount);
  };
  const handleOpenDescriptionDialog = () => {
    if (salesData.length > 0) {
      // Set selectedQuantity based on the existing quantity in the sales data
      const selectedProduct = salesData[0];
      setSelectedQuantity(selectedProduct.quantity);
    }
    setOpenDescriptionDialog(true);
  };

  const handleCloseDescriptionDialog = () => {
    setOpenDescriptionDialog(false);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleEnterClick = () => {
    // Define the logic for handleEnterClick
    // For example, you can perform actions when the Enter button is clicked
  };

  const handlePaymentMethodClick = (method) => {
    // Add logic to handle payment method selection
    setSelectedPaymentMethod(method);
    setValidationMessage(""); // Clear any previous validation messages
  };

  const handleDeleteOne = () => {
    setActiveField(true);
    setInputDigits((prevDigits) => prevDigits.slice(0, -1));
    // Update the selected amount by removing the last digit
    setSelectedAmount((prevAmount) => {
      const newAmount = Math.floor(prevAmount / 10);
      return newAmount;
    });
  };

  const handleSuspenderVentaDetalle = () => {
    // Verificar si hay algún producto en la venta antes de suspender
    if (salesData.length > 0) {
      const productInfo = salesData[0]; // Obtener la información del primer producto (puedes ajustar esto según tus necesidades)
      // Guardar la descripción en el estado antes de suspender la venta
      setDescription(productInfo.descripcion);
      handleOpenDescriptionDialog();
    } else {
      // Manejar caso donde no hay productos en la venta
      console.warn("No hay productos en la venta para suspender.");
    }
  };
  const handlePostSuspenderVentaDetalle = async () => {
    // Check if sale data is available
    if (salesData.length === 0) {
      console.error("No sale details provided.");
      return;
    }

    // Check if description is provided
    if (!description || typeof description !== "string") {
      console.error("Description is required and must be a string.");
      return;
    }

    // Include ventaSuspenderCabecera field (replace 'your_value' with the actual value)
    const ventaSuspenderCabecera = "your_value";

    // Create payload with ventaSuspenderCabecera
    const data = {
      usuario: 0,
      descripcion: description,
      ventaSuspenderCabecera: ventaSuspenderCabecera, // Include this field
      ventaSuspenderDetalle: salesData.map((sale) => ({
        cantidad: sale.quantity,
        codProducto: String(sale.idProducto), // Convert to string if needed
      })),
    };

    try {
      // Make a POST request to the API endpoint using Axios
      console.log("posted", data);
      const response = await axios.post(
        "https://www.easyposdev.somee.com/api/Ventas/SuspenderVenta",
        data
      );
      if (response.data.descripcion === "Venta suspendida grabada con exito.") {
        // Handle successful response
        console.log("Sale suspended successfully:", response.data);
        setSuccessMessage(response.data.descripcion);
        setOpenSuccessSnackbar(true);

        // Clear sales data and close dialog
        clearSalesData();
        handleCloseDescriptionDialog();

        // Open success dialog
        setOpenSuccessDialog(true);
      } else {
        // Handle unexpected response
        console.error("Unexpected response:", response.data);
      }

      // Handle the response...
    } catch (error) {
      // Handle Axios error
      console.error("Axios error:", error);
    }
  };
  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
  };

  const handleSuspenderVenta = async () => {
    setSelectedSaleEntry();

    setOpenDescriptionDialog(true);
    try {
      // Verificar si hay algún producto en la venta antes de suspender
      if (salesData.length > 0) {
        // Assuming you want the productInfo from the first item in salesData
        const productInfo = salesData[0];

        // Assuming you want the selectedQuantity from the sum of quantities in salesData
        const currentSelectedQuantity = salesData.reduce(
          (total, sale) => total + sale.quantity,
          0
        );

        // Use setProductInfo and setSelectedQuantity to update the context values
        setProductInfo(productInfo);
        setSelectedQuantity(currentSelectedQuantity);

        // Lógica para suspender la venta
        await suspenderVenta(productInfo, currentSelectedQuantity);

        // Puedes realizar otras acciones después de suspender la venta si es necesario
      } else {
        console.warn("No hay productos en la venta para suspender.");
      }
    } catch (error) {
      console.error("Error al suspender la venta:", error);
      // Manejar errores en caso de que la solicitud falle
    }
  };

  const handleConfirmClick = () => {
    if (inputDigits && selectedPaymentMethod) {
      // Convierte los dígitos ingresados en un número
      const typedAmount = parseFloat(inputDigits) || 0;

      // Agrega los valores acumulados al registro de productos vendidos
      setRecordList([
        ...recordList,
        { amount: typedAmount, paymentMethod: selectedPaymentMethod },
      ]);
      setTotalPaidAmount(totalPaidAmount + typedAmount);
      // Limpia los dígitos ingresados, el monto seleccionado y el método de pago después de la confirmación
      setInputDigits("");
      setSelectedAmount(0);
      setSelectedPaymentMethod("");
    }
  };

  const updateTotalAPagar = (newTotalAPagar) => {
    setTotalAPagar(newTotalAPagar);
  };

  const updateGrandTotal = (newGrandTotal) => {
    setGrandTotal(newGrandTotal);
  };

  const updateChange = (newChange) => {
    setChange(newChange);
  };

  const updateSelectedButtons = (newValue, newAmount) => {
    setSelectedButtons([
      ...selectedButtons,
      { value: newValue, amount: newAmount },
    ]);
  };

  const updateSelectedAmount = (newAmount) => {
    setSelectedAmount(selectedAmount + newAmount);
  };

  const updateSelectedPaymentMethod = (newMethod) => {
    setSelectedPaymentMethod(newMethod);
  };
  const handleDeleteSales = () => {
    // Add logic to delete all sales items
    // For example, set the grand total to zero and clear the seller code
    setGrandTotal(0);
    setSellerCode("");
    setInputValue("");
    setChange(0);
  };

  useEffect(() => {
    console.log(change);
  }, [change]);
  const handleDeleteAll = () => {
    // Borrar todos los números escritos cuando se hace clic en "Borrar Todo"
    setTypedNumber("");

    // Limpiar los valores seleccionados
    setSelectedAmount(0);
    setSelectedPaymentMethod("");
  };
  // const handleDeleteAll = () => {
  //   if (activeField === "sellerCode") {
  //     setSellerCode("");
  //   } else if (activeField === "code") {
  //     setCode("");
  //   }
  // };
  const handleClearSalesData = () => {
    clearSalesData();
  };
  const handleAmountMethod = () => {
    // Implement the logic for handleAmountMethod
  };

  const [openCategoria, setOpenCategoria] = useState(false);
  const handleOpenCategoria = () => {
    setOpenCategoria(true);
  };
  const handleCloseCategoria = () => {
    setOpenCategoria(false);
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
    setSelectedAmount(0);
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
            onClick={handleClearSalesData}
          >
            <Typography variant="h7">Borrar Ventas</Typography>
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
            onClick={handleSuspenderVenta}
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
              <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow></TableRow>
                  </TableHead>
                  <TableBody
                    sx={{
                      "& tr:nth-of-type(2n+1)": {
                        backgroundColor: "grey.100",
                      },
                    }}
                  >
                    <TableRow>
                      <TableCell>Total Original</TableCell>
                      <TableCell>{grandTotal}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Total a Pagar</TableCell>
                      <TableCell>{grandTotal - totalPaidAmount}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Total Pagado</TableCell>
                      <TableCell>
                        {totalPaidAmount}
                        {recordList.length > 0 && (
                          <ul>
                            {recordList.map((record, index) => (
                              <li key={index}>
                                {record.amount}, Pago: {record.paymentMethod}
                              </li>
                            ))}
                          </ul>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button variant="outlined" onClick={handleConfirmClick}>
                          agregar
                        </Button>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Vuelto</TableCell>
                      <TableCell>{change > 0 ? change : ""}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Grid container spacing={2}>
                {/* Numeric buttons */}
                <Grid item xs={12} lg={4}>
                  <Grid container spacing={1} sx={{ margin: "2px" }}>
                    {Array.from({ length: 9 }, (_, i) => (
                      <Grid item xs={4} lg={4} key={i}>
                        <Button
                          variant="outlined"
                          // onClick={() => handleNumberClick(i.toString())}
                          onClick={() =>
                            handleTypedNumberClick((i + 1).toString())
                          }
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
                        onClick={() => handleTypedNumberClick("0")}
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
                      <Grid item xs={4} lg={4}>
                        <Button
                          variant="outlined"
                          onClick={handleDeleteOne}
                          fullWidth
                          sx={{ height: "100%" }}
                        >
                          Borrar
                        </Button>
                      </Grid>
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

                    {/* ... */}
                  </Grid>
                </Grid>

                {/* Payment method buttons */}
                <Grid item xs={12} lg={4}>
                  <Grid container spacing={1} sx={{ margin: "2px" }}>
                    <Grid item xs={12} lg={12}>
                      <Button
                        variant="outlined"
                        onClick={() => handlePaymentMethodClick("Efectivo")}
                        value={1}
                        fullWidth
                        sx={{
                          height: "60px",
                          width: "100%",
                          // Resalta el botón si está seleccionado
                          backgroundColor:
                            selectedPaymentMethod === "Efectivo"
                              ? "lightGreen"
                              : "",
                        }}
                      >
                        Efectivo
                      </Button>
                    </Grid>
                    <Grid item xs={12} lg={12}>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          handlePaymentMethodClick("Tarjeta Debito")
                        }
                        value={2}
                        fullWidth
                        sx={{ height: "60px", width: "100%" }}
                      >
                        Debito
                      </Button>
                    </Grid>
                    <Grid item xs={12} lg={12}>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          handlePaymentMethodClick("Tarjeta Credito")
                        }
                        value={2}
                        fullWidth
                        sx={{ height: "60px", width: "100%" }}
                      >
                        Crédito
                      </Button>
                    </Grid>
                    <Grid item xs={12} lg={12}>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          handlePaymentMethodClick("Cuenta corriente")
                        }
                        value={3}
                        fullWidth
                        sx={{ height: "60px", width: "100%" }}
                      >
                        Cuenta Corriente
                      </Button>
                    </Grid>
                    <Grid item xs={12} lg={12}>
                      <Button
                        variant="outlined"
                        onClick={() => handleNumberClick("Transferencia")}
                        value={3}
                        fullWidth
                        sx={{ height: "60px", width: "100%" }}
                      >
                        Transferencia
                      </Button>
                    </Grid>
                    {/* Add other payment method buttons as needed */}
                    {/* ... */}
                  </Grid>
                </Grid>
                {/* Validation message */}
                {validationMessage && (
                  <Typography color="error" sx={{ marginTop: 2 }}>
                    {validationMessage}
                  </Typography>
                )}

                {/* Action buttons */}
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "rowReverse",
                    justifyContent: "space-between",
                  }}
                  item
                  xs={12}
                  lg={12}
                >
                  <Button
                    sx={{ margin: "5px" }}
                    variant="contained"
                    color="primary"
                    onClick={handleEnterClick}
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
            </Grid>
          </Paper>
        </DialogContent>
      </Dialog>

      {/* Dialog for entering description */}
      <Dialog
        open={openDescriptionDialog}
        onClose={handleCloseDescriptionDialog}
        onExited={() => setOpenSuccessSnackbar(true)}
      >
        <DialogTitle>Ingrese la descripción de la venta</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Descripción"
            value={description}
            onChange={handleDescriptionChange}
          />
          {salesData.map((sale, index) => {
            console.log("Sales Entryyyyyy:", {
              idProducto: sale.idProducto,
              quantity: sale.quantity,
              description: sale.descripcion,
              price: sale.precio,
              total: calculateTotalPrice(sale.quantity, sale.precio),
            });
            return (
              <TableRow key={index}>
                {/* ... other table cells */}
                <TableCell>
                  {salesData && (
                    <div>
                      <Typography>ID: {sale.idProducto}</Typography>
                      <Typography>Cantidad: {sale.quantity}</Typography>
                      {/* <Typography>Nombre: {sale.descripcion}</Typography> */}
                      {/* ... other sale entry information */}
                    </div>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDescriptionDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handlePostSuspenderVentaDetalle} color="primary">
            Suspender Venta
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
       
        open={openSuccessSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSuccessSnackbar}
      >
        <MuiAlert onClose={handleCloseSuccessSnackbar} severity="success">
          {successMessage}
        </MuiAlert>
      </Snackbar>
    </Paper>
  );
};

export default BoxGestionCaja;
