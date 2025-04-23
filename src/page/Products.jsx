import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Products = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${selectedId}`);
      setProducts((prev) => prev.filter((p) => p.id !== selectedId));
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product deleted!',
      });
    } catch (error) {
      console.log(error);
    } finally {
      setShowModal(false);
    }
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setNewTitle(product.title);
  };

  const handleSave = async (id) => {
    try {
      const res = await axios.put(`https://fakestoreapi.com/products/${id}`, {
        title: newTitle,
      });
      setProducts((prev) =>
        prev.map((product) =>
          product.id === id ? { ...product, title: res.data.title } : product
        )
      );
      setEditId(null);
      setNewTitle('');
      Swal.fire({
        icon: 'success',
        title: 'Title Updated',
        text: 'The product title was updated successfully.',
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {!isLoading && (
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          🛒 Products Available: {products.length}
        </h2>
      )}

      <div className="flex flex-wrap justify-center gap-6">
        {!isLoading ? (
          products.map((product) => (
            <div
              key={product.id}
              className="w-full sm:w-[300px] bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-60 object-contain mb-4"
              />
              {editId === product.id ? (
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-2 py-1 border rounded-md text-sm mb-2"
                />
              ) : (
                <h3 className="text-base font-semibold text-gray-700 mb-1">
                  {product.title}
                </h3>
              )}
              <p className="text-sm text-gray-500 mb-1">
                ⭐ {product.rating.count} reviews
              </p>
              <p className="text-sm text-gray-500 mb-4">${product.price}</p>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md text-sm shadow"
                >
                  View Details
                </button>
                <button
                  onClick={() => confirmDelete(product.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm shadow"
                >
                  Delete
                </button>
                {editId === product.id ? (
                  <>
                    <button
                      onClick={() => handleSave(product.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md text-sm shadow"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditId(null);
                        setNewTitle('');
                      }}
                      className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1 rounded-md text-sm shadow"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-md text-sm shadow"
                  >
                    Edit Title
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="w-full flex flex-col justify-center items-center h-screen">
            <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-4"></div>
            <h1 className="text-2xl font-semibold text-gray-600 animate-pulse">
              Loading...
            </h1>
          </div>
        )}
      </div>

      {/* 🔥 Delete Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-10 flex flex-col gap-8 w-[90%] max-w-md animate-fadeIn">
            <h1 className="text-2xl font-semibold text-center text-gray-800">
              Are you sure you want to delete?
            </h1>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 rounded-lg border border-green-500 text-green-600 hover:bg-green-50 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition duration-200"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
