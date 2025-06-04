import { mockProducts } from "../data/mockProducts";

// Giả lập độ trễ của API
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getProducts = async (sellerId) => {
  try {
    await delay(500); // Giả lập độ trễ 500ms
    return mockProducts.filter((product) => product.sellerId === sellerId);
  } catch (error) {
    throw new Error("Không thể lấy danh sách sản phẩm");
  }
};

export const getProduct = async (id) => {
  try {
    await delay(300);
    const product = mockProducts.find((p) => p.id === parseInt(id));
    if (!product) {
      throw new Error("Không tìm thấy sản phẩm");
    }
    return product;
  } catch (error) {
    throw new Error(error.message || "Không thể lấy thông tin sản phẩm");
  }
};

export const createProduct = async (productData) => {
  try {
    await delay(500);
    const newProduct = {
      id: mockProducts.length + 1,
      ...productData,
      createdAt: new Date().toISOString(),
    };
    mockProducts.push(newProduct);
    return newProduct;
  } catch (error) {
    throw new Error("Không thể tạo sản phẩm mới");
  }
};

export const updateProduct = async (id, productData) => {
  try {
    await delay(500);
    const index = mockProducts.findIndex((p) => p.id === parseInt(id));
    if (index === -1) {
      throw new Error("Không tìm thấy sản phẩm");
    }
    mockProducts[index] = {
      ...mockProducts[index],
      ...productData,
      updatedAt: new Date().toISOString(),
    };
    return mockProducts[index];
  } catch (error) {
    throw new Error(error.message || "Không thể cập nhật sản phẩm");
  }
};

export const deleteProduct = async (id) => {
  try {
    await delay(500);
    const index = mockProducts.findIndex((p) => p.id === parseInt(id));
    if (index === -1) {
      throw new Error("Không tìm thấy sản phẩm");
    }
   return mockProducts.splice(index, 1);
  } catch (error) {
    throw new Error(error.message || "Không thể xóa sản phẩm");
  }
};

export const searchProducts = async (query) => {
  try {
    await delay(300);
    const searchTerm = query.toLowerCase();
    return mockProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
  } catch (error) {
    throw new Error("Không thể tìm kiếm sản phẩm");
  }
};
