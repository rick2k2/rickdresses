import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/AdminUpdateProducts.css";

const AdminUpdateProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    brand: "",
    category: "",
    countInStock: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/products/${id}`
        );
        setProduct(res.data);
      } catch (err) {
        toast.error("Failed to fetch product data.");
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.entries(product).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (imageFile) {
        formData.append("image", imageFile);
      }

      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/products/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // if you're using cookies for auth
        }
      );

      toast.success("✅ Product updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to update product.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="update-form">
      <h2>Update Product</h2>
      <input
        name="name"
        value={product.name}
        onChange={handleChange}
        required
      />
      <input
        name="price"
        type="number"
        value={product.price}
        onChange={handleChange}
        required
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <input
        name="brand"
        value={product.brand}
        onChange={handleChange}
        required
      />
      <input
        name="category"
        value={product.category}
        onChange={handleChange}
        required
      />
      <input
        name="countInStock"
        type="number"
        value={product.countInStock}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        value={product.description}
        onChange={handleChange}
      ></textarea>
      <button type="submit">Update</button>
    </form>
  );
};

export default AdminUpdateProduct;
