import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating_rate: "",
    rating_count: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/getProduct");
      console.log("API response:", res.data);
  
      const productsArray = res.data.Products || res.data.products || res.data;
  
      if (Array.isArray(productsArray)) {
        setProducts(productsArray);
      } else {
        console.error("Unexpected response format", res.data);
        alert("Unexpected data format received.");
      }
    } catch (err) {
      alert("Failed to fetch products." , err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const clearForm = () => {
    setForm({
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
      rating_rate: "",
      rating_count: "",
    });
    setEditingId(null);
  };

  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:3000/addProduct", {
        ...form,
        price: parseFloat(form.price),
        rating_rate: parseFloat(form.rating_rate),
        rating_count: parseInt(form.rating_count),
      });
      fetchProducts();
      alert("Product added successfully!");
      clearForm();
    } catch (error) {
      alert("Error adding product");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/deleteProduct/${id}`);
      fetchProducts();
      alert("Product deleted successfully!");
    } catch (error) {
      alert("Error deleting product");
      console.error(error);
    }
  };

  const handleEdit = (product) => {
    setForm({ ...product });
    setEditingId(product.id);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/updateProduct/${editingId}`, {
        ...form,
        price: parseFloat(form.price),
        rating_rate: parseFloat(form.rating_rate),
        rating_count: parseInt(form.rating_count),
      });
      fetchProducts();
      alert("Product updated successfully!");
      clearForm();
    } catch (error) {
      alert("Error updating product");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>
        <p className="text-center mb-6 text-gray-600">Logged in as: {user?.email}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {Object.keys(form).map((field) => (
            <input
              key={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={field.replace("_", " ")}
              className="px-3 py-2 border border-gray-300 rounded w-full"
            />
          ))}
        </div>

        {editingId ? (
          <button
            onClick={handleUpdate}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded mb-6"
          >
            Update Product
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-6"
          >
            Add Product
          </button>
        )}


        <h2 className="text-xl font-semibold mb-4">Product List</h2>
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="p-4 border border-gray-200 rounded shadow-sm bg-gray-50"
            >
              <h3 className="font-bold text-lg">{product.title}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <div className="flex items-center gap-4 mt-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
