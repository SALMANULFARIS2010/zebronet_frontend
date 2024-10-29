


// ItemContext.js
import React, { createContext, useState } from 'react';

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]); 

  const addItem = (item) => {
    setItems([...items, item]);
  };

  const addSupplier = (supplier) => {
    setSuppliers([...suppliers, supplier]);
  };

  return (
    <ItemContext.Provider value={{ items, addItem, suppliers, addSupplier }}>
      {children}
    </ItemContext.Provider>
  );
};
