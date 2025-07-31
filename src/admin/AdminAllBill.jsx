import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../styles/AdminAllBill.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ganeshBase64 from "./ganeshBase64";

const AdminAllBill = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchBills = async () => {
      try {
        const res = await axios.get("/bills/all");
        if (isMounted) {
          setBills(res.data);
          toast.success("Bills loaded successfully");
        }
      } catch (err) {
        console.error("Failed to fetch bills", err);
        if (isMounted) toast.error("Failed to fetch bills");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchBills();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleDeleteBill = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bill?")) return;
    try {
      await axios.delete(`/bills/${id}`);
      setBills((prevBills) => prevBills.filter((bill) => bill._id !== id));
      toast.success("Bill deleted successfully");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete bill");
    }
  };

  const handleDownload = (bill) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Rick Dresses", pageWidth / 2, 15, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(
      "Vill+P.O: Makhaltore, Murshidabad, Pin-742401 (W.B)",
      pageWidth / 2,
      21,
      { align: "center" }
    );

    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.rect(10, 10, pageWidth - 20, 270);

    doc.addImage(ganeshBase64, "JPEG", pageWidth - 50, 18, 30, 30, "", "FAST");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Invoice Details:", 14, 40);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Customer: ${bill.customerName}`, 14, 48);
    doc.text(`Phone: ${bill.phone}`, 14, 54);
    doc.text(`Date: ${new Date(bill.createdAt).toLocaleDateString()}`, 14, 60);
    doc.text(`Address: ${bill.address}`, 14, 66);

    doc.addImage(
      ganeshBase64,
      "JPEG",
      pageWidth / 2 - 40,
      pageHeight / 2 - 40,
      80,
      80,
      "",
      "FAST"
    );

    autoTable(doc, {
      startY: 75,
      head: [["Product", "Qty", "Price", "Subtotal"]],
      body: bill.items.map((item) => [
        item.productName,
        item.quantity.toString(),
        `Rs ${item.price}`,
        `Rs ${item.price * item.quantity}`,
      ]),
      styles: { font: "helvetica", fontSize: 11 },
      margin: { left: 14, right: 14 },
    });

    let finalY = doc.lastAutoTable.finalY;
    if (finalY > 240) {
      doc.addPage();
      finalY = 20;
    }

    const due = bill.totalAmount - (bill.paidAmount || bill.totalAmount);
    doc.setFont("helvetica", "bold");
    doc.text(`Total Amount: Rs ${bill.totalAmount}`, 14, finalY + 10);
    doc.text(
      `Paid: Rs ${bill.paidAmount || bill.totalAmount}`,
      14,
      finalY + 17
    );
    doc.text(`Due: Rs ${due}`, 14, finalY + 24);

    doc.setTextColor(255, 102, 0);
    doc.setFontSize(12);
    doc.text("Thank you, visit again!", 14, finalY + 35);
    doc.setTextColor(0, 0, 0);

    doc.save(`${bill.customerName}_invoice.pdf`);
    toast.info("PDF downloaded");
  };

  return (
    <div className="admin-all-bill">
      <ToastContainer position="top-right" autoClose={2000} />
      <h2>📋 All Bills</h2>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Loading bills...</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Items</th>
                <th>Total (Rs)</th>
                <th>Paid (Rs)</th>
                <th>Due (Rs)</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill) => (
                <tr key={bill._id}>
                  <td>{bill.customerName}</td>
                  <td>{bill.phone || "-"}</td>
                  <td>{bill.address || "-"}</td>
                  <td>
                    <ul>
                      {bill.items.map((item, i) => (
                        <li key={i}>
                          {item.productName} × {item.quantity} = ₹
                          {item.quantity * item.price}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>Rs {bill.totalAmount}</td>
                  <td>Rs {bill.paidAmount || bill.totalAmount}</td>
                  <td>
                    Rs{" "}
                    {bill.totalAmount - (bill.paidAmount || bill.totalAmount)}
                  </td>
                  <td>{new Date(bill.createdAt).toLocaleString()}</td>
                  <td className="action_buttons_container_all_bills">
                    <button
                      className="delete_btn_all_bill"
                      onClick={() => handleDeleteBill(bill._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="download_btn_all_bill"
                      onClick={() => handleDownload(bill)}
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminAllBill;
