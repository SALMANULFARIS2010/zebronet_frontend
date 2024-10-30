


import React, { useContext, useState, useEffect } from 'react';
import { ItemContext } from './ItemContext';
import * as XLSX from 'xlsx';
 import './PurchaseOrder.css';

const PurchaseOrder = () => {
  const { items, suppliers } = useContext(ItemContext); // Added suppliers from context
  const [orderQty, setOrderQty] = useState({});
  const [orderNo, setOrderNo] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [packingUnit, setPackingUnit] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  useEffect(() => {
    setOrderNo(`PO-${Math.floor(Math.random() * 10000)}`);
    setOrderDate(new Date().toISOString().split('T')[0]); // Initialize with today's date
  }, []);

  const handleQtyChange = (e) => {
    const qty = e.target.value > 0 ? e.target.value : 1;
    setOrderQty({ ...orderQty, [selectedItem]: qty });
  };

  const handlePackingUnitChange = (e) => {
    const unit = e.target.value;
    setPackingUnit({ ...packingUnit, [selectedItem]: unit });
  };

  const handleDateChange = (e) => {
    setOrderDate(e.target.value);
  };

  const calculateItemAmount = (itemNo, unitPrice) => {
    return (orderQty[itemNo] || 1) * unitPrice;
  };

  const calculateItemDiscount = (itemNo) => {
    const amount = calculateItemAmount(itemNo, items.find(item => item.itemNo === itemNo).unitPrice);
    return amount * 0.1; // Assuming a fixed 10% discount
  };

  const calculateNetAmount = (itemNo) => {
    const amount = calculateItemAmount(itemNo, items.find(item => item.itemNo === itemNo).unitPrice);
    return amount - calculateItemDiscount(itemNo);
  };

  const calculateTotal = () => {
    let itemTotal = 0, discountTotal = 0;
    items.forEach(item => {
      itemTotal += calculateItemAmount(item.itemNo, item.unitPrice);
      discountTotal += calculateItemDiscount(item.itemNo);
    });
    return {
      itemTotal: itemTotal.toFixed(2),
      discountTotal: discountTotal.toFixed(2),
      netAmountTotal: (itemTotal - discountTotal).toFixed(2),
    };
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleSupplierSelect = (e) => {
    setSupplierName(e.target.value);
  };

  const exportToExcel = () => {
    if (!supplierName) {
      alert('Please select a supplier before exporting the purchase order.');
      return;
    }
    const data = items.map(item => ({
      "Item No": item.itemNo,
      "Item Name": item.itemName,
      "Stock Unit": item.stockUnit,
      "Unit Price": item.unitPrice,
      "Packing Unit": packingUnit[item.itemNo] || "box",
      "Order Qty": orderQty[item.itemNo] || 1,
      "Item Amount": calculateItemAmount(item.itemNo, item.unitPrice).toFixed(2),
      "Discount": calculateItemDiscount(item.itemNo).toFixed(2),
      "Net Amount": calculateNetAmount(item.itemNo).toFixed(2),
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Purchase Order');
    XLSX.writeFile(workbook, `Purchase_Order_${orderNo}.xlsx`);
  };

  const printPurchaseOrder = () => {
    if (!supplierName) {
      alert('Please select a supplier before printing the purchase order.');
      return;
    }
    window.print();
  };

  const totals = calculateTotal();

  return (
    <div>
      <h3>Purchase Order</h3>
      <div>
        <label>Order No:</label>
        <input type="text" value={orderNo} readOnly />
        <br/>
        <label>Order Date:</label>
        <input 
          type="date" 
          value={orderDate} 
          onChange={handleDateChange} 
        />
          <br/>
        <label>Supplier Name:</label>
        <select value={supplierName} onChange={handleSupplierSelect}>
          <option value="" disabled>Select Supplier</option>
          {suppliers
            .filter(supplier => supplier.status === "Active") // Filter active suppliers
            .map((supplier, index) => (
              <option key={index} value={supplier.supplierName}>
                {supplier.supplierName}
              </option>
            ))}
        </select>
      </div>

      {items.length === 0 ? (
        <p className="no-items-msg">Please add items to the purchase order.</p>
      ) : (
        <>
          <div>
            <label>Select Item:</label>
            <select onChange={(e) => setSelectedItem(e.target.value)} value={selectedItem}>
              <option value="">--Select an Item--</option>
              {items.map(item => (
                <option key={item.itemNo} value={item.itemNo}>
                  {item.itemName}
                </option>
              ))}
            </select>
            {selectedItem && (
              <>
                <div>
                  <label>Packing Unit:</label>
                  <select
                    value={packingUnit[selectedItem] || 'box'}
                    onChange={handlePackingUnitChange}
                  >
                    <option value="box">Boxes</option>
                    <option value="pieces">Pieces</option>
                  </select>
                </div>
                <div>
                  <label>Order Qty:</label>
                  <input
                    type="number"
                    value={orderQty[selectedItem] || 1}
                    min="1"
                    onChange={handleQtyChange}
                    style={{ width: '60px', textAlign: 'center' }}
                  />
                </div>
              </>
            )}
          </div>

          <table>
            <thead>
              <tr>
                <th>Item No</th>
                <th>Item Name</th>
                <th>Stock Unit</th>
                <th>Unit Price</th>
                <th>Packing Unit</th>
                <th>Order Qty</th>
                <th>Item Amount</th>
                <th>Discount</th>
                <th>Net Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.itemNo}>
                  <td>{item.itemNo}</td>
                  <td>{item.itemName}</td>
                  <td>{item.stockUnit}</td>
                  <td>{item.unitPrice}</td>
                  <td>{packingUnit[item.itemNo] || "box"}</td>
                  <td>{orderQty[item.itemNo] || 1}</td>
                  <td>{calculateItemAmount(item.itemNo, item.unitPrice).toFixed(2)}</td>
                  <td>{calculateItemDiscount(item.itemNo).toFixed(2)}</td>
                  <td>{calculateNetAmount(item.itemNo).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={exportToExcel}>Export to Excel</button>
          <button onClick={printPurchaseOrder}>Print Purchase Order</button>
        </>
      )}
    </div>
  );
};

export default PurchaseOrder;



