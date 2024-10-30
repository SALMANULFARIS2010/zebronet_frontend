





import React, { useState, useContext } from "react";
import axios from "axios";
import { ItemContext } from "./ItemContext";
import "./SupplierForm.css";

const SupplierForm = () => {
    const { addSupplier } = useContext(ItemContext);

    const generateSupplierNo = () => Math.floor(Math.random() * 1000);

    const [supplierData, setSupplierData] = useState({
        supplierNo: generateSupplierNo(),
        supplierName: "",
        address: "",
        taxNo: "",
        country: "",
        mobileNo: "",
        email: "",
        status: "Active",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplierData((prev) => ({ ...prev, [name]: value }));
        setError("");
    };

    const validateFields = () => {
        const { supplierName, address, taxNo, mobileNo, email } = supplierData;

        if (!/^[a-zA-Z\s]+$/.test(supplierName)) return "Supplier Name should contain only letters";
        if (!/^[a-zA-Z\s]+$/.test(address)) return "Address should contain only letters and spaces (no numbers).";
        if (!/^\d+$/.test(taxNo)) return "Tax No should contain only numbers.";
        if (!/^\d{10}$/.test(mobileNo)) return "Mobile No must be exactly 10 digits.";
        if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email format.";

        return "";
    };

    const handleAddSupplier = async () => {
        const validationError = validateFields();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            await axios.post("http://localhost:5000/api/suppliers", supplierData);
            addSupplier(supplierData); // Add supplier to context
            setSuccess("Supplier added successfully!");

            // Show alert message
            window.alert("Supplier added successfully!");

            resetForm();
        } catch (error) {
            setError("Failed to add supplier. Please try again.");
        }
    };

    const resetForm = () => {
        setSupplierData({
            supplierNo: generateSupplierNo(),
            supplierName: "",
            address: "",
            taxNo: "",
            country: "",
            mobileNo: "",
            email: "",
            status: "Active",
        });
        setError("");
        setSuccess("");
    };

    return (
        <div className="supplier-master">
            <h3>Supplier Form</h3>
            <form>
                <input type="text" name="supplierNo" placeholder="Supplier No" value={supplierData.supplierNo} readOnly />
                <input type="text" name="supplierName" placeholder="Supplier Name" value={supplierData.supplierName} onChange={handleChange} maxLength="15" />
                <input type="text" name="address" placeholder="Address" value={supplierData.address} onChange={handleChange} maxLength="30" />
                <input type="text" name="taxNo" placeholder="Tax No" value={supplierData.taxNo} onChange={handleChange} maxLength="10" />
                <select name="country" value={supplierData.country} onChange={handleChange}>
                    <option value="" disabled>Select Country</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Germany">Germany</option>
                    <option value="Canada">Canada</option>
                </select>
                <input type="text" name="mobileNo" placeholder="Mobile No" value={supplierData.mobileNo} onChange={handleChange} maxLength="10" />
                <input type="email" name="email" placeholder="Email" value={supplierData.email} onChange={handleChange} style={{ width: "300px" }} />
                <select name="status" value={supplierData.status} onChange={handleChange}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                <button type="button" onClick={handleAddSupplier}>Add Supplier</button>
            </form>
        </div>
    );
};

export default SupplierForm;
