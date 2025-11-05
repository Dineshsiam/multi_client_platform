import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MerchantPage from "./pages/MerchantPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/merchants" element={<MerchantPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
