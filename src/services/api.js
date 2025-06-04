import { mockProducts } from "../data/mockProducts";
import { mockOrders } from "../data/mockOrders";

const API_URL = "https://fakestoreapi.com";

// Mock API functions
const mockGetProducts = async (sellerId) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  if(!sellerId) return mockProducts
  return mockProducts.filter((product) => product.sellerId === sellerId);
};

const mockGetProductById = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const product = mockProducts.find((p) => p.id === Number(id));
  console.log("kdha ",id)
  if (!product) throw new Error("Product not found");
  return product;
};

const mockCreateProduct = async (productData) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const newProduct = {
    id: mockProducts.length + 1,
    ...productData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockProducts.push(newProduct);
  return newProduct;
};

const mockUpdateProduct = async (id, productData) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = mockProducts.findIndex((p) => p.id === id);
  if (index === -1) throw new Error("Product not found");
  mockProducts[index] = {
    ...mockProducts[index],
    ...productData,
    updatedAt: new Date().toISOString(),
  };
  return mockProducts[index];
};

const mockDeleteProduct = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = mockProducts.findIndex((p) => p.id === id);
  if (index === -1) throw new Error("Product not found");
  mockProducts.splice(index, 1);
  return { message: "Product deleted successfully" };
};

const mockGetOrders = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockOrders;
};

const mockGetOrderById = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const order = mockOrders.find((o) => o.id === id);
  if (!order) throw new Error("Order not found");
  return order;
};

const mockUpdateOrderStatus = async (id, status) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const order = mockOrders.find((o) => o.id === id);
  if (!order) throw new Error("Order not found");
  order.status = status;
  order.updatedAt = new Date().toISOString();
  return order;
};

// Export mock functions for development
export const getProducts = mockGetProducts;
export const getProductById = mockGetProductById;
export const createProduct = mockCreateProduct;
export const updateProduct = mockUpdateProduct;
export const deleteProduct = mockDeleteProduct;
export const getOrders = mockGetOrders;
export const getOrderById = mockGetOrderById;
export const updateOrderStatus = mockUpdateOrderStatus;
