


import React, { useState, useContext } from "react";
import { ItemContext } from "./ItemContext";
import "./SupplierForm.css"

const countriesList = ["India", "USA", "UK", "Germany", "Canada"];

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

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Field-specific validation
        if (name === "supplierName" && !/^[a-zA-Z\s]*$/.test(value)) {
            setError("Supplier name should contain only letters.");
            return;
        }
        if (name === "address" && !/^[a-zA-Z\s]*$/.test(value)) {
            setError("Address should contain only letters and spaces.");
            return;
        }
        if (name === "taxNo" && !/^\d*$/.test(value)) {
            setError("Tax No should contain only numbers.");
            return;
        }
        if (name === "mobileNo") {
            // Allow only 10 digits and set error if it exceeds
            if (!/^\d{0,10}$/.test(value)) {
                setError("Mobile No should be a 10-digit number.");
                return;
            }
            setError(""); // Clear error if mobile number is valid
        }
        if (name === "email") {
            if (!/\S+@\S+\.\S+/.test(value)) {
                setError("Invalid email format.");
            } else {
                setError(""); // Clear error if email is valid
            }
        }

        // Update the supplier data state
        setSupplierData((prev) => ({ ...prev, [name]: value }));
    };

    const validateSupplierData = () => {
        const { supplierName, address, taxNo, country, mobileNo, email } = supplierData;

        if (!supplierName || supplierName.length > 15) {
            return "Supplier Name is required and must be less than 15 characters.";
        }
        if (!address || address.length > 30) {
            return "Address is required and should be less than 30 characters.";
        }
        if (!taxNo || taxNo.length > 10) {
            return "Tax No is required and should be a maximum of 10 characters.";
        }
        if (!country) {
            return "Please select a country.";
        }
        if (!/^\d{10}$/.test(mobileNo)) {
            return "Mobile number must be exactly 10 digits.";
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            return "Please enter a valid email address.";
        }

        return "";
    };

    const handleAddSupplier = () => {
        const validationError = validateSupplierData();
        if (validationError) {
            setError(validationError);
            return;
        }

        addSupplier(supplierData);
        alert("Supplier added successfully!");

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
    };

    return (
        <div className="supplier-master">
            <h3>Supplier Form</h3>
            <form>
                <input
                    type="text"
                    name="supplierNo"
                    placeholder="Supplier No"
                    value={supplierData.supplierNo}
                    readOnly
                />
                <input
                    type="text"
                    name="supplierName"
                    placeholder="Supplier Name"
                    value={supplierData.supplierName}
                    onChange={handleChange}
                    maxLength="15"
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={supplierData.address}
                    onChange={handleChange}
                    maxLength="30"
                />
                <input
                    type="text"
                    name="taxNo"
                    placeholder="Tax No"
                    value={supplierData.taxNo}
                    onChange={handleChange}
                    maxLength="10"
                />
                <select
                    name="country"
                    value={supplierData.country}
                    onChange={handleChange}
                >
                    <option value="" disabled>Select Country</option>
                    {countriesList.map((country, index) => (
                        <option key={index} value={country}>{country}</option>
                    ))}
                </select>
                <input
                    type="text"
                    name="mobileNo"
                    placeholder="Mobile No"
                    value={supplierData.mobileNo}
                    onChange={handleChange}
                    maxLength="10"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={supplierData.email}
                    onChange={handleChange}
                    style={{ width: "300px" }}
                />
                <select name="status" value={supplierData.status} onChange={handleChange}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Blocked">Blocked</option>
                </select>

                {error && <p className="error-message">{error}</p>}

                <button type="button" onClick={handleAddSupplier}>
                    Add Supplier
                </button>
            </form>
        </div>
    );
};

export default SupplierForm;
