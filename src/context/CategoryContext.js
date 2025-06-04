import React, { createContext, useContext, useState, useEffect } from "react";
import { getProducts } from "../services/productApi";
import { useAuth } from "./AuthContext";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      const products = await getProducts(user.id);
      const uniqueCategories = [
        ...new Set(products.map((product) => product.category)),
      ].filter(Boolean);
      setCategories(uniqueCategories);
      setLoading(false);
    } catch (err) {
      setError("Không thể tải danh sách danh mục");
      setLoading(false);
    }
  };

  const addCategory = (newCategory) => {
    if (!categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  const updateCategory = (oldCategory, newCategory) => {
    setCategories(
      categories.map((cat) => (cat === oldCategory ? newCategory : cat))
    );
  };

  const deleteCategory = (category) => {
    setCategories(categories.filter((cat) => cat !== category));
  };

  useEffect(() => {
    if (user) {
      fetchCategories();
    }
  }, [user]);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        loading,
        error,
        addCategory,
        updateCategory,
        deleteCategory,
        refreshCategories: fetchCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoryProvider");
  }
  return context;
};
