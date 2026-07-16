export default function Navbar({ search, setSearch }) {
  return (
    <nav className="navbar">
      <div className="container">
        <h2 className="navbar-brand">PRODUCT LISTING</h2>

        <input
          type="text"
          className="form-control"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </nav>
  );
}