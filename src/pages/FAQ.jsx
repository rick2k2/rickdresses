import React from "react";
import "../styles/Faq.css";

const FAQ = () => {
  return (
    <div className="page-container-faq">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-grid">
        <div className="faq-card">
          <h4>What is Rick Dresses?</h4>
          <p>
            We sell ethnic and modern dresses at affordable prices for all
            occasions.
          </p>
        </div>

        <div className="faq-card">
          <h4>Do you offer Cash on Delivery?</h4>
          <p>Yes, we offer COD service in selected cities across India.</p>
        </div>

        <div className="faq-card">
          <h4>How can I track my order?</h4>
          <p>
            You’ll receive an email with a tracking link once your order is
            dispatched.
          </p>
        </div>

        <div className="faq-card">
          <h4>How long does delivery take?</h4>
          <p>
            Orders usually arrive within 5–7 working days depending on your
            location.
          </p>
        </div>

        <div className="faq-card">
          <h4>What is your return policy?</h4>
          <p>
            Returns are accepted within 7 days of delivery. Item must be unused
            and in original condition.
          </p>
        </div>

        <div className="faq-card">
          <h4>How can I cancel an order?</h4>
          <p>
            Contact our support team within 24 hours of placing the order for
            cancellation.
          </p>
        </div>

        <div className="faq-card">
          <h4>Are your products authentic?</h4>
          <p>
            Absolutely! All products are genuine and quality-checked before
            dispatch.
          </p>
        </div>

        <div className="faq-card">
          <h4>How can I contact customer support?</h4>
          <p>
            You can email us at{" "}
            <a href="mailto:rickdresses@gmail.com">rickdresses@gmail.com</a> or
            use the contact page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
