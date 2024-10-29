
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ItemProvider } from './assets/ItemContext';
import ItemMaster from './assets/ItemMaster';
import PurchaseOrder from './assets/PurchaseOrder';
import SupplierForm from './assets/SupplierForm';
import './App.css';


function App() {
  return (
    <ItemProvider>
      <Router>
        <div className="app-container">
          {/* Sidebar */}
          <aside className="sidebar">
            <h2>Menu</h2>
            <ul>
              <li>
              <Link to="/SupplierForm" className="link-text">SupplierForm</Link>
             
              </li>
              <li>
              <Link to="/ItemMaster" className="link-text">Item Master</Link>
              </li>
              <li>
              <Link to="/PurchaseOrder" className="link-text">Purchase Order</Link>
              </li>
            </ul>
          </aside>

          {/* Main Content */}
          <div className="main-content">
            <header className="header">
              <h1>Welcome to the Inventory System</h1>
              <p>Manage your items and orders seamlessly.</p>
            </header>

            {/* Define Routes */}
            <Routes>
              <Route path="/ItemMaster" element={<ItemMaster />} />
              <Route path="/PurchaseOrder" element={<PurchaseOrder />} />
              <Route path="/SupplierForm" element={<SupplierForm />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ItemProvider>
  );
}

export default App;






