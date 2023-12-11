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
      }}
    >
      {children}
    </SelectedOptionsContext.Provider>
  );
};

export default SelectedOptionsProvider;
