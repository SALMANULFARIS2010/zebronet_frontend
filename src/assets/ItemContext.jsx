



// ItemContext.js
import React, { createContext, useState } from 'react';

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const addItem = (item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const addSupplier = (supplier) => {
    setSuppliers((prevSuppliers) => [...prevSuppliers, supplier]);
  };

  return (
    <ItemContext.Provider value={{ items, addItem, suppliers, addSupplier }}>
      {children}
    </ItemContext.Provider>
  );
};
