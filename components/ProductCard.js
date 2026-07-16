export default function ProductCard({ product }) {
  return (
    <div className="my-product-card">
      
      {/* Container holding the image */}
      <div className="my-image-wrapper">
        <img src={product.image} alt={product.title} />
      </div>

      {/* Container holding text details */}
      <div className="my-card-body">
        <h5 className="my-card-title">{product.title}</h5>
        <span className="my-category-badge">{product.category}</span>
        
        <div className="my-footer-row">
          <div className="my-price">${product.price}</div>
          <div className="my-rating">
            ⭐ {product.rating?.rate} ({product.rating?.count})
          </div>
        </div>
      </div>

    </div>
  );
}