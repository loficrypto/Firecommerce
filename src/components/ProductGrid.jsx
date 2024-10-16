import ProductCard from './ProductCard';

const ProductGrid = ({ products, handleAddToCart }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
            <ProductCard key={product.id} product={product} handleAddToCart={handleAddToCart} />
        ))}
    </div>
);

export default ProductGrid;
