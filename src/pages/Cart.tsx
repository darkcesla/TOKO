import { useCart } from "../context/CartContext";
import "../assets/css/style_toko_produk.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import cart_kosong from "../assets/img/cart_kosong.png";

export default function Cart() {
  const { cart, tambah, kurang, hapus, hapusCart } = useCart();
  const navigate = useNavigate();

  const ongkir = 200;
  const diskon = 10;

  const totalBarang = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const grandTotal = totalBarang + ongkir - diskon;

  const swalco = () => {
    if (cart.length === 0) return;
    Swal.fire({
      title: "Pesanan Kamu Diproses",
      text: "Terima kasih menggunakan layanan TOKO",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#007bff",
    }).then(() => {
      hapusCart();
      navigate("/products");
    });
  };

  return (
    <>
      <nav className="navbar bg-white shadow-sm py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <h3 className="fw-bold mb-0">
            <span style={{ color: "white", WebkitTextStroke: "2px black" }}>TOKO</span> | Keranjang
          </h3>
        </div>
      </nav>

      <div className="container mt-4">

        {cart.length === 0 && (
          <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{ height: "70vh" }}>
            <img
              src={cart_kosong}
              alt="Keranjang kosong"
              style={{ width: 220, opacity: 0.9 }}
            />
            <h3 className="fw-bold mt-4" style={{ color: "#444" }}>Keranjang kamu masih kosong</h3>
            <p className="text-muted">Ayo pilih barang-barangmu sekarang hanya di TOKO!</p>
            <button
              className="btn btn-primary mt-2 px-4 py-2 fw-semibold"
              onClick={() => navigate("/products")}
            >
              Belanja Sekarang
            </button>
          </div>
        )}

        {cart.length > 0 && (
          <div className="row">

            <div className="col-lg-8">
              <div className="d-flex flex-column gap-3">

                {cart.map((item) => (
                  <div
                    className="card border shadow-sm p-3 d-flex flex-row align-items-start"
                    style={{ borderRadius: 0 }}
                    key={item.id}
                  >
                    <img
                      src={item.image}
                      style={{ width: 90, height: 90, objectFit: "contain" }}
                      className="me-3"
                    />

                    <div className="flex-grow-1">
                      <h6
                        className="fw-semibold"
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {item.title}
                      </h6>

                      <p className="text-muted mb-2">Rp {item.price.toLocaleString()}</p>

                      <div className="d-flex align-items-center">
                        <button className="btn btn-outline-secondary qty-btn" onClick={() => kurang(item.id)}>
                          <i className="bi bi-dash-lg"></i>
                        </button>

                        <span className="mx-3 fw-semibold">{item.qty}</span>

                        <button className="btn btn-outline-secondary qty-btn" onClick={() => tambah(item.id)}>
                          <i className="bi bi-plus-lg"></i>
                        </button>
                      </div>
                    </div>

                    <button
                      className="btn btn-danger ms-3"
                      onClick={() => hapus(item.id)}
                      style={{ whiteSpace: "nowrap" }}
                    >
                      X
                    </button>
                  </div>
                ))}

              </div>
            </div>

            <div className="col-lg-4 mt-4 mt-lg-0">
              <div className="p-4 shadow-sm border" style={{ borderRadius: 0 }}>

                <h5 className="fw-bold mb-3">TOTAL KERANJANG</h5>

                <div className="mb-3">
                  {cart.map((item) => (
                    <div key={item.id} className="d-flex justify-content-between mb-2">
                      <div style={{ maxWidth: "70%" }}>
                        <span className="fw-semibold">{item.title}</span>
                        <div className="text-muted" style={{ fontSize: 13 }}>
                          {item.qty} × Rp {item.price.toLocaleString()}
                        </div>
                      </div>
                      <div className="fw-bold">
                        Rp {(item.qty * item.price).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Subtotal</span>
                  <span className="fw-semibold">Rp {totalBarang.toLocaleString()}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Ongkir</span>
                  <span className="fw-semibold">Rp {ongkir.toLocaleString()}</span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Diskon</span>
                  <span className="fw-semibold text-success">- Rp {diskon.toLocaleString()}</span>
                </div>

                <h4 className="fw-bold text-primary mb-4 d-flex justify-content-between">
                  <span>Total</span>
                  <span>Rp {grandTotal.toLocaleString()}</span>
                </h4>

                <button className="btn btn-primary w-100 py-2 fs-5 fw-semibold" onClick={swalco}>
                  Checkout
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </>
  );
}
