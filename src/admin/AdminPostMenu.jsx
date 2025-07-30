import { Link } from "react-router-dom";
import "../styles/AdminPostMenu.css";

const AdminPostMenu = () => {
  return (
    <div className="admin-products">
      <h2>Admin Post Panel</h2>
      <div className="admin-buttons">
        <Link to="/admin/post/create" className="btn">
          Create New Post
        </Link>
        <Link to="/admin/post/update" className="btn">
          Update Post
        </Link>
        <Link to="/admin/post/delete" className="btn">
          Delete Post
        </Link>
        <Link to="/admin/post/all" className="btn">
          Show All Post
        </Link>
      </div>
    </div>
  );
};

export default AdminPostMenu;
