import "../styles/Features.css";
const Features = () => {
  return (
    <div>
      <section className="features-section">
        <div className="why_buy">
          <h2>WHY YOU BUY FROM US?</h2>
        </div>
        <div className="features-container">
          <div className="feature">
            <h3>🚚 Fast Delivery</h3>
            <p>
              Get your products delivered at lightning speed with real-time
              tracking.
            </p>
          </div>
          <div className="feature">
            <h3>🎨 Unique Designs</h3>
            <p>
              Each dress is crafted with passion and creativity — stand out in
              style!
            </p>
          </div>
          <div className="feature">
            <h3>💯 Quality Guaranteed</h3>
            <p>
              Every product is inspected to ensure top-notch quality and
              comfort.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
