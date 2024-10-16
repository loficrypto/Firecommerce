const ProductCard = ({ product, handleAddToCart }) => (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-md" />
        <div className="mt-4">
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-lg font-bold mt-2">${product.price}</p>
            <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
            >
                Add to Cart
            </button>
        </div>
    </div>
);

export default ProductCard;
