import ProductCard from './ProductCard';

const ProductGrid = ({ products, handlePurchase }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
            <ProductCard key={product.id} product={product} handlePurchase={handlePurchase} />
        ))}
    </div>
);

export default ProductGrid;
