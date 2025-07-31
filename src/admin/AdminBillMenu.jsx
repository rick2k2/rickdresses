import { Link } from "react-router-dom";
import "../styles/AdminBillMenu.css";

const AdminBillMenu = () => {
  return (
    <div className="admin-products">
      <h2>Admin Bills Panel</h2>
      <div className="admin-buttons">
        <Link to="/admin/bills/create" className="btn">
          Generate Bill
        </Link>
        <Link to="/admin/bills/due" className="btn">
          Show Due Bill
        </Link>
        <Link to="/admin/allbills" className="btn">
          Show All Bills
        </Link>
      </div>
    </div>
  );
};

export default AdminBillMenu;
