import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
    return (
        <div className="container mx-auto px-4">
            {/* Hero Section */}
            <section className="py-12">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Welcome to Shop Online</h1>
                    <p className="text-xl text-gray-600 mb-8">Discover amazing products at great prices</p>
                    <Link
                        href="/products"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Shop Now
                    </Link>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="py-12">
                <h2 className="text-2xl font-bold mb-6">Featured Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {['Electronics', 'Fashion', 'Home & Living'].map((category) => (
                        <div key={category} className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-2">{category}</h3>
                            <Link
                                href={`/category/${category.toLowerCase()}`}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                View Products →
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
} 