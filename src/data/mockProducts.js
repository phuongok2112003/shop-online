// Mock data cho sản phẩm
export const mockProducts = [
  // Seller 1 - Điện thoại
  {
    id: 1,
    name: "iPhone 13 Pro Max",
    description: "iPhone 13 Pro Max 256GB - Hàng chính hãng Apple",
    price: 29990000,
    stock: 50,
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1632661674596-79bd8e9b2cfe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 1,
    rating: {
      rate: 4.9,
      count: 234,
    },
  },
  {
    id: 2,
    name: "Samsung Galaxy S21",
    description: "Điện thoại Samsung Galaxy S21 5G 128GB - Hàng chính hãng",
    price: 19990000,
    stock: 30,
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 1,
    rating: {
      rate: 4.5,
      count: 156,
    },
  },
  // Seller 2 - Thời trang
  {
    id: 3,
    name: "Áo thun nam",
    description: "Áo thun nam cotton 100% - Thiết kế đơn giản",
    price: 299000,
    stock: 100,
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 2,
    rating: {
      rate: 4.2,
      count: 89,
    },
  },
  {
    id: 4,
    name: "Quần jean nữ",
    description: "Quần jean nữ slim fit - Chất liệu cao cấp",
    price: 499000,
    stock: 75,
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 2,
    rating: {
      rate: 4.0,
      count: 120,
    },
  },
  {
    id: 11,
    name: "Áo khoác denim",
    description: "Áo khoác denim unisex - Phong cách streetwear",
    price: 799000,
    stock: 45,
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 2,
    rating: {
      rate: 4.3,
      count: 67,
    },
  },
  {
    id: 12,
    name: "Giày thể thao",
    description: "Giày thể thao nam nữ - Thiết kế hiện đại",
    price: 1299000,
    stock: 60,
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 2,
    rating: {
      rate: 4.5,
      count: 143,
    },
  },
  // Seller 3 - Sách
  {
    id: 5,
    name: "Sách Đắc nhân tâm",
    description: "Sách Đắc nhân tâm - Dale Carnegie",
    price: 89000,
    stock: 200,
    category: "books",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 3,
    rating: {
      rate: 4.8,
      count: 245,
    },
  },
  {
    id: 13,
    name: "Sách Nhà giả kim",
    description: "Sách Nhà giả kim - Paulo Coelho",
    price: 79000,
    stock: 150,
    category: "books",
    image:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 3,
    rating: {
      rate: 4.7,
      count: 198,
    },
  },
  {
    id: 14,
    name: "Sách Tôi thấy hoa vàng trên cỏ xanh",
    description: "Sách Tôi thấy hoa vàng trên cỏ xanh - Nguyễn Nhật Ánh",
    price: 99000,
    stock: 120,
    category: "books",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 3,
    rating: {
      rate: 4.8,
      count: 167,
    },
  },
  // Seller 4 - Đồ gia dụng
  {
    id: 7,
    name: "Máy xay sinh tố",
    description: "Máy xay sinh tố đa năng - Công suất cao",
    price: 890000,
    stock: 60,
    category: "home",
    image:
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 4,
    rating: {
      rate: 4.3,
      count: 78,
    },
  },
  {
    id: 15,
    name: "Nồi cơm điện",
    description: "Nồi cơm điện thông minh - Công nghệ mới",
    price: 1290000,
    stock: 40,
    category: "home",
    image:
      "https://images.unsplash.com/photo-1584990347449-a2d4c2c8c1b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 4,
    rating: {
      rate: 4.4,
      count: 89,
    },
  },
  {
    id: 16,
    name: "Máy hút bụi",
    description: "Máy hút bụi không dây - Công suất mạnh",
    price: 2490000,
    stock: 30,
    category: "home",
    image:
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 4,
    rating: {
      rate: 4.6,
      count: 76,
    },
  },
  // Seller 5 - Mỹ phẩm
  {
    id: 8,
    name: "Kem dưỡng da",
    description: "Kem dưỡng da cao cấp - Chiết xuất thiên nhiên",
    price: 450000,
    stock: 150,
    category: "beauty",
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 5,
    rating: {
      rate: 4.6,
      count: 189,
    },
  },
  {
    id: 9,
    name: "Son môi",
    description: "Son môi lì - Màu sắc đa dạng",
    price: 250000,
    stock: 200,
    category: "beauty",
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 5,
    rating: {
      rate: 4.4,
      count: 167,
    },
  },
  {
    id: 17,
    name: "Sữa rửa mặt",
    description: "Sữa rửa mặt dưỡng ẩm - Chiết xuất tự nhiên",
    price: 350000,
    stock: 180,
    category: "beauty",
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 5,
    rating: {
      rate: 4.5,
      count: 145,
    },
  },
  {
    id: 18,
    name: "Toner dưỡng da",
    description: "Toner cân bằng độ ẩm - Không chứa cồn",
    price: 280000,
    stock: 160,
    category: "beauty",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 5,
    rating: {
      rate: 4.3,
      count: 98,
    },
  },
  // Seller 6 - Thực phẩm
  {
    id: 19,
    name: "Hạt dinh dưỡng",
    description: "Hạt dinh dưỡng tổng hợp - Tốt cho sức khỏe",
    price: 159000,
    stock: 200,
    category: "food",
    image:
      "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 6,
    rating: {
      rate: 4.7,
      count: 134,
    },
  },
  {
    id: 20,
    name: "Trà thảo mộc",
    description: "Trà thảo mộc giảm cân - 100% tự nhiên",
    price: 89000,
    stock: 250,
    category: "food",
    image:
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 6,
    rating: {
      rate: 4.4,
      count: 112,
    },
  },
  // Seller 7 - Đồ chơi
  {
    id: 21,
    name: "Robot thông minh",
    description: "Robot thông minh cho trẻ em - Học tập và giải trí",
    price: 1990000,
    stock: 35,
    category: "toys",
    image:
      "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 7,
    rating: {
      rate: 4.8,
      count: 78,
    },
  },
  {
    id: 22,
    name: "Bộ xếp hình",
    description: "Bộ xếp hình LEGO - Phát triển tư duy",
    price: 1290000,
    stock: 50,
    category: "toys",
    image:
      "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 7,
    rating: {
      rate: 4.6,
      count: 92,
    },
  },
  {
    id: 10,
    name: "Laptop Dell XPS 13",
    description: "Laptop Dell XPS 13 - Intel Core i7, 16GB RAM, 512GB SSD",
    price: 32990000,
    stock: 25,
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 1,
    rating: {
      rate: 4.7,
      count: 112,
    },
  },
  // Seller 8 - Thể thao
  {
    id: 23,
    name: "Vợt cầu lông",
    description: "Vợt cầu lông chuyên nghiệp - Cân nặng 85g",
    price: 890000,
    stock: 40,
    category: "sports",
    image:
      "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 8,
    rating: {
      rate: 4.5,
      count: 67,
    },
  },
  {
    id: 24,
    name: "Bóng đá",
    description: "Bóng đá size 5 - Chất liệu cao cấp",
    price: 450000,
    stock: 60,
    category: "sports",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 8,
    rating: {
      rate: 4.3,
      count: 89,
    },
  },
  // Seller 9 - Đồng hồ
  {
    id: 25,
    name: "Đồng hồ thông minh",
    description: "Đồng hồ thông minh - Theo dõi sức khỏe",
    price: 2490000,
    stock: 35,
    category: "watches",
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 9,
    rating: {
      rate: 4.7,
      count: 156,
    },
  },
  {
    id: 26,
    name: "Đồng hồ cơ",
    description: "Đồng hồ cơ nam - Thiết kế sang trọng",
    price: 3990000,
    stock: 25,
    category: "watches",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 9,
    rating: {
      rate: 4.8,
      count: 92,
    },
  },
  // Seller 10 - Phụ kiện
  {
    id: 27,
    name: "Tai nghe không dây",
    description: "Tai nghe không dây - Chống ồn chủ động",
    price: 1890000,
    stock: 45,
    category: "accessories",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 10,
    rating: {
      rate: 4.6,
      count: 178,
    },
  },
  {
    id: 28,
    name: "Balo laptop",
    description: "Balo laptop chống sốc - Dung tích 15.6 inch",
    price: 890000,
    stock: 55,
    category: "accessories",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 10,
    rating: {
      rate: 4.4,
      count: 134,
    },
  },
  // Seller 11 - Nội thất
  {
    id: 29,
    name: "Ghế văn phòng",
    description: "Ghế văn phòng ergonomic - Chống đau lưng",
    price: 2490000,
    stock: 30,
    category: "furniture",
    image:
      "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 11,
    rating: {
      rate: 4.7,
      count: 89,
    },
  },
  {
    id: 30,
    name: "Bàn làm việc",
    description: "Bàn làm việc gỗ công nghiệp - Thiết kế hiện đại",
    price: 1890000,
    stock: 25,
    category: "furniture",
    image:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 11,
    rating: {
      rate: 4.5,
      count: 67,
    },
  },
  // Seller 17 - Đồ dùng văn phòng
  {
    id: 41,
    name: "Máy in đa năng",
    description: "Máy in đa năng - In, scan, copy",
    price: 3490000,
    stock: 20,
    category: "office",
    image:
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 17,
    rating: {
      rate: 4.7,
      count: 89,
    },
  },
  {
    id: 42,
    name: "Máy tính bảng",
    description: "Máy tính bảng - Màn hình 10 inch",
    price: 5990000,
    stock: 15,
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 17,
    rating: {
      rate: 4.8,
      count: 112,
    },
  },
  // Seller 18 - Đồ dùng nhà bếp
  {
    id: 43,
    name: "Bộ nồi inox",
    description: "Bộ nồi inox cao cấp - 5 món",
    price: 2490000,
    stock: 35,
    category: "home",
    image:
      "https://images.unsplash.com/photo-1584990347449-a2d4c2c8c1b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 18,
    rating: {
      rate: 4.6,
      count: 78,
    },
  },
  {
    id: 44,
    name: "Máy xay thịt",
    description: "Máy xay thịt đa năng - Công suất cao",
    price: 890000,
    stock: 45,
    category: "home",
    image:
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 18,
    rating: {
      rate: 4.5,
      count: 92,
    },
  },
  // Seller 19 - Thực phẩm chức năng
  {
    id: 45,
    name: "Vitamin tổng hợp",
    description: "Vitamin tổng hợp - Tăng cường sức đề kháng",
    price: 450000,
    stock: 120,
    category: "food",
    image:
      "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 19,
    rating: {
      rate: 4.7,
      count: 156,
    },
  },
  {
    id: 46,
    name: "Collagen",
    description: "Collagen thủy phân - Làm đẹp da",
    price: 890000,
    stock: 90,
    category: "food",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 19,
    rating: {
      rate: 4.5,
      count: 134,
    },
  },
  // Seller 20 - Đồ điện gia dụng
  {
    id: 47,
    name: "Máy lọc không khí",
    description: "Máy lọc không khí thông minh - Lọc bụi mịn",
    price: 3490000,
    stock: 30,
    category: "home",
    image:
      "https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 20,
    rating: {
      rate: 4.8,
      count: 92,
    },
  },
  {
    id: 48,
    name: "Máy sấy quần áo",
    description: "Máy sấy quần áo công nghệ mới - Tiết kiệm điện",
    price: 2490000,
    stock: 25,
    category: "home",
    image:
      "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 20,
    rating: {
      rate: 4.6,
      count: 78,
    },
  },
  // Seller 21 - Đồ chơi trẻ em
  {
    id: 49,
    name: "Búp bê Barbie",
    description: "Búp bê Barbie thời trang - Bộ sưu tập mới",
    price: 450000,
    stock: 80,
    category: "toys",
    image:
      "https://images.unsplash.com/photo-1562040506-a9b32cb51b94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 21,
    rating: {
      rate: 4.6,
      count: 112,
    },
  },
  {
    id: 50,
    name: "Xe điều khiển",
    description: "Xe điều khiển từ xa - Tốc độ cao",
    price: 890000,
    stock: 45,
    category: "toys",
    image:
      "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 21,
    rating: {
      rate: 4.4,
      count: 78,
    },
  },
  // Seller 22 - Thể thao
  {
    id: 51,
    name: "Vợt cầu lông",
    description: "Vợt cầu lông chuyên nghiệp - Cân nặng 85g",
    price: 890000,
    stock: 40,
    category: "sports",
    image:
      "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 22,
    rating: {
      rate: 4.5,
      count: 67,
    },
  },
  {
    id: 52,
    name: "Bóng đá",
    description: "Bóng đá size 5 - Chất liệu cao cấp",
    price: 450000,
    stock: 60,
    category: "sports",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 22,
    rating: {
      rate: 4.3,
      count: 89,
    },
  },
  // Seller 23 - Đồng hồ
  {
    id: 53,
    name: "Đồng hồ thông minh",
    description: "Đồng hồ thông minh - Theo dõi sức khỏe",
    price: 2490000,
    stock: 35,
    category: "watches",
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 23,
    rating: {
      rate: 4.7,
      count: 156,
    },
  },
  {
    id: 54,
    name: "Đồng hồ cơ",
    description: "Đồng hồ cơ nam - Thiết kế sang trọng",
    price: 3990000,
    stock: 25,
    category: "watches",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 23,
    rating: {
      rate: 4.8,
      count: 92,
    },
  },
  // Seller 24 - Phụ kiện
  {
    id: 55,
    name: "Tai nghe không dây",
    description: "Tai nghe không dây - Chống ồn chủ động",
    price: 1890000,
    stock: 45,
    category: "accessories",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 24,
    rating: {
      rate: 4.6,
      count: 178,
    },
  },
  {
    id: 56,
    name: "Balo laptop",
    description: "Balo laptop chống sốc - Dung tích 15.6 inch",
    price: 890000,
    stock: 55,
    category: "accessories",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 24,
    rating: {
      rate: 4.4,
      count: 134,
    },
  },
  // Seller 25 - Nội thất
  {
    id: 57,
    name: "Ghế văn phòng",
    description: "Ghế văn phòng ergonomic - Chống đau lưng",
    price: 2490000,
    stock: 30,
    category: "furniture",
    image:
      "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 25,
    rating: {
      rate: 4.7,
      count: 89,
    },
  },
  {
    id: 58,
    name: "Bàn làm việc",
    description: "Bàn làm việc gỗ công nghiệp - Thiết kế hiện đại",
    price: 1890000,
    stock: 25,
    category: "furniture",
    image:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 25,
    rating: {
      rate: 4.5,
      count: 67,
    },
  },
  // Seller 26 - Mỹ phẩm
  {
    id: 59,
    name: "Kem chống nắng",
    description: "Kem chống nắng SPF50+ - Bảo vệ da",
    price: 350000,
    stock: 100,
    category: "beauty",
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 26,
    rating: {
      rate: 4.6,
      count: 145,
    },
  },
  {
    id: 60,
    name: "Tẩy trang",
    description: "Nước tẩy trang dịu nhẹ - Cho mọi loại da",
    price: 280000,
    stock: 120,
    category: "beauty",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    status: "active",
    sellerId: 26,
    rating: {
      rate: 4.4,
      count: 98,
    },
  },
];
