import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Tesseract from "tesseract.js";
import axios from "../utils/axiosConfig";
import "../styles/PaymentQr.css";
import { toast } from "react-toastify";
const token = localStorage.getItem("token");

const PaymentQr = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [image, setImage] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loadingOrder, setLoadingOrder] = useState(true);

  useEffect(() => {
    toast.success("Payment Details....");
    if (!id) return;

    const fetchOrder = async () => {
      try {
        setStatus("⏳ Fetching order...");
        const { data } = await axios.get(`/orders/${id}`);
        setOrder(data);

        const amount =
          data?.total || data?.totalPrice || data?.order?.totalPrice;
        setPaymentAmount(amount || "0.00");
        setStatus("✅ Order fetched.");
      } catch (err) {
        console.error("❌ Failed to fetch order:", err);
        setError("Failed to fetch order details.");
        setStatus("❌ Order not found or fetch error.");
      } finally {
        setLoadingOrder(false);
      }
    };

    fetchOrder();
  }, [id]);

  // handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setLoading(true);
    setStatus("🔍 Detecting Transaction ID...");

    Tesseract.recognize(file, "eng", {
      logger: (m) => console.log(m),
    })
      .then(({ data: { text } }) => {
        console.log("📝 OCR Text:", text);

        // Match UPI ID or txn ID formats
        const match = text.match(/\b[0-9a-zA-Z]{10,}\b/);
        if (match) {
          setTransactionId(match[0]);
          setStatus("✅ Transaction ID detected!");
        } else {
          setTransactionId("");
          setStatus("⚠️ Couldn't detect ID. Please enter manually.");
        }
      })
      .catch((err) => {
        console.error("OCR Error:", err);
        setTransactionId("");
        setStatus("❌ OCR failed. Try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!transactionId || !image || !paymentAmount) {
      return alert("All fields are required!");
    }

    const formData = new FormData();
    formData.append("screenshot", image);
    formData.append("transactionId", transactionId);
    formData.append("paymentAmount", paymentAmount);
    formData.append("orderId", id);

    try {
      setStatus("⏳ Submitting...");
      const res = await axios.post("/payments/verify", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        setStatus("✅ Payment submitted! Admin will verify soon.");
        navigate("/payment/success");
      } else {
        setStatus("❌ Submission failed.");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setStatus("⚠️ Payment already submitted for this order.");
        toast.success("You’ve already submitted payment for this order.");
        navigate("/order-history");
      } else {
        console.error("❌ Submission error", error);
        setStatus("❌ Submission failed. Try again.");
        toast.success("Something went wrong. Try again later.");
      }
    }
  };

  if (loadingOrder)
    return <div className="payment-loading">Loading payment info...</div>;
  if (error) return <div className="payment-error">{error}</div>;
  if (!order) return <div className="payment-error">No order found.</div>;

  return (
    <div className="payment_page_container">
      <div className="payment-container">
        <h2>💳 Make Payment to Rick Dresses</h2>
        <p>
          Scan the QR code below using any UPI app to complete your payment.
        </p>

        <h5 className="order_id_payment">🆔 Order ID: {id?.slice(-6)}</h5>
        <h3 className="amount_display_payment">🧾 Amount: ₹{paymentAmount}</h3>

        <div className="qr-section">
          <img
            src="/assests/GpayQr.jpg"
            alt="Rick Dresses UPI QR"
            className="qr-image"
          />
          <div className="upi-id">
            <strong>UPI ID:</strong> rickdresses@okicici
          </div>
        </div>

        <p className="note">
          📌 Please mention your Order ID in the UPI note while making payment.
        </p>
      </div>

      <div className="payment_form_container">
        <form className="payment-form" onSubmit={handleSubmit}>
          <h2>📝 Verify Your Payment</h2>

          <label htmlFor="screenshot">📷 Upload Payment Screenshot:</label>
          <input
            type="file"
            id="screenshot"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />

          <label htmlFor="transactionId">🧾 Enter Transaction ID:</label>
          <input
            type="text"
            id="transactionId"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            placeholder="e.g., UPI12345678"
            required
          />

          <label htmlFor="paymentAmount">💰 Payment Amount (₹):</label>
          <input
            type="number"
            id="paymentAmount"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            className="payment_amount_payment"
            readOnly
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "⏳ Detecting..." : "🔍 Verify Payment"}
          </button>

          <p className="note">{status}</p>
        </form>
      </div>
    </div>
  );
};

export default PaymentQr;
