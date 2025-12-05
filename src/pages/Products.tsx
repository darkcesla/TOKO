import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import "../assets/css/style_toko_produk.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import banner1 from "../assets/img/banner/banner1.png";
import banner2 from "../assets/img/banner/banner2.png";
import banner3 from "../assets/img/banner/banner3.png";
import gambar1 from "../assets/img/gambar1.png";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const { addToCart } = useCart();
  const [qtyLocal, setQtyLocal] = useState<{ [key: number]: number }>({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((p: any) => ({
          id: p.id,
          title: p.title,
          price: p.price,
          image: p.image,
        }));
        setProducts(formatted);
      });
  }, []);

  const increaseLocal = (id: number) => {
    setQtyLocal((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decreaseLocal = (id: number) => {
    setQtyLocal((prev) => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : 0,
    }));
  };

  const addToCartWithQty = (p: any) => {
    const qty = qtyLocal[p.id] || 0;
    if (qty === 0) return;
    addToCart(p, qty);
    setQtyLocal((prev) => ({ ...prev, [p.id]: 0 }));
  };

  return (
    <>
      <nav className="navbar bg-white shadow-sm py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <h3 className="fw-bold mb-0">
            <span style={{ color: "white", WebkitTextStroke: "2px black" }}>TOKO</span>
          </h3>
          <button className="btn btn-outline-dark position-relative" title="Keranjang saya" onClick={() => navigate("/cart")}>
            <i className="bi bi-cart fs-5"></i>
          </button>
        </div>
      </nav>

      <div id="promoCarousel" className="carousel slide mt-1 w-100" data-bs-ride="carousel">
        <div className="carousel-inner rounded-4 shadow-sm">
          <div className="carousel-item active">
            <img src={banner1} className="d-block w-100" style={{ height: 500, objectFit: "cover" }} />
            {/* <img src="../src/assets/img/banner/banner1.png" className="d-block w-100" style={{ height: 500, objectFit: "cover" }} /> */}
          </div>
          <div className="carousel-item">
            <img src={banner2} className="d-block w-100" style={{ height: 500, objectFit: "cover" }} />
            {/* <img src="../src/assets/img/banner/banner2.png" className="d-block w-100" style={{ height: 500, objectFit: "cover" }} /> */}
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#promoCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#promoCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      <div className="container mt-4">
        <div className="cari d-flex mb-4 shadow-sm">
          <select className="form-select w-auto px-3 border-0">
            <option>Semua Kategori</option>
            <option>Elektronik</option>
            <option>Pakaian</option>
            <option>Aksesoris</option>
          </select>
          <input type="text" className="form-control px-3" placeholder="Cari produk..." />
          <span className="d-flex align-items-center px-3">
            <i className="bi bi-search fs-5 text-secondary"></i>
          </span>
        </div>

        <div className="row g-4">
          {products.map((p) => (
            <div className="col-6 col-lg-3 d-flex" key={p.id}>
              <div className="card kartu border-0 shadow-sm p-2 w-100 d-flex flex-column" style={{ minHeight: 420 }}>
                <img
                  src={p.image}
                  className="card-img-top rounded-4"
                  style={{ height: 200, objectFit: "contain", padding: "2px" }}
                />

                <div className="card-body d-flex flex-column">
                  <h6 className="fw-semibold" style={{ minHeight: 48 }}>
                    {p.title.length > 50 ? p.title.substring(0, 50) + "..." : p.title}
                  </h6>

                  <p className="text-muted mb-2">Rp {p.price.toLocaleString()}</p>

                  <div className="d-flex align-items-center mb-3">
                    <button className="btn btn-outline-secondary qty-btn" onClick={() => decreaseLocal(p.id)}>
                      <i className="bi bi-dash-lg"></i>
                    </button>

                    <span className="mx-3 fw-semibold">{qtyLocal[p.id] || 0}</span>

                    <button className="btn btn-outline-secondary qty-btn" onClick={() => increaseLocal(p.id)}>
                      <i className="bi bi-plus-lg"></i>
                    </button>
                  </div>

                  <div className="d-flex gap-2 mt-auto">
                    <button className="btn btn-primary w-75 fw-semibold rounded-3">Checkout</button>

                    <button className="btn btn-outline-primary w-25 rounded-3" onClick={() => addToCartWithQty(p)}>
                      <i className="bi bi-cart3"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="container mt-5">
          <div className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner rounded-4 shadow-sm">
              <div className="carousel-item active">
                <img src={banner3} className="d-block w-100" style={{ height: 500, objectFit: "cover" }} />
              </div>
              <div className="carousel-item">
                <img src={gambar1} className="d-block w-100" style={{ height: 500, objectFit: "cover" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="site-footer mt-5">
        <div className="container text-left">
          <h4 className="fw-bold mb-4">TOKO</h4>
          <p className="mb-2"><i className="bi bi-geo-alt"></i> Graha Raya Bintaro</p>
          <p className="mb-2"><i className="bi bi-telephone"></i> +62 858-8744-0412</p>
          <p className="mb-2"><i className="bi bi-envelope"></i> cs@resappin.com</p>
          <hr className="footer-divider" />
          <p className="m-0">&copy; 2025 AksesorisKomputer — All Rights Reserved</p>
        </div>
      </footer>
    </>
  );
}
