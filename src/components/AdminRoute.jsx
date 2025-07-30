import "../styles/AdminRoute.css";

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  if (!user || !user.isAdmin) {
    return (
      <div className="admin-restrict-container">
        <div className="admin-restrict-box">
          <h2>Access Denied</h2>
          <p>Only admin can access this page.</p>
          <img
            src="https://img.freepik.com/premium-vector/access-denied-alert-vector-illustration-design_624938-543.jpg"
            alt="Access Denied"
            className="admin-restrict-img"
          />
        </div>
      </div>
    );
  }

  return children;
};

export default AdminRoute;
