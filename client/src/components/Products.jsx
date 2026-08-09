import { useEffect, useState } from "react";
import axios from "../api";
import toast from "react-hot-toast";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load products");
    }
  };


  const handleAddToCart = async (product) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first");
        return;
      }

      const res = await axios.post(
        "/api/cart/add",
        {
          productId: product._id,
          title: product.title,
          price: product.price,
          image: product.image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add to cart"
      );
    }
  };


  const handleAddToWishlist = async (product) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first");
        return;
      }

      const res = await axios.post(
        "/api/wishlist/add",
        {
          productId: product._id,
          title: product.title,
          price: product.price,
          image: product.image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add to wishlist"
      );
    }
  };


  const filteredProducts = products.filter((product) => {

    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());


    const matchesCategory =
      category === "all" ||
      product.category === category;


    return matchesSearch && matchesCategory;
  });



  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-7xl mx-auto px-5">

        <h1 className="text-4xl font-bold text-center mb-10">
          Featured Products
        </h1>


        {/* Search & Filter */}

        <div className="flex flex-col md:flex-row gap-4 mb-10">

          <input
            type="text"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="flex-1 p-3 rounded-xl border outline-none"
          />


          <select
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
            className="p-3 rounded-xl border"
          >

            <option value="all">
              All Categories
            </option>

            <option value="Mobiles">
              Mobiles
            </option>

            <option value="Electronics">
              Electronics
            </option>

            <option value="Laptops">
              Laptops
            </option>

            <option value="Gaming">
              Gaming
            </option>

            <option value="Accessories">
              Accessories
            </option>

          </select>

        </div>



        {
          filteredProducts.length === 0 ? (

            <h2 className="text-center text-xl text-gray-500">
              No products found.
            </h2>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">


              {
                filteredProducts.map((product)=>(


                  <div
                    key={product._id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition overflow-hidden"
                  >


                    <div className="bg-gray-50 p-6">

                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-56 w-full object-contain"
                      />

                    </div>



                    <div className="p-5">


                      <h2 className="text-lg font-semibold line-clamp-2 min-h-[60px]">
                        {product.title}
                      </h2>



                      <div className="flex justify-between mt-3">

                        <span className="text-yellow-500">
                          ⭐⭐⭐⭐☆
                        </span>

                        <span className="text-gray-500 text-sm">
                          ({product.rating || 100})
                        </span>

                      </div>



                      <p className="text-2xl font-bold text-green-600 mt-3">
                        ₹{product.price}
                      </p>



                      <button
                        onClick={()=>handleAddToCart(product)}
                        className="w-full mt-5 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl font-semibold"
                      >
                        🛒 Add to Cart
                      </button>



                      <button
                        onClick={()=>handleAddToWishlist(product)}
                        className="w-full mt-3 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-semibold"
                      >
                        ❤️ Add to Wishlist
                      </button>


                    </div>


                  </div>


                ))
              }


            </div>

          )
        }


      </div>

    </div>
  );
}

export default Products;