import { Routes, Route } from "react-router-dom";
import Login from "../src/pages/Login";
import Products from "../src/pages/Products";
import Cart from "../src/pages/Cart";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default App;