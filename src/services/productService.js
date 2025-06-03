// Dữ liệu mẫu
let products = [
  {
    id: 1,
    name: "iPhone 13 Pro",
    price: 27990000,
    description: "iPhone 13 Pro với chip A15 Bionic, camera 3 ống kính",
    image: "https://example.com/iphone13pro.jpg",
    category: "Điện thoại",
  },
  {
    id: 2,
    name: "Samsung Galaxy S21",
    price: 19990000,
    description: "Samsung Galaxy S21 với camera 64MP",
    image: "https://example.com/galaxys21.jpg",
    category: "Điện thoại",
  },
  {
    id: 3,
    name: "MacBook Pro M1",
    price: 32990000,
    description: "MacBook Pro với chip M1, màn hình Retina",
    image: "https://example.com/macbookpro.jpg",
    category: "Laptop",
  },
];

// Giả lập độ trễ của API
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const productService = {
  // Lấy danh sách sản phẩm
  getAll: async () => {
    await delay(500); // Giả lập độ trễ 500ms
    return [...products];
  },

  // Lấy chi tiết sản phẩm
  getById: async (id) => {
    await delay(300);
    const product = products.find((p) => p.id === Number(id));
    if (!product) {
      throw new Error("Không tìm thấy sản phẩm");
    }
    return { ...product };
  },

  // Thêm sản phẩm mới
  create: async (productData) => {
    await delay(500);
    const newProduct = {
      id: products.length + 1,
      ...productData,
    };
    products.push(newProduct);
    return { ...newProduct };
  },

  // Cập nhật sản phẩm
  update: async (id, productData) => {
    await delay(500);
    const index = products.findIndex((p) => p.id === Number(id));
    if (index === -1) {
      throw new Error("Không tìm thấy sản phẩm");
    }
    products[index] = { ...products[index], ...productData };
    return { ...products[index] };
  },

  // Xóa sản phẩm
  delete: async (id) => {
    await delay(500);
    const index = products.findIndex((p) => p.id === Number(id));
    if (index === -1) {
      throw new Error("Không tìm thấy sản phẩm");
    }
    products = products.filter((p) => p.id !== Number(id));
    return true;
  },
};

export default productService;
