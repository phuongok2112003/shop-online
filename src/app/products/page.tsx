import ProductCard from '@/components/ProductCard'

// Mock data - In a real application, this would come from an API
const products = [
    {
        id: '1',
        name: 'Wireless Headphones',
        price: 99.99,
        image: '/images/headphones.jpg',
        category: 'Electronics'
    },
    {
        id: '2',
        name: 'Smart Watch',
        price: 199.99,
        image: '/images/smartwatch.jpg',
        category: 'Electronics'
    },
    {
        id: '3',
        name: 'Running Shoes',
        price: 79.99,
        image: '/images/shoes.jpg',
        category: 'Fashion'
    },
    // Add more products as needed
]

export default function ProductsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">All Products</h1>

            {/* Filters */}
            <div className="mb-8">
                <div className="flex gap-4">
                    <select className="border rounded-lg px-4 py-2">
                        <option value="">All Categories</option>
                        <option value="electronics">Electronics</option>
                        <option value="fashion">Fashion</option>
                        <option value="home">Home & Living</option>
                    </select>

                    <select className="border rounded-lg px-4 py-2">
                        <option value="">Sort By</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="newest">Newest First</option>
                    </select>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                        category={product.category}
                    />
                ))}
            </div>
        </div>
    )
} 