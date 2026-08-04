import { useState } from "react";
import axios from "../api";
import toast from "react-hot-toast";

function AdminProductForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("stock", formData.stock);
      data.append("image", image);

      await axios.post("/api/products", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("✅ Product Added Successfully");

      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        stock: "",
      });

      setImage(null);
      setPreview("");
    } catch (error) {
      console.log(error);
      toast.error("❌ Failed to Add Product");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl rounded-2xl p-8 space-y-5"
    >
      <h2 className="text-3xl font-bold text-center">
        ➕ Add Product
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Product Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        rows="4"
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={formData.stock}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      {/* Image Upload */}
      <label className="cursor-pointer w-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg py-5 transition">
        <span className="text-gray-700 font-semibold">
          📷 {image ? image.name : "Choose Product Image"}
        </span>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            setImage(file);

            if (file) {
              setPreview(URL.createObjectURL(file));
            }
          }}
          className="hidden"
          required
        />
      </label>

      {/* Image Preview */}
      {preview && (
        <div className="flex justify-center">
          <img
            src={preview}
            alt="Preview"
            className="w-48 h-48 object-cover rounded-xl border shadow-md"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold text-lg transition"
      >
        ➕ Add Product
      </button>
    </form>
  );
}

export default AdminProductForm;