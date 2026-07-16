import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

export default function Home({ products }) {
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, products]);

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 16px" }}>
        {loading ? (
          <Loader />
        ) : filteredProducts.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <h3>No Products Found 😔</h3>
          </div>
        ) : (
          /* Native Grid Layout Container */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "24px",
            }}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* CRITICAL LAYOUT & IMAGE FIXES */}
      <style jsx global>{`
        body {
          background-color: #f8fafc !important;
          margin: 0;
          padding: 0;
          font-family: sans-serif;
        }

        .my-product-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .my-product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .my-image-wrapper {
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          background: #ffffff;
          border-bottom: 1px solid #f1f5f9;
        }

        /* THIS FORCES IMAGES TO STAY IN THEIR CARDS */
        .my-image-wrapper img {
          max-width: 100% !important;
          max-height: 100% !important;
          width: auto !important;
          height: auto !important;
          object-fit: contain !important;
        }

        .my-card-body {
          padding: 16px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .my-card-title {
          font-size: 14px;
          font-weight: 600;
          color: #0f172a;
          margin: 0 0 8px 0;
          line-height: 1.4;
          height: 40px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .my-category-badge {
          font-size: 10px;
          text-transform: uppercase;
          background: #f1f5f9;
          color: #64748b;
          padding: 3px 8px;
          border-radius: 4px;
          font-weight: 500;
          align-self: flex-start;
          margin-bottom: 16px;
        }

        .my-footer-row {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .my-price {
          font-size: 18px;
          font-weight: 700;
          color: #2563eb;
        }

        .my-rating {
          font-size: 12px;
          color: #eab308;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    return { props: { products } };
  } catch (error) {
    return { props: { products: [] } };
  }
}