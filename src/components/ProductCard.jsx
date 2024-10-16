const ProductCard = ({ product, handlePurchase }) => (
    <div className="bg-white p-4 rounded shadow mb-4">
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded" />
        <h2 className="text-2xl font-semibold mt-2">{product.name}</h2>
        <p className="text-lg">{product.description}</p>
        <p className="text-lg font-bold mt-2">${product.price}</p>
        <button
            onClick={() => handlePurchase(product)}
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
        >
            Buy with USDT
        </button>
    </div>
);

export default ProductCard;
