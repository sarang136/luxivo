import React, { useEffect, useState } from "react";
import { useAddProductMutation, useGetCategoriesQuery } from "../redux/productsApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("Men");
  const [categoryImage, setCategoryImage] = useState(null);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const [products, setProducts] = useState([
    {
      product_type: "",
      product_name: "",
      product_price: "",
      product_description: "",
      product_fabric: "",
      images: [],
    },
  ]);

  const [addProduct, { isLoading }] = useAddProductMutation();
  const { data: categoriesData } = useGetCategoriesQuery();
  const [stateForGetCats, setStateForGetCat] = useState([]);

  useEffect(() => {
    if (categoriesData?.data) {
      setStateForGetCat(categoriesData.data);
    }
  }, [categoriesData]);

  const handleProductChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };

  const handleImageChange = (index, fileList) => {
    const files = Array.from(fileList);
    const updated = [...products];
    updated[index].images = files;
    setProducts(updated);
  };

  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        product_type: "",
        product_name: "",
        product_price: "",
        product_fabric: "",
        product_description: "",
        images: [],
      },
    ]);
  };

  const handleCategoryChange = (e) => {
    const inputValue = e.target.value;
    setCategory(inputValue);

    if (inputValue.trim().length === 0) {
      setFilteredCategories([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = stateForGetCats.filter((cat) =>
      cat.toLowerCase().startsWith(inputValue.toLowerCase())
    );

    setFilteredCategories(filtered);
    setShowSuggestions(true);
  };

  const handleSelectCategory = (cat) => {
    setCategory(cat);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("product_catagory", category);
    formData.append("gender", gender);
    formData.append("product_catagory_image", categoryImage);

    const productArray = products.map(
      ({
        product_type,
        product_name,
        product_price,
        product_fabric,
        product_description,
      }) => ({
        product_type,
        product_name,
        product_price: Number(product_price),
        product_description,
        product_fabric,
      })
    );

    formData.append("product_array", JSON.stringify(productArray));

    products.forEach((prod, index) => {
      [...prod.images].forEach((file) => {
        formData.append(`product_images[${index}]`, file);
      });
    });

    try {
      const res = await addProduct(formData).unwrap();
      toast.success("Product Added Successfully!");
      toast.success("Please Check The Category in which the product is added!");
      navigate("/categories");
      console.log(res);
    } catch (error) {
      console.error("Add failed:", error);
      alert("Failed to add product");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-lg relative">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
          <div className="relative">
            <label className="block font-medium mb-1 text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              value={category}
              onChange={handleCategoryChange}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search or create category..."
              required
            />

            {showSuggestions && filteredCategories.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-300 rounded w-full max-h-40 overflow-y-auto mt-1 shadow">
                {filteredCategories.map((cat, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectCategory(cat)}
                    className="p-2 cursor-pointer hover:bg-blue-100"
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Men</option>
              <option>Women</option>
              <option>Unisex</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block font-medium mb-1 text-gray-700">
              Category Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCategoryImage(e.target.files[0])}
              className="w-full text-sm"
              required
            />
          </div>
        </div>

        <div className="space-y-6">
          {products.map((product, idx) => (
            <div
              key={idx}
              className="bg-gray-100 p-6 rounded-lg border border-gray-300"
            >
              <h4 className="font-semibold text-lg mb-4 text-blue-700">
                Product {idx + 1}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Product Type"
                  value={product.product_type}
                  onChange={(e) =>
                    handleProductChange(idx, "product_type", e.target.value)
                  }
                  className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

                <input
                  type="text"
                  placeholder="Product Name"
                  value={product.product_name}
                  onChange={(e) =>
                    handleProductChange(idx, "product_name", e.target.value)
                  }
                  className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

                <input
                  type="number"
                  placeholder="Product Price"
                  value={product.product_price}
                  onChange={(e) =>
                    handleProductChange(idx, "product_price", e.target.value)
                  }
                  className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageChange(idx, e.target.files)}
                  className="w-full text-sm mt-2"
                  required
                />

                <input
                  type="text"
                  placeholder="Add Description"
                  value={product.product_description}
                  onChange={(e) =>
                    handleProductChange(
                      idx,
                      "product_description",
                      e.target.value
                    )
                  }
                  className="w-full text-sm mt-2 p-4 rounded-md border border-gray-300"
                  required
                />

                <input
                  type="text"
                  placeholder="Product Fabric"
                  value={product.product_fabric}
                  onChange={(e) =>
                    handleProductChange(idx, "product_fabric", e.target.value)
                  }
                  className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleAddProduct}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition duration-200"
          >
            + Add More Product Type
          </button>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Submitting" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
