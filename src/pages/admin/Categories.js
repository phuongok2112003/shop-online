import React, { useState } from "react";
import { useCategories } from "~/context/CategoryContext";

const Categories = () => {
  const {
    categories,
    loading,
    error,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useCategories();
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [localError, setLocalError] = useState(null);

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    if (categories.includes(newCategory.trim())) {
      setLocalError("Danh mục này đã tồn tại");
      return;
    }
    addCategory(newCategory.trim());
    setNewCategory("");
    setLocalError(null);
  };

  const handleEditCategory = (oldCategory) => {
    setEditingCategory(oldCategory);
    setNewCategory(oldCategory);
  };

  const handleUpdateCategory = () => {
    if (!newCategory.trim()) return;
    if (
      categories.includes(newCategory.trim()) &&
      newCategory !== editingCategory
    ) {
      setLocalError("Danh mục này đã tồn tại");
      return;
    }
    updateCategory(editingCategory, newCategory.trim());
    setEditingCategory(null);
    setNewCategory("");
    setLocalError(null);
  };

  const handleDeleteCategory = (category) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      deleteCategory(category);
    }
  };

  if (loading) return <div className="text-center p-4">Đang tải...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Quản lý danh mục</h1>

      {(error || localError) && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error || localError}
        </div>
      )}

      {/* Form thêm/sửa danh mục */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">
          {editingCategory ? "Sửa danh mục" : "Thêm danh mục mới"}
        </h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Nhập tên danh mục"
            className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {editingCategory ? "Cập nhật" : "Thêm"}
          </button>
          {editingCategory && (
            <button
              onClick={() => {
                setEditingCategory(null);
                setNewCategory("");
                setLocalError(null);
              }}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Hủy
            </button>
          )}
        </div>
      </div>

      {/* Danh sách danh mục */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên danh mục
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map((category, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
