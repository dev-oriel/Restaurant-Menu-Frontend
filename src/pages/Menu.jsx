import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Menu = () => {
  const [products, setProducts] = useState([]);
  const { addToCart, cartItems, setTableNumber } = useContext(CartContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const table = searchParams.get("table");

  useEffect(() => {
    if (table) setTableNumber(table);

    const fetchProducts = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/menu`);
      setProducts(data);
    };
    fetchProducts();
  }, [table]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Table {table || "Unknown"} Menu
      </h1>

      {cartItems.length > 0 && (
        <div
          className="fixed bottom-4 right-4 bg-green-600 text-white p-3 rounded-full shadow-lg cursor-pointer z-50"
          onClick={() => navigate("/checkout")}
        >
          View Cart ({cartItems.reduce((a, c) => a + c.qty, 0)})
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="border p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-500 text-sm">{product.description}</p>
              <p className="font-bold mt-1">KES {product.price}</p>
            </div>
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              onClick={() => addToCart(product)}
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
