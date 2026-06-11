import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  ImagePlus,
  PackagePlus,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";

const BACKEND_API = import.meta.env.VITE_BACKEND_API;

const emptyVariant = {
  size: "",
  color: "",
  storage: "",
  weight: "",
  price: "",
  stock: "",
};

const emptyAttribute = {
  key: "",
  value: "",
};

const AddProductPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState([]);
  const [variants, setVariants] = useState([{ ...emptyVariant }]);
  const [attributes, setAttributes] = useState([{ ...emptyAttribute }]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    originalPrice: "",
    rating: "",
    reviews: "",
  });

  const imagePreviews = useMemo(
    () =>
      images.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      })),
    [images]
  );

  useEffect(() => {
    return () => {
      imagePreviews.forEach((image) => URL.revokeObjectURL(image.url));
    };
  }, [imagePreviews]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    setImages((current) => [...current, ...selectedFiles].slice(0, 8));
  };

  const removeImage = (index) => {
    setImages((current) => current.filter((_, imageIndex) => imageIndex !== index));
  };

  const updateVariant = (index, field, value) => {
    setVariants((current) =>
      current.map((variant, variantIndex) =>
        variantIndex === index ? { ...variant, [field]: value } : variant
      )
    );
  };

  const updateAttribute = (index, field, value) => {
    setAttributes((current) =>
      current.map((attribute, attributeIndex) =>
        attributeIndex === index ? { ...attribute, [field]: value } : attribute
      )
    );
  };

  const buildAttributes = () => {
    const customAttributes = attributes.reduce((acc, attribute) => {
      if (attribute.key.trim()) {
        acc[attribute.key.trim()] = attribute.value;
      }
      return acc;
    }, {});

    return {
      ...customAttributes,
      ...(formData.originalPrice ? { originalPrice: Number(formData.originalPrice) } : {}),
      ...(formData.rating ? { rating: Number(formData.rating) } : {}),
      ...(formData.reviews ? { reviews: Number(formData.reviews) } : {}),
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.price) {
      toast.error("Product name and price are required.");
      return;
    }

    if (!images.length) {
      toast.error("Please add at least one product image.");
      return;
    }

    const cleanedVariants = variants
      .filter((variant) => Object.values(variant).some((value) => String(value).trim()))
      .map((variant) => ({
        ...variant,
        price: variant.price ? Number(variant.price) : undefined,
        stock: variant.stock ? Number(variant.stock) : undefined,
      }));

    const payload = new FormData();
    payload.append("name", formData.name.trim());
    payload.append("description", formData.description);
    payload.append("price", formData.price);
    payload.append("category", formData.category.trim());
    payload.append("brand", formData.brand.trim());
    payload.append("stock", formData.stock || 0);
    payload.append("variants", JSON.stringify(cleanedVariants));
    payload.append("attributes", JSON.stringify(buildAttributes()));

    images.forEach((image) => {
      payload.append("images", image);
    });

    setIsSubmitting(true);

    try {
      await axios.post(`${BACKEND_API}/ProductRoute`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product added successfully.");
      setTimeout(() => navigate("/shop"), 700);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <Toaster position="top-right" />

      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col gap-2">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700">
            <PackagePlus className="h-4 w-4" />
            Product Manager
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
          <p className="max-w-2xl text-gray-600">
            Add product details, upload images, define stock, and create variants
            for size, color, storage, or weight.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_380px]">
          <section className="space-y-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-lg font-bold text-gray-900">Basic Information</h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="md:col-span-2">
                  <span className="mb-1 block text-sm font-semibold text-gray-700">Product Name *</span>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    placeholder="Samsung Galaxy S24 Ultra"
                  />
                </label>

                <label>
                  <span className="mb-1 block text-sm font-semibold text-gray-700">Category</span>
                  <input
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    placeholder="Electronics"
                  />
                </label>

                <label>
                  <span className="mb-1 block text-sm font-semibold text-gray-700">Brand</span>
                  <input
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    placeholder="Samsung"
                  />
                </label>

                <label>
                  <span className="mb-1 block text-sm font-semibold text-gray-700">Price *</span>
                  <input
                    type="number"
                    min="0"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    placeholder="139999"
                  />
                </label>

                <label>
                  <span className="mb-1 block text-sm font-semibold text-gray-700">Stock</span>
                  <input
                    type="number"
                    min="0"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    placeholder="20"
                  />
                </label>

                <label className="md:col-span-2">
                  <span className="mb-1 block text-sm font-semibold text-gray-700">Description</span>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="5"
                    className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    placeholder="Write clear product details, specs, and selling points..."
                  />
                </label>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-lg font-bold text-gray-900">Variants</h2>
                <button
                  type="button"
                  onClick={() => setVariants((current) => [...current, { ...emptyVariant }])}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-100"
                >
                  <Plus className="h-4 w-4" />
                  Add Variant
                </button>
              </div>

              <div className="space-y-4">
                {variants.map((variant, index) => (
                  <div key={index} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="font-semibold text-gray-800">Variant {index + 1}</p>
                      {variants.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setVariants((current) => current.filter((_, itemIndex) => itemIndex !== index))}
                          className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                      {["size", "color", "storage", "weight", "price", "stock"].map((field) => (
                        <input
                          key={field}
                          type={["price", "stock"].includes(field) ? "number" : "text"}
                          min="0"
                          value={variant[field]}
                          onChange={(e) => updateVariant(index, field, e.target.value)}
                          className="rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500"
                          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-lg font-bold text-gray-900">Extra Attributes</h2>
                <button
                  type="button"
                  onClick={() => setAttributes((current) => [...current, { ...emptyAttribute }])}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-100"
                >
                  <Plus className="h-4 w-4" />
                  Add Attribute
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <input
                  type="number"
                  min="0"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  className="rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-emerald-500"
                  placeholder="Original price"
                />
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-emerald-500"
                  placeholder="Rating"
                />
                <input
                  type="number"
                  min="0"
                  name="reviews"
                  value={formData.reviews}
                  onChange={handleInputChange}
                  className="rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-emerald-500"
                  placeholder="Review count"
                />
              </div>

              <div className="mt-4 space-y-3">
                {attributes.map((attribute, index) => (
                  <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-3">
                    <input
                      value={attribute.key}
                      onChange={(e) => updateAttribute(index, "key", e.target.value)}
                      className="rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-emerald-500"
                      placeholder="Key, e.g. Warranty"
                    />
                    <input
                      value={attribute.value}
                      onChange={(e) => updateAttribute(index, "value", e.target.value)}
                      className="rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-emerald-500"
                      placeholder="Value, e.g. 2 years"
                    />
                    <button
                      type="button"
                      onClick={() => setAttributes((current) => current.filter((_, itemIndex) => itemIndex !== index))}
                      className="rounded-xl px-3 text-red-500 hover:bg-red-50"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-gray-900">Product Images *</h2>

              <label className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/60 p-6 text-center hover:bg-emerald-50">
                <ImagePlus className="mb-3 h-10 w-10 text-emerald-600" />
                <span className="font-semibold text-gray-800">Upload images</span>
                <span className="mt-1 text-sm text-gray-500">PNG, JPG, WEBP up to 5MB each</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {imagePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {imagePreviews.map((image, index) => (
                    <div key={image.url} className="group relative overflow-hidden rounded-xl border border-gray-100">
                      <img src={image.url} alt={image.name} className="h-32 w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-3 font-bold text-white shadow-lg transition-all hover:scale-[1.01] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
              >
                <Save className="h-5 w-5" />
                {isSubmitting ? "Saving Product..." : "Save Product"}
              </button>
              <p className="mt-3 text-center text-xs text-gray-500">
                Product will appear on the shop page after it is saved.
              </p>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
};

export default AddProductPage;
