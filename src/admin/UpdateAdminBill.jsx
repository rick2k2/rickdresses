import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "../styles/UpdateAdminBill.css";

const UpdateAdminBill = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    address: "",
    items: [],
    totalAmount: 0,
    paidAmount: 0,
  });

  // Fetch bill details
  useEffect(() => {
    const fetchBill = async () => {
      try {
        const res = await axios.get(`/bills/${id}`);
        setFormData(res.data);
      } catch (err) {
        console.error("Error fetching bill:", err);
        toast.error("Failed to fetch bill details ❌");
      }
    };
    fetchBill();
  }, [id]);

  const handleChange = (e, index, field) => {
    if (field === "items") {
      const updatedItems = [...formData.items];
      updatedItems[index][e.target.name] = e.target.value;
      setFormData({ ...formData, items: updatedItems });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/bills/update/${id}`, formData);
      toast.success("Bill updated successfully ✅");
      setTimeout(() => navigate("/admin/allbills"), 2000);
    } catch (err) {
      console.error("Error updating bill:", err);
      toast.error("Failed to update bill ❌");
    }
  };

  return (
    <div className="update_bill_container">
      <ToastContainer position="top-right" autoClose={2000} />
      <h2 className="from_heading_update">Update Bill</h2>
      <form className="update_bill_form" onSubmit={handleSubmit}>
        <label>Customer Name</label>
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          required
        />

        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label>Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        ></textarea>

        <label>Items</label>
        {formData.items.map((item, index) => (
          <div key={index} className="item_row">
            <input
              type="text"
              name="productName"
              value={item.productName || ""}
              onChange={(e) => handleChange(e, index, "items")}
              placeholder="Item Name"
            />
            <input
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleChange(e, index, "items")}
              placeholder="Qty"
            />
            <input
              type="number"
              name="price"
              value={item.price}
              onChange={(e) => handleChange(e, index, "items")}
              placeholder="Price"
            />
          </div>
        ))}

        <label>Total Amount</label>
        <input
          type="number"
          name="totalAmount"
          value={formData.totalAmount}
          onChange={handleChange}
          required
        />

        <label>Paid Amount</label>
        <input
          type="number"
          name="paidAmount"
          value={formData.paidAmount}
          onChange={handleChange}
          required
        />

        <div className="form_buttons">
          <button type="submit" className="update_btn_up_admin">
            Update Bill
          </button>
          <button
            type="button"
            className="cancel_btn_up_admin"
            onClick={() => navigate("/admin/allbills")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateAdminBill;
