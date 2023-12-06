/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState, useMemo } from "react";

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

  const grandTotal = useMemo(() => {
    return salesData.reduce((total, sale) => total + sale.total, 0);
  }, [salesData]);

  const addToSalesData = (product, quantity) => {
    const newSale = {
      cantidad: quantity,
      descripcion: product.nombre,
      precio: product.precioVenta || 0,
      total: quantity * (product.precioVenta || 0),
      quantity: 1,
    };

    setSalesData((prevSalesData) => [...prevSalesData, newSale]);
  };
  // const addToSalesData = (productInfo, quantity) => {
  //   const existingProductIndex = salesData.findIndex(
  //     (sale) => sale.id === productInfo.id
  //   );
  
  //   if (existingProductIndex !== -1) {
  //     // Product already exists, increment quantity
  //     const updatedSalesData = salesData.map((sale, index) => {
  //       if (index === existingProductIndex) {
  //         return { ...sale, quantity: sale.quantity + quantity };
  //       }
  //       return sale;
  //     });
  
  //     setSalesData(updatedSalesData);
  //   } else {
  //     // Product doesn't exist, add it to salesData
  //     setSalesData([...salesData, { ...productInfo, quantity }]);
  //   }
  // };

  const removeFromSalesData = (index) => {
    setSalesData((prevSalesData) =>
      prevSalesData.filter((_, i) => i !== index)
    );
  };

  const incrementQuantity = (index) => {
    const updatedSalesData = salesData.map((sale, i) => {
      if (i === index) {
        const newQuantity = sale.quantity + 1;
        return { ...sale, quantity: isNaN(newQuantity) ? 1 : newQuantity };
      }
      return sale;
    });
  
    setSalesData(updatedSalesData);
  };
  
  const decrementQuantity = (index) => {
    const updatedSalesData = salesData.map((sale, i) => {
      if (i === index && sale.quantity > 1) {
        const newQuantity = sale.quantity - 1;
        return { ...sale, quantity: isNaN(newQuantity) ? 1 : newQuantity };
      }
      return sale;
    });
  
    setSalesData(updatedSalesData);
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
