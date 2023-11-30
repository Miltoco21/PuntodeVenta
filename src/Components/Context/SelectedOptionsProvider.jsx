/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React,{useState} from 'react'
import { createContext } from "react";

export const SelectedOptionsContext = createContext();/// Contexto impoertar a componentes a trabajar

///Proveedor 
export const SelectedOptionsProvider = ({ children }) => {

  const [selectedOptions, setSelectedOptions] = useState({
    category: null,
    subcategory: null,
    family: null,
    subfamily: null,
    selectedProduct: null,

  });

 
  return (
    <SelectedOptionsContext.Provider value={{ selectedOptions, setSelectedOptions }}>
      {children}
    </SelectedOptionsContext.Provider>
  );

 
}

export default SelectedOptionsProvider