import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ViewDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);

  const fetchSingleProduct = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      console.log(data);
      setProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleProduct();
  }, []);

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-50 p-6 lg:p-20">
      {isLoading ? (
        <div className="text-2xl font-semibold text-gray-600 animate-pulse">
          Loading...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 w-full max-w-6xl bg-white shadow-xl rounded-2xl p-8">
          <div className="col-span-1">
            <img
              className="w-full h-full object-contain rounded-xl bg-gray-100 p-4"
              src={product?.image}
              alt={product?.title}
            />
          </div>
          <div className="col-span-2 flex flex-col gap-6">
            <div className="text-xl font-bold text-gray-800">
              <span className="text-gray-600 font-semibold mr-2">Title:</span>
              {product.title}
            </div>

            <div className="text-2xl font-black text-blue-700">
              <span className="text-lg font-semibold text-gray-600 mr-2">Price:</span>
              ${(product.price * 0.9).toFixed(2)}
              <sub className="ml-3 text-gray-400 line-through font-normal text-base">
                ${product.price.toFixed(2)}
              </sub>
            </div>

            <div className="text-gray-700">
              <span className="text-lg font-semibold text-gray-600 mr-2">Description:</span>
              {product.description}
            </div>

            <div className="text-gray-700">
              <span className="text-lg font-semibold text-gray-600 mr-2">Category:</span>
              {product.category}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewDetails;
