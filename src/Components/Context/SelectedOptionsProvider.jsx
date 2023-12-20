/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useMemo } from "react";

export const SelectedOptionsContext = React.createContext();

export const SelectedOptionsProvider = ({ children }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    category: null,
    subcategory: null,
    family: null,
    subfamily: null,
    selectedProduct: null,
  });

  const [quantity, setQuantity] = useState(1);

  const [salesData, setSalesData] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [salesDataTimestamp, setSalesDataTimestamp] = useState(Date.now());
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
  useEffect(() => {
    setSalesDataTimestamp(Date.now());
  }, [salesData, grandTotal]); // Add other dependencies as needed
  useEffect(() => {
    // Do additional actions if needed after salesData is cleared
    // This block of code will run after the state is updated
    // ...
  
    // Example: Log a message
    console.log("Sales data cleared!");
  
  }, [salesData]); 

  const addToSalesData = (product, quantity) => {
    const newSale = {
      cantidad: quantity,
      descripcion: product.nombre,
      precio: product.precioVenta || 0,
      total: quantity * (product.precioVenta || 0),
      quantity: 1,
    };
  

    setSalesData((prevSalesData) => {
      const updatedSalesData = [...prevSalesData, newSale];

      return updatedSalesData;
    });
  };
  const clearSalesData = () => {
    
    setSalesData([]);
    setGrandTotal(0);
    // Update the timestamp to trigger a re-render
    setTimeout(() => {
      // Update the timestamp to trigger a re-render
      setSalesDataTimestamp(Date.now());
    }, 400);
  };
  const [selectedButtons, setSelectedButtons] = useState([]);

const handleNumberClick = (value) => {
  // Existing code...

  // Add the selected button and its amount to the state
  setSelectedButtons([...selectedButtons, { value, amount: payment }]);
};

// Function to calculate the total amount from selected buttons
const calculateTotalAmount = () => {
  return selectedButtons.reduce((total, button) => total + button.amount, 0);
};

  

  

  const removeFromSalesData = (index) => {
    setSalesData((prevSalesData) =>
      prevSalesData.filter((_, i) => i !== index)
    );
  };

  const incrementQuantity = (index, productInfo) => {
    const updatedSalesData = salesData.map((sale, i) => {
      if (i === index) {
        const newQuantity = sale.quantity + 1;
        return { ...sale, quantity: isNaN(newQuantity) ? 1 : newQuantity };
      }
      return sale;
    });
  
    setSalesData(updatedSalesData);
  
    if (productInfo) {
      addToSalesData(productInfo, selectedQuantity);
    }
  };
  
  const decrementQuantity = (index, productInfo) => {
    const updatedSalesData = salesData.map((sale, i) => {
      if (i === index && sale.quantity > 1) {
        const newQuantity = sale.quantity - 1;
        return { ...sale, quantity: isNaN(newQuantity) ? 1 : newQuantity };
      }
      return sale;
    });
  
    setSalesData(updatedSalesData);
  
    if (productInfo) {
      addToSalesData(productInfo, selectedQuantity);
    }
  };

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value, 10));
  };

  return (
    <SelectedOptionsContext.Provider
      value={{
        selectedOptions,
        setSelectedOptions,
        salesData,
        setSalesData,
        grandTotal,
        setGrandTotal,
        addToSalesData,
        removeFromSalesData,
        incrementQuantity,
        decrementQuantity,
        clearSalesData,
        products,
        setProducts,
        salesDataTimestamp
      }}
    >
      {children}
    </SelectedOptionsContext.Provider>
  );
};

export default SelectedOptionsProvider;
