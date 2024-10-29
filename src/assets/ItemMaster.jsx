



import React, { useState, useContext } from "react";
import { ItemContext } from "./ItemContext";
import "./ItemMaster.css";

const ItemMaster = () => {
  const { addItem, suppliers } = useContext(ItemContext);

  const generateItemNo = () => Math.floor(Math.random() * 1000);

  const [itemData, setItemData] = useState({
    itemNo: generateItemNo(),
    itemName: "",
    inventoryLocation: "",
    brand: "",
    category: "",
    supplier: "", // Supplier field added back
    stockUnit: "pieces",
    unitPrice: "",
    status: "Enabled",
    itemImages: [],
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const lettersOnly = /^[A-Za-z\s]*$/;

    if (["itemName", "inventoryLocation", "brand", "category"].includes(name)) {
      if (!lettersOnly.test(value)) {
        setError(`${name.replace(/([A-Z])/g, " $1")} must contain only letters`);
        return;
      }
      if (value.length > 15) {
        setError(`${name.replace(/([A-Z])/g, " $1")} must be a maximum of 15 characters`);
        return;
      }
    }

    setItemData({ ...itemData, [name]: value });
    setError("");
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setItemData({ ...itemData, itemImages: files });
  };

  const validateItemData = () => {
    const { itemName, inventoryLocation, brand, category, supplier, stockUnit, unitPrice } = itemData;

    if (!itemName || !inventoryLocation || !brand || !category || !supplier || !stockUnit || !unitPrice) {
      return "Please fill in all required fields.";
    }
    if (isNaN(unitPrice) || unitPrice <= 0) {
      return "Unit price must be a positive number.";
    }
    return "";
  };

  const handleAddItem = () => {
    const validationError = validateItemData();
    if (validationError) {
      setError(validationError);
      return;
    }

    addItem(itemData);
    alert("Item added successfully!");

    setItemData({
      itemNo: generateItemNo(),
      itemName: "",
      inventoryLocation: "",
      brand: "",
      category: "",
      supplier: "",
      stockUnit: "pieces",
      unitPrice: "",
      status: "Enabled",
      itemImages: [],
    });

    document.querySelector('input[name="itemImages"]').value = "";
    setError("");
  };

  return (
    <div className="item-master">
      <h3>Item Master</h3>
      <form>
        <input
          type="text"
          name="itemNo"
          placeholder="Item No"
          value={itemData.itemNo}
          readOnly
        />
        <input
          type="text"
          name="itemName"
          placeholder="Item Name"
          value={itemData.itemName}
          onChange={handleChange}
          maxLength="15"
        />
        <input
          type="text"
          name="inventoryLocation"
          placeholder="Inventory Location"
          value={itemData.inventoryLocation}
          onChange={handleChange}
          maxLength="15"
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={itemData.brand}
          onChange={handleChange}
          maxLength="15"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={itemData.category}
          onChange={handleChange}
          maxLength="15"
        />
        <select
          name="supplier"
          value={itemData.supplier}
          onChange={handleChange}
        >
          <option value="" disabled>Select Supplier</option>
          {suppliers
            .filter((supplier) => supplier.status === "Active")
            .map((supplier, index) => (
              <option key={index} value={supplier.supplierName}>
                {supplier.supplierName}
              </option>
            ))}
        </select>
        <select name="stockUnit" value={itemData.stockUnit} onChange={handleChange}>
          <option value="pieces">Pieces</option>
          <option value="boxes">Boxes</option>
        </select>
        <input
          type="number"
          name="unitPrice"
          placeholder="Unit Price"
          value={itemData.unitPrice}
          onChange={handleChange}
          min="1"
        />
        <input
          type="file"
          multiple
          name="itemImages"
          onChange={handleImageUpload}
        />
        <select name="status" value={itemData.status} onChange={handleChange}>
          <option value="Enabled">Enabled</option>
          <option value="Disabled">Disabled</option>
        </select>
        {error && <p className="error-message">{error}</p>}
        <button type="button" onClick={handleAddItem}>
          Add Item
        </button>
      </form>
    </div>
  );
};

export default ItemMaster;
